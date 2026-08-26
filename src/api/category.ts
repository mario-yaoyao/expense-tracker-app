import type { TCategoryFormSchema } from "../types/category";
import api from "../utils/axios";

export const getCategoriesAsync = async ({
  type,
  page = 1,
  limit,
  search,
}: {
  type?: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const res = await api.get("/api/categories", {
    params: {
      type,
      page,
      limit,
      search,
    },
  });

  return res.data;
};

export const getCategoryByIdAsync = async (categoryId: number) => {
  const res = await api.get(`/api/categories/${categoryId}`);
  return res.data;
};

export const addCategoryAsync = async (payload: TCategoryFormSchema) => {
  const res = await api.post(`/api/categories`, payload);
  return res.data;
};

export const updateCategoryAsync = async (
  categoryId: number,
  payload: TCategoryFormSchema,
) => {
  const res = await api.put(`/api/categories/${categoryId}`, payload);
  return res.data;
};

export const deleteCategoryAsync = async (categoryId: string) => {
  const res = await api.delete(`/api/categories/${categoryId}`);
  return res.data;
};
