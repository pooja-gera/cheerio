import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(3),
        role: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, role } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      } else {
        const hashpass = await bcrypt.hash(password, 10);
        const newUser = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashpass,
            role,
          },
        });
        if (newUser) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
          };
        }
      }
    }),
});
