"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/auth/store/useUserStore";
import { Spinner } from "@/shared/components/ui/Spinner";

export function TeamficialLogRedirectPage() {
  const router = useRouter();
  const { uuid, _hasHydrated } = useUserStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = !!accessToken && !!uuid;

    if (isLoggedIn) {
      router.replace(`/teamficiallog/${uuid}`);
    } else {
      router.replace("/login");
    }
  }, [_hasHydrated, uuid, router]);

  return <Spinner />;
}
