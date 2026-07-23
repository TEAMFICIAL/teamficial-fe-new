"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { KeywordList } from "./KeywordList";
import { useKeywordList } from "@/features/teamficiallog/hooks/useKeywordList";
import { ChevronIcon } from "@/shared/components/ui/icons/Chevronicon";
import { Spinner } from "@/shared/components/ui/Spinner";
import { ErrorView } from "@/shared/components/ui/ErrorView";
import { useKeywordComments } from "../hooks/useKeywordComments";

interface LogNoteProps {
  userId: number;
}

export function LogNote({ userId }: LogNoteProps) {
  const [page, setPage] = useState(0);
  const [selectedKeywordId, setSelectedKeywordId] = useState<number | null>(
    null,
  );

  const { data, isLoading, isError } = useKeywordList({
    userId,
    page,
    size: 5,
  });

  const keywords = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const { data: comments } = useKeywordComments(selectedKeywordId);

  function handleKeywordClick(keywordId: number) {
    setSelectedKeywordId(keywordId);
  }

  // comments 변경될 때마다 콘솔 출력
  useEffect(() => {
    if (comments) console.log("keyword comments:", comments);
  }, [comments]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <section className="relative flex justify-center px-4">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        className="absolute top-1/2 left-0 -translate-y-1/2 disabled:hidden z-20 cursor-pointer"
      >
        <ChevronIcon className="h-8 w-8" />
      </button>

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
        disabled={page + 1 >= totalPages}
        className="absolute top-1/2 right-0 -translate-y-1/2 disabled:hidden z-20 cursor-pointer"
      >
        <ChevronIcon className="h-8 w-8 rotate-180" />
      </button>

      {/* 노트 카드 */}
      <div className="relative h-[min(70vh,600px)] min-h-100 w-full overflow-hidden rounded-2xl bg-[#F8F8F8] shadow-[0_4px_7.1px_0_#E1E1E1]">
        {/* 배경 따옴표 */}
        <Image
          src="/icons/question_gray.svg"
          alt=""
          width={159}
          height={121}
          className="absolute -left-6 top-[5%] z-10"
          aria-hidden="true"
        />
        <Image
          src="/icons/question_gray.svg"
          alt=""
          width={159}
          height={121}
          className="absolute -right-6 bottom-[5%] z-10 rotate-180"
          aria-hidden="true"
        />
        {/* 키워드 영역 */}
        <div className="relative z-10 h-full w-full p-4">
          <KeywordList
            keywords={keywords}
            onKeywordClick={handleKeywordClick}
          />
        </div>
      </div>
    </section>
  );
}
