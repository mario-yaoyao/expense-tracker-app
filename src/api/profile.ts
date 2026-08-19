import type { TChangePasswordSchema } from "../types/profile";
import api from "../utils/axios";

export const getProfileAsync = async () => {
  const res = await api.get(`/api/profile`);
  return res.data;
};

export const changePasswordASync = async (payload: TChangePasswordSchema) => {
  const res = await api.patch(`/api/profile/change-password`, payload);
  return res.data;
};
