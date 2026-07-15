import { LandingContainer } from "@/views/landing/ui/LandingContainer";
import Image from "next/image";

export function FooterSection() {
  return (
    <LandingContainer className="bg-gray-900">
      <section className="flex items-center justify-center py-4">
        <div className="w-60 flex flex-col items-start gap-2">
          <Image
            src="/images/teamficial.svg"
            alt="teamficial"
            width={250}
            height={72}
            className="h-6 w-auto"
          />
          <div className="flex flex-col gap-0.5 text-gray-700 body-11">
            <p>©TEAMFICIAL ALL RIGHT RESERVED</p>
            <div className="flex gap-2">
              <p>버그 및 불편사항 접수</p>
              <a
                href="mailto:teamficial25@gmail.com"
                className="cursor-pointer"
              >
                teamficial25@gmail.com
              </a>
            </div>
          </div>
          <div className="flex gap-2 body-11 text-gray-0">
            {/* TODO: 실제 약관 URL 확정되면 연결 */}
            <a href="#" className="cursor-pointer">
              개인정보처리방침
            </a>
            <a href="#" className="cursor-pointer">
              서비스이용약관
            </a>
          </div>
        </div>
      </section>
    </LandingContainer>
  );
}
