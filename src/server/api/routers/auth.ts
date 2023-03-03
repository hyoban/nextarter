import { z } from "zod";

import { digestMessage } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  setPassword: protectedProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.email) {
        try {
          await ctx.prisma.user.update({
            where: { email: ctx.session.user.email },
            data: {
              passwordHash: await digestMessage(input.password),
            },
          });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    }),
});
