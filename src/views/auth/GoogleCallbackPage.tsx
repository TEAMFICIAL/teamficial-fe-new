"use client";

import { useOAuthCallback } from "@/features/auth/hooks/useOAuthCallback";
import { googleLogin } from "@/features/auth/api/googleLogin";
import { Spinner } from "@/shared/components/ui/Spinner";

export function GoogleCallbackPage() {
  useOAuthCallback({ provider: "google", loginFn: googleLogin });
  return <Spinner />;
}
