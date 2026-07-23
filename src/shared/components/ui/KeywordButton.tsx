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
        className="w-48 h-auto"
        placeholder="blur"
        blurDataURL={KEYWORD_BLUR_DATA_URL}
      />
    </button>
  );
}
