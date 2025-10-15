"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const handleSightOut = async () => {
  await authClient.signOut();
  window.location.href = "/login";
};

export const LogoutButton = () => {
  return <Button onClick={handleSightOut}>Logout</Button>;
};
