import api from "@/shared/api/axios";
import type { AuthResponse } from "@/entities/user/model/User";

export async function googleLogin(code: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/google", null, {
    params: {
      accessCode: code,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    },
  });
  return res.data;
}
