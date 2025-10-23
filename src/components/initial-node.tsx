"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkFlowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkFlowNode showToolbar={false}>
      <PlaceholderNode {...props}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkFlowNode>
  );
});

InitialNode.displayName = "InitialNode";
