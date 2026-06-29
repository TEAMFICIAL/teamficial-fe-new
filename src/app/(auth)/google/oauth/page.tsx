import { GoogleCallbackPage } from "@/views/auth/GoogleCallbackPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <GoogleCallbackPage />
    </Suspense>
  );
}
