import * as z from "zod";

export const changePasswordSchema = z
  .object({
    CurrentPassword: z
      .string()
      .min(8, "Username must be atleast 8 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number",
      ),
    NewPassword: z
      .string()
      .min(8, "Username must be atleast 8 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number",
      ),
    ConfirmNewPassword: z.string(),
  })
  .refine((d) => d.NewPassword === d.ConfirmNewPassword, {
    message: "Passwords do not match",
    path: ["ConfirmNewPassword"],
  });
