export type TTransactionDetails = {
  transactionId: string;
  id?: number;
  userId?: number;
  name?: string;
  type?: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TTransactions = {
  type?: number;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
};
