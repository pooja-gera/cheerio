import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { reportRouter } from "@/server/api/routers/report";

export const appRouter = createTRPCRouter({
  user: userRouter,
  report: reportRouter,
});

export type AppRouter = typeof appRouter;
