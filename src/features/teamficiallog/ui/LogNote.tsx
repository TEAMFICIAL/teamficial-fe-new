"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { KeywordList } from "./KeywordList";
import { useKeywordList } from "@/features/teamficiallog/hooks/useKeywordList";
import { ChevronIcon } from "@/shared/components/ui/icons/Chevronicon";
import { Spinner } from "@/shared/components/ui/Spinner";
import { ErrorView } from "@/shared/components/ui/ErrorView";

// 노트 최소 높이 (px) — 기존과 동일
const MIN_NOTE_HEIGHT = 400;

interface LogNoteProps {
  userId: number;
}

export function LogNote({ userId }: LogNoteProps) {
  const [page, setPage] = useState(0);
  const [noteHeight, setNoteHeight] = useState(MIN_NOTE_HEIGHT);
  const noteRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useKeywordList({
    userId,
    page,
    size: 5,
  });

  const keywords = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  // 노트 컨테이너 실제 높이 측정
  // 추후 위아래 텍스트/버튼이 생겨도 노트 내부 영역 높이 기준으로 키워드 위치 계산됨
  useEffect(() => {
    if (!noteRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      setNoteHeight(Math.max(height, MIN_NOTE_HEIGHT));
    });

    observer.observe(noteRef.current);
    return () => observer.disconnect();
  }, [isLoading, isError]);

  function handleKeywordClick(keywordId: number) {
    console.log("keyword clicked:", keywordId);
  }

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
      <div
        ref={noteRef}
        className="relative w-full overflow-hidden rounded-2xl bg-[#F8F8F8] shadow-[0_4px_7.1px_0_#E1E1E1]"
        style={{ height: "min(70vh, 600px)", minHeight: MIN_NOTE_HEIGHT }} // 최소 400px 최대 600px, 화면 높이 70%까지
      >
        {/* 배경 따옴표 */}
        <Image
          src="/icons/question_gray.svg"
          alt=""
          width={159}
          height={121}
          className="absolute -left-6 z-10"
          style={{ top: noteHeight * 0.05 }}
          aria-hidden="true"
        />
        <Image
          src="/icons/question_gray.svg"
          alt=""
          width={159}
          height={121}
          className="absolute -right-6 z-10 rotate-180"
          style={{ bottom: noteHeight * 0.05 }}
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
