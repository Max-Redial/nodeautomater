import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

import { LogoutButton } from "./logout";

export default async function Home() {
  await requireAuth();
  const date = await caller.getUsers();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Protected Page
      <pre>{JSON.stringify(date, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
}
