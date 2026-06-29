"use client";

import { useOAuthCallback } from "@/features/auth/hooks/useOAuthCallback";
import { kakaoLogin } from "@/features/auth/api/kakaoLogin";
import { Spinner } from "@/shared/components/ui/Spinner";

export function KakaoCallbackPage() {
  useOAuthCallback({ provider: "kakao", loginFn: kakaoLogin });
  return <Spinner />;
}
