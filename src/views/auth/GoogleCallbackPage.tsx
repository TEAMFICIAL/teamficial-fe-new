"use client";

import { useOAuthCallback } from "@/features/auth/hooks/useOAuthCallback";
import { googleLogin } from "@/features/auth/api/googleLogin";

export function GoogleCallbackPage() {
  useOAuthCallback({ provider: "google", loginFn: googleLogin });
  return null;
}
