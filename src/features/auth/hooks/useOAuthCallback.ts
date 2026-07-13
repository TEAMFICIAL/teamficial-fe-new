"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/features/auth/store/useUserStore";
import { setCookie } from "@/shared/lib/cookie";
import type { Provider } from "@/features/auth/model/types";
import { AuthResponse } from "@/entities/user/model";

interface OAuthCallbackOptions {
  provider: Provider;
  loginFn: (code: string) => Promise<AuthResponse>;
}

export function useOAuthCallback({ provider, loginFn }: OAuthCallbackOptions) {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;

    loginFn(code)
      .then((data) => {
        if (data.code !== "200" || !data.result) {
          router.replace("/login");
          return;
        }

        const { userId, accessToken, refreshToken, uuid, userName } =
          data.result;

        setUser({ uuid, userId, userName });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setCookie("lastLoginProvider", provider, { expires: 365 });

        const redirectPath = localStorage.getItem("redirectAfterLogin");
        localStorage.removeItem("redirectAfterLogin");
        router.replace(redirectPath || `/teamficiallog/${uuid}`);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [params, router, setUser, loginFn, provider]);
}
