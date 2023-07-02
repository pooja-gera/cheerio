import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const reportRouter = createTRPCRouter({
  createReport: protectedProcedure
    .input(
      z.object({
        fromDate: z.date(),
        toDate: z.date(),
        auditorAssigned: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createReport = await ctx.prisma.report.create({
          data: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            fromDate: input.fromDate,
            toDate: input.toDate,
            auditorAssigned: input.auditorAssigned,
          },
        });
        return createReport;
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating report",
          cause: e,
        });
      }
    }),

  getAllReports: protectedProcedure.query(async ({ ctx }) => {
    try {
      const reports = await ctx.prisma.report.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      return reports;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting reports",
        cause: e,
      });
    }
  }),

  getReportById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const report = await ctx.prisma.report.findUnique({
          where: {
            id: input.id,
          },
          include: {
            sectionA: true,
          },
        });
        return report;
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error getting report",
          cause: e,
        });
      }
    }),

  saveOrUpdateReport: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        sectionA: z.object({}),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const findstuff = await ctx.prisma.report.findUnique({
          where: {
            id: input.id,
          },
          include: {
            sectionA: true,
          },
        });
        const update = await ctx.prisma.report.upsert({
          where: {
            id: input.id,
          },
          update: {
            sectionA: { ...input.sectionA },
          },
          create: {
            sectionA: {
              create: { ...input.sectionA },
            },
            fromDate: findstuff?.fromDate ?? new Date(),
            toDate: findstuff?.toDate ?? new Date(),
          },
        });
        if (update) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
          };
        }
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error saving report",
          cause: e,
        });
      }
    }),
});
