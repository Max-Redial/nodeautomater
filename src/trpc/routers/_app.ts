import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    return await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test2@test.com",
      },
    });
  }),
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
    return { sucess: true, message: "Event sent" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
