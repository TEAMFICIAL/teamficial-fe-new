"use client";

import Image from "next/image";
import { KeywordButton } from "@/shared/components/ui/KeywordButton";
import type { KeywordItem } from "@/entities/team/model";

// 노트 높이 기준 비율 (top, left/right 모두 %)
const KEYWORD_RATIOS = [
  { topRatio: 0.18, left: "52%", rotate: "14.8deg" },
  { topRatio: 0.34, left: "6%", rotate: "0deg" },
  { topRatio: 0.5, left: "54%", rotate: "6.7deg" },
  { topRatio: 0.66, left: "4%", rotate: "14.1deg" },
  { topRatio: 0.82, left: "53%", rotate: "-3.1deg" },
] as const;

interface KeywordListProps {
  keywords: KeywordItem[];
  onKeywordClick: (keywordId: number) => void;
}

export function KeywordList({ keywords, onKeywordClick }: KeywordListProps) {
  if (keywords.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <Image
          src="/images/gray_teamficial_symbol.svg"
          alt="teamficial symbol"
          width={48}
          height={48}
        />
        <p className="whitespace-pre-line text-center text-sm text-gray-500">
          {`나의 팀피셜록 링크를 공유하고\n키워드를 받아보세요`}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {keywords.slice(0, 5).map((keyword, idx) => {
        const ratio = KEYWORD_RATIOS[idx];

        return (
          <KeywordButton
            key={keyword.keywordId}
            keywordName={keyword.keywordName}
            keywordId={keyword.keywordId}
            position={{
              top: `${ratio.topRatio * 100}%`,
              left: ratio.left,
              rotate: ratio.rotate,
            }}
            onClick={onKeywordClick}
          />
        );
      })}
    </div>
  );
}
