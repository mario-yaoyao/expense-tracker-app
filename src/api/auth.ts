import axios from "axios";

import type {
  TForgotPasswordSchema,
  TLoginSchema,
  TRegisterSchema,
  TResetPasswordSchema,
} from "../types/auth";
import { encryptPayload } from "../utils/crypto";

export const loginAsync = async (payload: TLoginSchema) => {
  const encryptedData = await encryptPayload({
    Username: payload.Username,
    Password: payload.Password,
  });

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    { encryptedData },
  );
  return res.data;
};

export const registerAsync = async (payload: TRegisterSchema) => {
  const encryptedData = await encryptPayload({
    FullName: payload.FullName,
    Username: payload.Username,
    Email: payload.Email,
    ContactNumber: payload.ContactNumber,
    Password: payload.Password,
    ConfirmPassword: payload.ConfirmPassword,
  });

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    { encryptedData },
  );
  return res.data;
};

export const refreshTokenAsync = async (
  userId: number | undefined,
  refreshToken: string | null,
) => {
  const encryptedData = await encryptPayload({
    UserId: userId,
    RefreshToken: refreshToken,
  });

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {
      encryptedData,
    },
  );

  return res.data;
};

export const forgotPasswordAsync = async (payload: TForgotPasswordSchema) => {
  const encryptedData = await encryptPayload({
    Email: payload.Email,
  });

  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
    { encryptedData },
  );
  return res.data;
};

export const resetPasswordAsync = async (payload: TResetPasswordSchema) => {
  const encryptedData = await encryptPayload({
    Token: payload.Token,
    NewPassword: payload.NewPassword,
    ConfirmNewPassword: payload.ConfirmNewPassword,
  });

  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
    { encryptedData },
  );
  return res.data;
};
