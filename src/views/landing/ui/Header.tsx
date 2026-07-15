import Image from "next/image";
import { LandingContainer } from "@/views/landing/ui/LandingContainer";

export function Header() {
  return (
    <LandingContainer className="sticky top-0 z-50 h-15">
      <div className="flex h-15 items-center">
        <Image
          src="/images/teamficial.svg"
          alt="teamficial"
          width={250}
          height={72}
          className="h-6 w-auto"
        />
      </div>
    </LandingContainer>
  );
}
