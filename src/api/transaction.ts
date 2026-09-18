import api from "../utils/axios";
import type { TTransactions } from "../types/transaction";

export const getTransactionsAsync = async ({
  type,
  page = 1,
  limit,
  search,
  startDate,
  endDate,
}: TTransactions) => {
  const res = await api.get("/api/transactions", {
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

export const getTransactionByIdAsync = async (transactionId: number) => {
  const res = await api.get(`/api/transactions/${transactionId}`);
  return res.data;
};