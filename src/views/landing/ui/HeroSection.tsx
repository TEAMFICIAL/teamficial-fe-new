import { LandingContainer } from "@/views/landing/ui/LandingContainer";
import { Header } from "./Header";
import Image from "next/image";

export function HeroSection() {
  return (
    <LandingContainer className="gradient-bg-03">
      <Header />
      <section className="flex flex-col items-center justify-center gap-6 pb-12">
        <Image
          src="/images/landing/top-teamficiallog.png"
          alt="팀피셜록 소개 이미지"
          width={366}
          height={247}
          quality={85}
          loading="lazy"
        />
        <div className="flex flex-col items-center text-center">
          <p className="body-5">쌓여가는 나의 소프트스킬</p>
          <p className="body-9 pt-1 pb-4 whitespace-break-spaces">{`간단한 링크 공유로 나와 함께한 팀원들로부터\n소프트스킬 키워드를 얻을 수 있어요`}</p>
          <button className="body-9 text-gray-0 w-30 py-2 bg-gray-700 rounded-lg cursor-pointer">
            팀피셜 시작하기
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Image
            src="/images/landing/introduce-1.png"
            alt="카카오톡 링크 공유 정보 이미지"
            width={240}
            height={300}
            quality={85}
            loading="lazy"
          />
          <Image
            src="/images/landing/introduce-2.png"
            alt="소프트스킬 리뷰 작성 정보 이미지"
            width={240}
            height={300}
            quality={85}
            loading="lazy"
          />
          <Image
            src="/images/landing/introduce-3.png"
            alt="받은 키워드 확인 정보 이미지"
            width={240}
            height={300}
            quality={85}
            loading="lazy"
          />
        </div>
      </section>
    </LandingContainer>
  );
}
