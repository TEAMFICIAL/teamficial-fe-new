"use client";

import { useUserStore } from "@/features/auth/store/useUserStore";
import { Spinner } from "@/shared/components/ui/Spinner";

type Props = {
  logId: string;
};

type PageMode = "normal" | "shared";

export function TeamficialLogPage({ logId }: Props) {
  const { uuid, _hasHydrated } = useUserStore();

  if (!_hasHydrated) return <Spinner />;

  const mode: PageMode = uuid === logId ? "normal" : "shared";

  return (
    <div>
      <p>현재 모드: {mode === "normal" ? "일반모드" : "공유모드"}</p>
    </div>
  );
}
