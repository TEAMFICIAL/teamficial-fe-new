import { FooterSection } from "@/views/landing/ui/FooterSection";
import { HeroSection } from "@/views/landing/ui/HeroSection";
import { MessageSection } from "@/views/landing/ui/MessageSection";

export function LandingPage() {
  return (
    <main className="flex w-full flex-col">
      <HeroSection />
      <MessageSection />
      <FooterSection />
    </main>
  );
}
