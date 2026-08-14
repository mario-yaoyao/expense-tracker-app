import * as z from "zod";

export const loginSchema = z.object({
  Username: z.string().min(1, "Username is required"),
  Password: z.string().min(1, "Password is required"),
});

const phMobileRegex = /^(\+63|0)9\d{9}$/;

export const registerSchema = z
  .object({
    FullName: z
      .string()
      .min(2, "Full name must be atleast 2 characters")
      .max(100, "Full name must not exceed 100 characters")
      .regex(/^[a-zA-Z\s.-]+$/, "Full name contains invalid characters"),
    Username: z
      .string()
      .min(3, "Username must be atleast 3 characters")
      .max(50, "Username must not exceed 100 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, underscore",
      ),
    ContactNumber: z
      .string()
      .min(10, "Contact number must be atleast 10 digits")
      .max(20, "Contact number must not exceed 20 digits")
      .regex(phMobileRegex, "Invalid Philippine mobile number"),
    Password: z
      .string()
      .min(8, "Username must be atleast 8 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number",
      ),
    ConfirmPassword: z.string(),
  })
  .refine((d) => d.Password === d.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  Email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
