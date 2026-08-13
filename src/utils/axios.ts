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
    console.log("Response error:", error.response?.status);
    if (error.response?.status === 401) {
      console.log("401 detected");
      if (error.config.url?.includes("/auth/refresh")) {
        console.log("Refresh failed. Logging out user.");
        useAuth.getState().clearTokens();
        return Promise.reject(error);
      }

      const refreshToken = useAuth.getState().refreshToken;
      console.log("Calling refresh endpoint...");
      const userId = useAuth.getState().user?.id;

      const refreshResponse = await refreshTokenAsync(userId, refreshToken);
      console.log("Refresh successful:", refreshResponse);

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      useAuth.getState().setTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      console.log("Retrying original request...");

      error.config.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(error.config);
    }

    return Promise.reject(error);
  },
);

export default api;
