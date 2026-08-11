import { useRouter } from "@tanstack/react-router";

import type { TExpense } from "../../types/expense";
import type { TTable } from "../../types/ui";
import "../../styles/ui/table.scss";

const Table = ({ columns, rows }: TTable) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.navigate({
      to: "/expense/$expenseId",
      params: {
        expenseId: id,
      },
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick(row.id)}>
              {columns.map((column) => {
                const value = row[column.accessorKey as keyof TExpense];

                return (
                  <td key={column.accessorKey}>
                    {column.cell ? column.cell(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
