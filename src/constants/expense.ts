import type { TAction } from "../types/ui";
import { isSuperAdmin } from "../utils/auth";
import { formatDate } from "../utils/format";

export const expenseColumns = [
  ...(isSuperAdmin()
    ? [
        {
          accessorKey: "username",
          header: "Username",
          cell: (value: unknown) => String(value ?? "").trim() || "—",
        },
      ]
    : []),
  {
    accessorKey: "description",
    header: "Description",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (value: unknown) =>
      value != null ? `₱${Number(value).toLocaleString()}` : "—",
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
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

export const expenseBtnActions: TAction[] = [
  {
    label: "Add Expense",
    variant: "success",
    compactOnMobile: true,
  },
  {
    label: "Filter Date",
    variant: "calendar",
    compactOnMobile: true,
  },
];
