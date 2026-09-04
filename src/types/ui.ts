import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import type { TExpense } from "./expense";

export type TErrors = {
  field: string;
  messages: string[];
};

type TRow = {
  id: number | string;
  [key: string]: unknown;
};

export type TTable = {
  columns: {
    accessorKey: string;
    header: string;
    cell?: (value: unknown) => ReactNode;
    isBadge?: boolean;
  }[];
  rows: TExpense[];
  onRowClick?: (row: TRow) => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  isLoading: boolean;
  isError: boolean;
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
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
  variant?: "modal" | "popover";
};

export interface ITitle {
  text: string;
  action?: TAction;
  openModalFn?: () => void;
}

export type TVariant =
  | "default"
  | "outline"
  | "link"
  | "back"
  | "success"
  | "warning"
  | "danger"
  | "filter";

export type TAction = {
  label: string;
  variant: TVariant;
  compactOnMobile?: boolean;
};

export type TButton = {
  type?: "button" | "submit";
  label: string;
  style?: TVariant;
  showIcon?: boolean;
  compactOnMobile?: boolean;
  onClickFn?: () => void;
  fullWidthOnMobile?: boolean;
};

export type TConfirmation = {
  isOpen: boolean;
  description: string;
  onSubmitFn: () => void;
  onClose: () => void;
};

export type TPopover = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

type TDropdownOptions = {
  id: number;
  value: number;
  label: string;
};

export type TDropdown = {
  name?: string;
  label?: string;
  options: TDropdownOptions[];
  value?: string;
  defaultOption?: {
    value: number;
    label: string;
  };
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
};

export type TSearchBar = {
  value: string;
  onChangeFn: (value: string) => void;
  placeholder: string;
};

export type TMetricCard = {
  id: number;
  title: string;
  value: number | string;
  className: string;
  isLoading: boolean;
  isError: boolean;
};

export type TDatePicker = {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onRangeSelected?: () => void;
};

export type TStatusBadge = {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

export type TRoleBadge = {
  isSuperAdmin: boolean;
};

export type TChartData = Record<string, string | number>;

export type TBaseLineChart = {
  data: TChartData[];
  xKey: string;
  yKey: string;
  isLoading: boolean;
  isError: boolean;
};


export type TBaseBarChart = {
  data: Record<string, string | number>[];
  xKey: string;
  bars: {
    dataKey: string;
    label: string;
    color: string;
  }[];
  isLoading: boolean;
  isError: boolean;
};

export type TSkeleton = {
  width?: string;
  height?: string;
};

export type TEmptyState = {
  message?: string;
};