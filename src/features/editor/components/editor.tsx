"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const EditorLoading = () => {
  return <LoadingView message="Loading workflow editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading workflow editor." />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  return <div>{JSON.stringify(workflow, null, 2)}</div>;
};
