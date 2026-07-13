"use client";

import Image from "next/image";
import { KeywordButton } from "@/shared/components/ui/KeywordButton";
import type { KeywordItem } from "@/entities/team/model";

// 노트 높이 기준 비율 (top, left/right 모두 %)
const KEYWORD_RATIOS = [
  {
    topClass: "top-[18%]",
    sideClass: "left-[52%]",
    rotateClass: "rotate-[14.8deg]",
  },
  { topClass: "top-[34%]", sideClass: "left-[6%]", rotateClass: "rotate-0" },
  {
    topClass: "top-[50%]",
    sideClass: "left-[54%]",
    rotateClass: "rotate-[6.7deg]",
  },
  {
    topClass: "top-[66%]",
    sideClass: "left-[4%]",
    rotateClass: "rotate-[14.1deg]",
  },
  {
    topClass: "top-[82%]",
    sideClass: "left-[53%]",
    rotateClass: "rotate-[-3.1deg]",
  },
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
              topClass: ratio.topClass,
              sideClass: ratio.sideClass,
              rotateClass: ratio.rotateClass,
            }}
            onClick={onKeywordClick}
          />
        );
      })}
    </div>
  );
}
