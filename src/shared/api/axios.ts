import { useUserStore } from "@/features/auth/store/useUserStore";
import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params),
  headers: { "Content-Type": "application/json" },
});

// 리프레시 전용 plain 인스턴스 (interceptor 없음 → 무한루프 방지)
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
}

const requestNewTokens = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await authApi.get("/auth/refresh-token", {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  if (!res.data?.isSuccess) throw new Error("Refresh failed");

  const { accessToken, refreshToken: newRefresh } = res.data.result;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", newRefresh);

  return accessToken;
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // 리프레시 진행 중이면 큐에 쌓고 대기
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await requestNewTokens();
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      const { clearUser } = useUserStore.getState();
      clearUser();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
