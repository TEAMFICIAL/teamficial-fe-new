import Image from "next/image";

interface ErrorViewProps {
  message?: string;
}

export function ErrorView({ message }: ErrorViewProps) {
  return (
    <div className="bg-gray-0/40 fixed inset-0 z-9999 flex items-center justify-center">
      <div className="flex flex-col gap-3 rounded-2xl text-center items-center">
        <Image
          src={`/images/404.svg`}
          alt="symbol"
          width={0}
          height={70}
          className="h-17.5 w-auto"
          loading="eager"
        />
        <div>
          <p className="title-3 text-gray-800">
            {message || "앗! 에러가 발생했어요"}
          </p>
          <p className="body-6 text-gray-700">잠시 후 다시 시도해주세요</p>
        </div>
      </div>
    </div>
  );
}
