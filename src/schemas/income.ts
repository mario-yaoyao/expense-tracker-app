import * as z from "zod";

export const addUpdateIncomeSchema = z.object({
  Description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description must not exceed 200 characters"),
  Amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than 0"),
  CategoryId: z
    .number({
      error: "Category is required",
    })
    .positive("Category is required"),
});
