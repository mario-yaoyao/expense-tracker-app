import { useAuth } from "../hooks/useAuth";
import type { TErrors } from "../types/ui";

export const isAuthenticated = () => useAuth.getState().isAuthenticated;

export const isSuperAdmin = () => useAuth.getState().isSuperAdmin;

export const isUser = () => useAuth.getState().isUser;

export const getFieldError = (field: string, errors: TErrors[]) =>
  errors.find((error) => error.field.toLowerCase() === field.toLowerCase());
