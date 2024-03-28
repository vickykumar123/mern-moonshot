import {db} from "@/lib/db";
import {publicProcedure, router} from "./trpc";
import * as z from "zod";
import {comparePasswordHash, hashPassword} from "@/lib/hashPassword";
import {createJWTandCookie} from "@/lib/session";
import {TRPCClientError} from "@trpc/client";
import {TRPCError} from "@trpc/server";
import {cookies} from "next/headers";
export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({input}) => {
      try {
        const {name, email, password} = input;
        const passwordHash = await hashPassword(password);
        const user = await db.user.create({
          data: {
            name,
            email,
            password: passwordHash,
            interestedIn: [],
          },
        });

        createJWTandCookie(user?.id);
        return user;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({input}) => {
      try {
        const {email, password} = input;
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User doesnt exist",
          });

        const isMatch = await comparePasswordHash(password, user.password);
        if (!isMatch) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Password doesnt match",
          });
        }
        createJWTandCookie(user?.id!);
        const currentUser = {
          name: user?.name,
          email: user?.email,
          interestedIn: user?.interestedIn,
          isEmailVerified: user?.isEmailVerified,
        };
        return currentUser;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  logout: publicProcedure.mutation(() => {
    try {
      cookies().delete("token");
    } catch (err) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});
