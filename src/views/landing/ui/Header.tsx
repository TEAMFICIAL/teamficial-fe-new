import Image from "next/image";
import { LandingContainer } from "@/views/landing/ui/LandingContainer";
import Link from "next/link";

export function Header() {
  return (
    <LandingContainer className="sticky top-0 z-50 h-15">
      <div className="flex h-15 justify-between items-center px-10">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/logo-black.svg"
            alt="teamficial"
            width={100}
            height={13}
          />
        </Link>
        <Link href="/login" className="body-7 cursor-pointer">
          로그인
        </Link>
      </div>
    </LandingContainer>
  );
}
