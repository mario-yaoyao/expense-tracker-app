export type TIncome = {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TIncomeDetails = {
  incomeId: string;
  id?: number;
  categoryId?: number;
  categoryName?: string;
  amount?: number;
  description?: string;
};

export type TIncomeForm = {
  data?: TIncomeDetails;
  action: "add" | "update";
  closeModalFn: () => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
  isFetchingNextPage?: boolean;
};

export type TIncomeFormSchema = {
  Description: string;
  Amount: number;
  CategoryId: number;
};

export type TIncomes = {
  type?: number;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
};
