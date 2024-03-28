import {db} from "@/lib/db";
import {publicProcedure, router} from "./trpc";
import * as z from "zod";
import {comparePasswordHash, hashPassword} from "@/lib/hashPassword";
import {createJWTandCookie} from "@/lib/session";

export const appRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({input}) => {
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
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({input}) => {
      const {email, password} = input;
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) throw new Error("User doesn't exists");
      if (user && (await comparePasswordHash(password, user.password)))
        throw new Error("Password doesnt match");
      createJWTandCookie(user?.id!);
      const currentUser = {
        name: user?.name,
        email: user?.email,
        interestedIn: user?.interestedIn,
        isEmailVerified: user?.isEmailVerified,
      };
      return currentUser;
    }),
});

export type AppRouter = typeof appRouter;
