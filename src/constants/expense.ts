import { formatDate } from "../utils/format";

export const expenseColumns = [
  {
    accessorKey: "description",
    header: "Description",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (value: unknown) => `₱${(value as number).toLocaleString()}`,
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
