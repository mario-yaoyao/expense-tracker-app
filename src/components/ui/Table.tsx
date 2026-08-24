import type { TExpense } from "../../types/expense";
import type { TTable } from "../../types/ui";
import "../../styles/ui/table.scss";

const Table = ({ columns, rows, onRowClick }: TTable) => {
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
            <tr key={row.id} onClick={() => onRowClick?.(row)}>
              {columns.map((column) => {
                const value = row[column.accessorKey as keyof TExpense];

                return (
                  <td
                    key={column.accessorKey}
                    className={column.isBadge ? "badge-cell" : ""}
                  >
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
