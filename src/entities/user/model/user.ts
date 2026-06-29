export interface UserInfo {
  uuid: string;
  userId: number;
  userName: string;
}

export interface AuthResult {
  userId: number;
  accessToken: string;
  refreshToken: string;
  uuid: string;
  userName: string;
}

export interface AuthResponse {
  code: string;
  result: AuthResult;
}
