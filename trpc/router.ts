import {getCurrentUser} from "@/lib/user";
import {authRouter} from "./authRouter";
import {publicProcedure, router} from "./trpc";
import * as z from "zod";
import {TRPCError} from "@trpc/server";
import {db} from "@/lib/db";

export const appRouter = router({
  auth: authRouter,
  category: publicProcedure
    .input(
      z.object({
        category: z.string().array(),
      })
    )
    .mutation(async ({input}) => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not logged in",
        });
      }

      const {category} = input;
      const user = await db.user.update({
        where: {id: currentUser.id},
        data: {
          interestedIn: {
            set: category,
          },
        },
        select: {
          name: true,
          interestedIn: true,
          email: true,
          password: false,
        },
      });
      return user;
    }),
  getCategory: publicProcedure
    .input(
      z.object({
        offset: z.number().default(0),
        limit: z.number().default(6),
      })
    )
    .query(async ({input}) => {
      const {offset, limit} = input;
      const categories = await db.category.findMany({
        skip: offset,
        take: limit,
      });

      const totalCount = await db.category.count();
      const totalPages = Math.ceil(totalCount / limit);

      return {categories, totalCount, totalPages};
    }),
});

export type AppRouter = typeof appRouter;
