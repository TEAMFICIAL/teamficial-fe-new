import { LandingContainer } from "@/views/landing/ui/LandingContainer";
import { Header } from "./Header";

export function HeroSection() {
  return (
    <LandingContainer className="gradient-bg-03">
      <Header />
      <section className="flex flex-col items-center justify-center gap-6 pb-12">
        <div className="w-87 h-59 rounded-2xl bg-primary-50">이미지</div>
        <div className="flex flex-col items-center text-center">
          <p className="body-5">쌓여가는 나의 소프트스킬</p>
          <p className="body-9 pt-1 pb-4 whitespace-break-spaces">{`간단한 링크 공유로 나와 함께한 팀원들로부터\n소프트스킬 키워드를 얻을 수 있어요`}</p>
          <button className="body-9 text-gray-0 w-30 py-2 bg-gray-700 rounded-lg cursor-pointer">
            팀피셜 시작하기
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          <div className="w-60 h-75 shrink-0 rounded-2xl bg-primary-50">
            이미지1
          </div>
          <div className="w-60 h-75 shrink-0 rounded-2xl bg-primary-50">
            이미지2
          </div>
          <div className="w-60 h-75 shrink-0 rounded-2xl bg-primary-50">
            이미지3
          </div>
        </div>
      </section>
    </LandingContainer>
  );
}
