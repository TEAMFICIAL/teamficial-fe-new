import Image from "next/image";

export function Spinner() {
  return (
    <div className="bg-gray-0/40 fixed inset-0 z-9999 flex items-center justify-center">
      <div className="flex flex-col gap-3 rounded-2xl text-center items-center">
        <Image
          src={`/images/symbol_gray.svg`}
          alt="symbol"
          width={56}
          height={56}
          className="h-14 w-auto"
          loading="eager"
        />
        <div>
          <p className="title-3 text-gray-800">로딩 중</p>
          <p className="body-6 text-gray-700">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
}
