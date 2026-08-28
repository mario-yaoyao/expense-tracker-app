export type TExpense = {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TExpenseDetails = {
  expenseId: string;
  id?: number;
  categoryId?: number;
  categoryName?: string;
  amount?: number;
  description?: string;
};

export type TExpenseForm = {
  data?: TExpenseDetails;
  action: "add" | "update";
  closeModalFn: () => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
  isFetchingNextPage?: boolean;
};

export type TExpenseFormSchema = {
  Description: string;
  Amount: number;
  CategoryId: number;
};

export type TExpenses = {
  type?: number;
  page?: number;
  limit?: number;
  search?: string;
};
