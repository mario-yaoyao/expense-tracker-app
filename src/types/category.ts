export type TCategoryDetails = {
  categoryId: string;
  id?: number;
  userId?: number;
  name?: string;
  type?: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCategoryForm = {
  data?: TCategoryDetails;
  action: "add" | "update";
  closeModalFn: () => void;
};

export type TCategoryFormSchema = {
  Name: string;
  Type: number;
};

export type TCategories = {
  type?: number;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
};
