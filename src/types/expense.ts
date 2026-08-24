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
  id?: string;
  categoryId?: number;
  amount?: number;
  description?: string;
};

export type TExpenseForm = {
  data?: TExpenseDetails;
  action: "add" | "update";
  closeModalFn: () => void;
};

export type TExpenseFormSchema = {
  Description: string;
  Amount: number;
  CategoryId: number;
};
