import type { TAction } from "../types/ui";
import { isSuperAdmin } from "../utils/auth";
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


export const getCategoryBtnActions = (isUser: boolean): TAction[] => [
  ...(isUser
    ? [
        {
          label: "Add Category",
          variant: "success",
          compactOnMobile: true,
        } as TAction,
      ]
    : []),
  {
    label: "Filter Date",
    variant: "calendar",
    compactOnMobile: true,
  } as TAction,
];
