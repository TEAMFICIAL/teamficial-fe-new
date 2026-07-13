"use client";

import { useUserStore } from "@/features/auth/store/useUserStore";
import { useRequesterInfo } from "@/features/teamficiallog/hooks/useRequesterInfo";
import { LogNote } from "@/features/teamficiallog/ui/LogNote";
import { Error } from "@/shared/components/ui/Error";
import { Spinner } from "@/shared/components/ui/Spinner";

type Props = {
  logId: string;
};

type PageMode = "normal" | "shared";

export function TeamficialLogPage({ logId }: Props) {
  const { uuid, userId, _hasHydrated } = useUserStore();

  if (!_hasHydrated) return <Spinner />;

  const mode: PageMode = uuid === logId ? "normal" : "shared";

  return mode === "normal" ? (
    <NormalMode userId={Number(userId)} />
  ) : (
    <SharedMode logId={logId} />
  );
}

// 일반 모드: 내 userId로 바로 조회
function NormalMode({ userId }: { userId: number }) {
  return (
    <main className="flex flex-col gap-5 px-4 pb-14">
      <LogNote userId={userId} />
    </main>
  );
}

// 공유 모드: uuid로 requesterInfo 조회 후 userId 획득
function SharedMode({ logId }: { logId: string }) {
  const { data: requesterInfo, isLoading, isError } = useRequesterInfo(logId);

  if (isLoading) return <Spinner />;

  if (isError || !requesterInfo) {
    return <Error />;
  }

  return (
    <main className="flex flex-col gap-5 px-4 pb-14">
      <p className="text-center text-sm text-gray-600">
        {requesterInfo.requesterName}님의 팀피셜록
      </p>
      <LogNote userId={requesterInfo.userId} />
    </main>
  );
}
