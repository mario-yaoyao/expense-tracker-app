import { formatDate } from "../utils/format";
import { getLogTypeBadge } from "../utils/helper";

export const getTransactionColumns = (isSuperAdmin: boolean) => [
  ...(isSuperAdmin
    ? [
        {
          accessorKey: "username",
          header: "Username",
          cell: (value: unknown) => String(value ?? "").trim() || "—",
        },
        {
          accessorKey: "message",
          header: "Message",
          cell: (value: unknown) => String(value ?? "").trim() || "—",
        },
      ]
    : [
        {
          accessorKey: "activity",
          header: "Activity",
          cell: (value: unknown) => String(value ?? "").trim() || "—",
        },
      ]),
  {
    accessorKey: "type",
    header: "Type",
    cell: (value: unknown) => getLogTypeBadge(value as number),
    isBadge: true,
  },
  {
    accessorKey: "timeStamp",
    header: "Timestamp",
    cell: (value: unknown) => formatDate(value as string | null),
  },
];

export const transactionTypeOptions = [
  { id: 0, label: "All Types", value: -1 },
  { id: 1, label: "Create", value: 0 },
  { id: 2, label: "Update", value: 1 },
  { id: 3, label: "Delete", value: 2 },
  { id: 4, label: "Info", value: 3 },
];
