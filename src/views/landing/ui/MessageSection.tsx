import { LandingContainer } from "@/views/landing/ui/LandingContainer";

export function MessageSection() {
  return (
    <LandingContainer className="gradient-bg-04">
      <section className="flex flex-col items-center justify-center gap-2 py-12">
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded-full bg-gray-0 body-11">
            프로젝트 회고
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-0 body-11">
            셀프 브랜딩
          </span>
        </div>
        <div className="body-7 whitespace-break-spaces text-center">{`나만의 소프트스킬로\n다양한 활동을 시작해보세요!`}</div>
      </section>
    </LandingContainer>
  );
}
