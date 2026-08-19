import * as z from "zod";

export const addUpdateExpenseSchema = z.object({
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
  Category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(100, "Category must not exceed 100 characters"),
});
