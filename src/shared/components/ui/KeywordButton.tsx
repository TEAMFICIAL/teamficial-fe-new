import { KEYWORD_BLUR_DATA_URL } from "@/shared/lib/utils";
import Image from "next/image";

interface KeywordButtonProps {
  keywordName: string;
  keywordId: number;
  position: {
    topClass: string;
    sideClass: string;
    rotateClass: string;
  };
  onClick: (keywordId: number) => void;
}

// 키워드 별 크기 조정
function getKeywordSize(name: string) {
  const len = name.length;
  if (len <= 7) return "h-14 w-auto";
  if (len <= 10) return "h-12 w-auto";
  return "h-12 w-auto max-w-56";
}

export function KeywordButton({
  keywordName,
  keywordId,
  position,
  onClick,
}: KeywordButtonProps) {
  return (
    <button
      type="button"
      className={`absolute z-10 cursor-pointer origin-center ${position.topClass} ${position.sideClass} ${position.rotateClass}`}
      onClick={() => onClick(keywordId)}
    >
      <Image
        src={`/images/keywords/${keywordName}.svg`}
        alt={keywordName}
        width={192}
        height={40}
        className={getKeywordSize(keywordName)}
        placeholder="blur"
        blurDataURL={KEYWORD_BLUR_DATA_URL}
      />
    </button>
  );
}
