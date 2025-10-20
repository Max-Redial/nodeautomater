"use client";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { ReactNode } from "react";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <p>{JSON.stringify(workflows.data, null, 2)}</p>;
};

export const WorkflowsHeader = ({ disabled }: { disabled: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { modal, handleError } = useUpgradeModal();
  const router = useRouter();
  
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Worflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        newButtonLabel="New Workflow"
      />
    </>
  );
};

export const WorkflowsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader disabled={false} />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
