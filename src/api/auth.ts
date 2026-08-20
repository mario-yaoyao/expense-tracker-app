import axios from "axios";

import type {
  TForgotPasswordSchema,
  TLoginSchema,
  TRegisterSchema,
  TResetPasswordSchema,
} from "../types/auth";

export const loginAsync = async (payload: TLoginSchema) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    payload,
  );
  return res.data;
};

export const registerAsync = async (payload: TRegisterSchema) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    payload,
  );
  return res.data;
};

export const refreshTokenAsync = async (
  userId: string | undefined,
  refreshToken: string | null,
) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    { userId, refreshToken },
  );
  return res.data;
};

export const forgotPasswordAsync = async (payload: TForgotPasswordSchema) => {
  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
    payload,
  );
  return res.data;
};

export const resetPasswordAsync = async (payload: TResetPasswordSchema) => {
  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
    payload,
  );
  return res.data;
};
