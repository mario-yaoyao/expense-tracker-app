import { formatDate } from "../utils/format";

export const userColumns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: (value: unknown) => String(value ?? "").trim() || "—",
  },
   {
    accessorKey: "email",
    header: "Email Address",
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