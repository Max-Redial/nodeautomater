import { createTRPCRouter } from "../init";

import { workflowRouters } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowRouters,
});
// export type definition of API
export type AppRouter = typeof appRouter;
