import api from "../utils/axios";

export const getProfileAsync = async () => {
  const res = await api.get(`/api/user`);
  return res.data;
};
