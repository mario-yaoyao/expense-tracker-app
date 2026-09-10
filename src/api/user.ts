import type { TUsers } from "../types/user";
import api from "../utils/axios";

export const getUsersAsync = async ({
  type,
  page = 1,
  limit,
  search,
  startDate,
  endDate,
}: TUsers) => {
  const res = await api.get("/api/users", {
    params: {
      type,
      page,
      limit,
      search,
      startDate,
      endDate,
    },
  });

  return res.data;
};

export const getUserByIdAsync = async (userId: string) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
};

export const toggleUserStatusAsync = async (
  userId: number,
) => {
  const res = await api.patch(`/api/users/${userId}`);
  return res.data;
};