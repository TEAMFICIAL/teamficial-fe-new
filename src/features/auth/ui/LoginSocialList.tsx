"use client";

import { useState, useEffect } from "react";
import { LoginSocialButton } from "./LoginSocialButton";
import { getCookie } from "@/shared/lib/cookie";
import {
  clearAuthStorage,
  getKakaoLoginUrl,
  getGoogleLoginUrl,
} from "@/shared/lib/auth";
import type { Provider } from "@/features/auth/model/types";

const SOCIAL_ORDER: Provider[] = ["kakao", "google"];

export function LoginSocialList() {
  const [lastLoginProvider, setLastLoginProvider] = useState<Provider | null>(
    null,
  );

  useEffect(() => {
    const last = getCookie("lastLoginProvider") as Provider | null;
    if (last && SOCIAL_ORDER.includes(last)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastLoginProvider(last);
    }
  }, []);

  function handleLogin(url: string) {
    clearAuthStorage();
    window.location.replace(url);
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-2">
      {SOCIAL_ORDER.map((type) => (
        <LoginSocialButton
          key={type}
          type={type}
          isRecentLogin={type === lastLoginProvider}
          onClick={() =>
            handleLogin(
              type === "kakao" ? getKakaoLoginUrl() : getGoogleLoginUrl(),
            )
          }
        />
      ))}
    </div>
  );
}
