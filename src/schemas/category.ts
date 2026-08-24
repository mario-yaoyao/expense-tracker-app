import * as z from "zod";

export const addUpdateCategorySchema = z.object({
  Name: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description must not exceed 200 characters"),
  Type: z.coerce.number({
    error: "Type is required",
  }),
});
