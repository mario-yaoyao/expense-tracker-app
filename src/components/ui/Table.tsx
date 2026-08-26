import { useEffect, useRef } from "react";

import type { TExpense } from "../../types/expense";
import type { TTable } from "../../types/ui";
import "../../styles/ui/table.scss";

const Table = ({
  columns,
  rows,
  onRowClick,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: TTable) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
          {hasNextPage && (
            <tr>
              <td colSpan={columns.length}>
                <div ref={sentinelRef} style={{ height: 1 }} />
                {isFetchingNextPage && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px",
                      color: "gray",
                    }}
                  >
                    Loading more data...
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
