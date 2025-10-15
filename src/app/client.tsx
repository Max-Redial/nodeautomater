"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ClientExample() {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return (
    <div>
      Client Example
      {JSON.stringify(users)}
    </div>
  );
}
