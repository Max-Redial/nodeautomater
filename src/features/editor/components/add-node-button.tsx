"use client";

import { NodeSelector } from "@/components/node-selector";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";

export const AddNodeButton = memo(() => {
  const [selector, setSelectorOpen] = useState(false);
  return (
    <NodeSelector open={selector} onOpenChange={setSelectorOpen}>
      <Button
        variant="outline"
        size="icon"
        className="bg-background"
        onClick={() => {}}
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";
