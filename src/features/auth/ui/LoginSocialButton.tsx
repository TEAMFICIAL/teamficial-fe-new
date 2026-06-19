import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import type { Provider } from "@/features/auth/model/types";

interface SocialConfig {
  name: string;
  imageSrc: string;
  bgColor: string;
  textColor: string;
}

export const socialConfig: Record<Provider, SocialConfig> = {
  kakao: {
    name: "카카오",
    imageSrc: "/icons/kakao.svg",
    bgColor: "bg-[#FEE500]",
    textColor: "text-gray-800",
  },
  google: {
    name: "구글",
    imageSrc: "/icons/google.svg",
    bgColor: "bg-gray-200",
    textColor: "text-gray-800",
  },
};

interface LoginSocialButtonProps {
  type: Provider;
  onClick: () => void;
  isRecentLogin?: boolean;
}

export function LoginSocialButton({
  type,
  onClick,
  isRecentLogin = false,
}: LoginSocialButtonProps) {
  const config = socialConfig[type];

  return (
    <div className="relative w-full">
      {isRecentLogin && (
        <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
          <Image
            src="/icons/recent.svg"
            alt="최근 로그인"
            width={104}
            height={32}
          />
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex w-full cursor-pointer flex-row items-center justify-center rounded-lg px-10 py-4",
          config.bgColor,
        )}
      >
        <div className="mr-2 h-5 w-5">
          <Image
            src={config.imageSrc}
            alt={`${config.name} logo`}
            loading="lazy"
            width={20}
            height={20}
          />
        </div>
        <span className={config.textColor}>
          {config.name} 계정으로 계속하기
        </span>
      </button>
    </div>
  );
}
