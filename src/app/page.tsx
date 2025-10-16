"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );
  const test = useMutation(trpc.testAi.mutationOptions());
  return (
    <div className="flex items-center justify-center flex-col gap-y-6 min-h-screen min-w-screen ">
      Protected Page
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Button disabled={test.isPending} onClick={() => test.mutate()}>
        Test AI
      </Button>
      <LogoutButton />
    </div>
  );
}
