import { LandingContainer } from "@/views/landing/ui/LandingContainer";
import Image from "next/image";

export function FooterSection() {
  return (
    <LandingContainer className="bg-gray-900">
      <section className="flex items-center justify-center py-4">
        <div className="w-60 flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Image
              src="/images/logo-white.svg"
              alt="푸터 팀피셜 로고"
              width={100}
              height={13}
              loading="lazy"
            />
            <a
              href="https://www.instagram.com/teamficial.official/"
              className="cursor-pointer"
            >
              <Image
                src="/images/instagram.svg"
                alt="인스타그램 연결 링크"
                width={13}
                height={13}
                loading="lazy"
              />
            </a>
          </div>
          <div className="flex flex-col gap-0.5 text-gray-700 body-11">
            <p>©TEAMFICIAL ALL RIGHTS RESERVED</p>
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
            <a
              href="https://season-daughter-d26.notion.site/33da1c1c2a9980f4999fd34458061625?source=copy_link"
              className="cursor-pointer"
            >
              개인정보처리방침
            </a>
            <a
              href="https://season-daughter-d26.notion.site/3a6a1c1c2a9980b88bfec694ba28f7cd?source=copy_link"
              className="cursor-pointer"
            >
              서비스이용약관
            </a>
          </div>
        </div>
      </section>
    </LandingContainer>
  );
}
