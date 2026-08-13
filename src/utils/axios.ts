import axios from "axios";

import { refreshTokenAsync } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (error.config.url?.includes("/auth/refresh")) {
        useAuth.getState().clearTokens();
        return Promise.reject(error);
      }

      const refreshToken = useAuth.getState().refreshToken;
      const userId = useAuth.getState().user?.id;

      const refreshResponse = await refreshTokenAsync(userId, refreshToken);

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      useAuth.getState().setTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      error.config.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(error.config);
    }

    return Promise.reject(error);
  },
);

export default api;
