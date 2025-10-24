import { NodeType } from "@/generated/prisma";
import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger Manually",
    description: "Runs the flow on clicking the button.",
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "Http request",
    description: "Make HTTP requests to external services.",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const NodeSelector = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      console.log(selection);
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.data.nodeType === NodeType.MANUAL_TRIGGER,
        );

        if (hasManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow.");
          return;
        }
      }

      setNodes((nodes) => {
        const hasInitialTrigger = nodes.some(
          (node) => node.type === NodeType.INITIAL,
        );
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: { nodeType: selection.type },
          position: flowPosition,
          type: selection.type,
        };

        if (hasInitialTrigger && selection.type === NodeType.MANUAL_TRIGGER) {
          return nodes.map((node) =>
            node.type === NodeType.INITIAL ? newNode : node,
          );
        }
        return [...nodes, newNode];
      });
      onOpenChange(false);
    },
    [setNodes, getNodes, screenToFlowPosition, onOpenChange],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What triggers this workflow</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                onClick={() => handleNodeSelect(nodeType)}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
              >
                {typeof Icon === "string" ? (
                  <img
                    src={Icon}
                    alt={nodeType.label}
                    className="size-5 object-contain rounded-sm"
                  />
                ) : (
                  <Icon className="size-5" />
                )}
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium text-sm">{nodeType.label}</span>
                  <span className="text-sx text-muted-foreground">
                    {nodeType.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div>
          {executionNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                onClick={() => handleNodeSelect(nodeType)}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
              >
                {typeof Icon === "string" ? (
                  <img
                    src={Icon}
                    alt={nodeType.label}
                    className="size-5 object-contain rounded-sm"
                  />
                ) : (
                  <Icon className="size-5" />
                )}
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium text-sm">{nodeType.label}</span>
                  <span className="text-sx text-muted-foreground">
                    {nodeType.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
