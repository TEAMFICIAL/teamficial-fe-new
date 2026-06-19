export interface User {
  uuid: string;
  userId: string;
  userName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends User, AuthTokens {}

export interface AuthResponse {
  code: string;
  result: AuthResult;
}
