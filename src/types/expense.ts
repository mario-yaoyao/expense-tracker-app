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
  category?: string;
  amount?: number;
  description?: string;
};

export type TExpenseForm = {
  data?: TExpenseDetails;
  action: "add" | "update";
  closeModalFn: () => void;
};

export type TAddExpenseSchema = {
  Description: string;
  Amount: number;
  Category: string;
};

export type TUpdateExpenseSchema = {
  Description: string;
  Amount: number;
  Category: string;
};
