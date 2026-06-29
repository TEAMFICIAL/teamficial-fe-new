export interface CommonResponse<T> {
  isSuccess: boolean;
  message: string;
  result: T;
}
