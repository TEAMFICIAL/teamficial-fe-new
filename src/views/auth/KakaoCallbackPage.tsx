"use client";

import { useOAuthCallback } from "@/features/auth/hooks/useOAuthCallback";
import { kakaoLogin } from "@/features/auth/api/kakaoLogin";

export function KakaoCallbackPage() {
  useOAuthCallback({ provider: "kakao", loginFn: kakaoLogin });
  return null;
}
