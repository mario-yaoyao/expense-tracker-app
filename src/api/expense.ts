import type { TExpenseFormSchema } from "../types/expense";
import api from "../utils/axios";

export const getExpensesAsync = async () => {
  const res = await api.get(`/api/expenses`);
  return res.data;
};

export const getExpenseByIdAsync = async (expenseId: string) => {
  const res = await api.get(`/api/expenses/${expenseId}`);
  return res.data;
};

export const addExpenseAsync = async (payload: TExpenseFormSchema) => {
  const res = await api.post(`/api/expenses`, payload);
  return res.data;
};

export const updateExpenseAsync = async (
  expenseId: string,
  payload: TExpenseFormSchema,
) => {
  const res = await api.put(`/api/expenses/${expenseId}`, payload);
  return res.data;
};

export const deleteExpenseAsync = async (expenseId: string) => {
  const res = await api.delete(`/api/expenses/${expenseId}`);
  return res.data;
};
