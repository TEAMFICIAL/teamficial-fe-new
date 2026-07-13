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
        className="h-10 w-auto max-w-48 object-contain"
      />
    </button>
  );
}
