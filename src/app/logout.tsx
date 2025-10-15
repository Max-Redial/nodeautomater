"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const LogoutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return <Button onClick={handleSignOut}>Logout</Button>;
};

export const LogoutButton = () => {
  return <Button onClick={handleSightOut}>Logout</Button>;
};
