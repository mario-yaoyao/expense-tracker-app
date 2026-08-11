import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

import type { IAuthStore, TJwtPayload, TTokens, TUser } from "../types/auth";

const getUserFromToken = (token: string | null): TUser | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<TJwtPayload>(token);

    return {
      id: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      username:
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };
  } catch {
    return null;
  }
};

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<TJwtPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const useAuth = create<IAuthStore>((set) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = getUserFromToken(accessToken);

  return {
    accessToken,
    refreshToken,
    user: user,
    isAuthenticated: isTokenValid(accessToken),
    isSuperAdmin: user?.role === "SuperAdmin",
    isUser: user?.role === "User",

    setTokens: ({ accessToken, refreshToken }: TTokens) => {
      const user = getUserFromToken(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      set({
        accessToken,
        refreshToken,
        user: getUserFromToken(accessToken),
        isAuthenticated: true,
        isSuperAdmin: user?.role === "SuperAdmin",
        isUser: user?.role === "User",
      });
    },

    clearTokens: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isSuperAdmin: false,
        isUser: false,
      });
    },
  };
});
