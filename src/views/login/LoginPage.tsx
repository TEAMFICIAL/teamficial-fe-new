"use client";

import { LoginSocialList } from "@/features/auth/ui/LoginSocialList";
import Image from "next/image";

export function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-3 px-4">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/images/teamficial.svg"
          alt="logo"
          width={250}
          height={72}
          className="h-11.25 w-40"
        />
      </div>
      <p className="body-7 flex text-center text-[#4B4B4B]">
        함께의 시작을 부드럽게
        <br />
        자연스러운 연결로 시작되는 팀빌딩
      </p>
      <LoginSocialList />
    </main>
  );
}
