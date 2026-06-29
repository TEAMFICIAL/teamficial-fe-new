export interface UserInfo {
  uuid: string;
  userId: string;
  userName: string;
}

export interface AuthResult {
  userId: string;
  accessToken: string;
  refreshToken: string;
  uuid: string;
  userName: string;
}

export interface AuthResponse {
  code: string;
  result: AuthResult;
}
