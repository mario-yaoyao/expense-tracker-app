import type { TAction } from "../types/ui";
import { formatDate } from "../utils/format";

export const incomeColumns = [
  {
    accessorKey: "description",
    header: "Description",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (value: unknown) => value != null ? `₱${Number(value).toLocaleString()}` : "—",
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


export const incomeBtnActions: TAction[] = [
    {
      label: "Add Income",
      variant: "success",
      compactOnMobile: true,
    },
    {
      label: "Filter Date",
      variant: "filter",
      compactOnMobile: true,
    },
  ];