import type { TAction } from "../types/ui";
import { formatDate } from "../utils/format";
import { getTypeBadge } from "../utils/helper";

export const typeOptions = [
  {
    id: 1,
    label: "Expense",
    value: 0,
  },
  {
    id: 2,
    label: "Income",
    value: 1,
  },
];

export const categoryColumns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (value: unknown) => getTypeBadge(value as number),
    isBadge: true,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (value: unknown) => formatDate(value as string | null),
  },
  {
    accessorKey: "updatedAt",
    header: "Date Updated",
    cell: (value: unknown) => formatDate(value as string | null),
  },
];

export const categoryBtnActions: TAction[] = [
  {
    label: "Add Category",
    variant: "success",
    compactOnMobile: true,
  },
  {
    label: "Filter Date",
    variant: "filter",
    compactOnMobile: true,
  },
];
