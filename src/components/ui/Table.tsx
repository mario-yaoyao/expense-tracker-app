import { useEffect, useRef } from "react";

import type { TExpense } from "../../types/expense";
import type { TTable } from "../../types/ui";
import "../../styles/ui/table.scss";
import Skeleton from "./Sekeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

const Table = ({
  columns,
  rows,
  onRowClick,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
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

  if (isError) {
    return (
      <div className="table-container fill">
        <ErrorState />
      </div>
    );
  }

  return (
    <div className={`table-container ${rows.length === 0 ? "fill" : null}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 20 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column.accessorKey}>
                      <Skeleton width="100%" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row)}>
                  {columns.map((column) => {
                    const value = row[column.accessorKey as keyof TExpense];

                    return (
                      <td
                        key={column.accessorKey}
                        className={[
                          column.isBadge ? "badge-cell" : "",
                          column.accessorKey === "description"
                            ? "description-cell"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
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
      {!isLoading && !isError && rows.length === 0 && <EmptyState />}
    </div>
  );
};

export default Table;
