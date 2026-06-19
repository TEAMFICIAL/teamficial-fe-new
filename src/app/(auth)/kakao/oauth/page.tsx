import { KakaoCallbackPage } from "@/views/auth/KakaoCallbackPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <KakaoCallbackPage />
    </Suspense>
  );
}
