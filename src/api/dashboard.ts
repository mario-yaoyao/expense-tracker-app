import api from "../utils/axios";

export const getDashboardAsync = async (isSuperAdmin: boolean) => {
  const res = await api.get(`/api/dashboard/${isSuperAdmin ? "super-admin" : "user"}`);

  return res.data.data;
};