import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("Fetching", "5s");
    await step.sleep("Transcribing", "3s");
    await step.sleep("Send to ai", "5s");

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: `Workflow for ${event.data.email}`,
        },
      });
    });

    return { message: `Hello ${event.data.email}!` };
  },
);
