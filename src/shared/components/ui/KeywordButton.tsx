import Image from "next/image";

interface KeywordButtonProps {
  keywordName: string;
  keywordId: number;
  position: {
    top: string;
    left?: string;
    right?: string;
    rotate: string;
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
      className="absolute z-10 cursor-pointer"
      style={{
        top: position.top,
        ...(position.left !== undefined ? { left: position.left } : {}),
        ...(position.right !== undefined ? { right: position.right } : {}),
        transform: `rotate(${position.rotate})`,
        transformOrigin: "center center",
      }}
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
