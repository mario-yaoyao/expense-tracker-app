import type { IconType } from "react-icons";

export type TInput = {
  name?: string;
  label?: string;
  type?: string;
  placeholder: string;
  icon?: IconType;
  showPasswordToggle?: boolean;
};
