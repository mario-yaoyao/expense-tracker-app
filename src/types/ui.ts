import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import type { TExpense } from "./expense";

export type TErrors = {
  field: string;
  messages: string[];
};

export type TTable = {
  columns: {
    accessorKey: string;
    header: string;
    cell?: (value: unknown) => ReactNode;
  }[];
  rows: TExpense[];
};

export type TInput = {
  name?: string;
  label?: string;
  type?: string;
  placeholder: string;
  icon?: IconType;
  showPasswordToggle?: boolean;
  errorMessage?: string;
  defaultValue?: string;
};

export type TTextArea = {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  errorMessage?: string;
  defaultValue?: string;
};

export type TModal = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export interface ITitle {
  text: string;
  action?: TAction;
  openModalFn?: () => void;
}

export type TVariant =
  "default" | "outline" | "link" | "success" | "warning" | "danger";

export type TAction = {
  label: string;
  variant: TVariant;
};

export type TButton = {
  type?: "button" | "submit";
  label: string;
  style?: TVariant;
  showIcon?: boolean;
  onClickFn?: () => void;
};

export type TConfirmation = {
  isOpen: boolean;
  description: string;
  onSubmitFn: () => void;
  onClose: () => void;
};
