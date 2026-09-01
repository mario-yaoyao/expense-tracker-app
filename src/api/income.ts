import type { TIncomeFormSchema, TIncomes } from "../types/income";
import api from "../utils/axios";

export const getIncomesAsync = async ({
  type,
  page = 1,
  limit,
  search,
  startDate,
  endDate,
}: TIncomes) => {
  const res = await api.get("/api/incomes", {
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

export const getIncomeByIdAsync = async (incomeId: string) => {
  const res = await api.get(`/api/incomes/${incomeId}`);
  return res.data;
};

export const addIncomeAsync = async (payload: TIncomeFormSchema) => {
  const res = await api.post(`/api/incomes`, payload);
  return res.data;
};

export const updateIncomeAsync = async (
  incomeId: number,
  payload: TIncomeFormSchema,
) => {
  const res = await api.patch(`/api/incomes/${incomeId}`, payload);
  return res.data;
};

export const deleteIncomeAsync = async (incomeId: string) => {
  const res = await api.delete(`/api/incomes/${incomeId}`);
  return res.data;
};
