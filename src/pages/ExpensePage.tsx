import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getExpensesAsync } from "../api/expense";
import { isSuperAdmin } from "../utils/auth";
import { expenseColumns } from "../constants/expense";
import type { TAction } from "../types/ui";
import ExpenseForm from "../components/Expense/ExpenseForm";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import SearchBar from "../components/ui/SearchBar";
import MetricCard from "../components/ui/MetricCard";
import "../styles/expense/expense.scss";

const ExpensePage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    // isLoading,
    // isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["expenses", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const response = await getExpensesAsync({
        page: pageParam,
        limit: 20,
        search: debouncedSearch,
      });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      return pagination.hasNextPage ? pagination.page + 1 : undefined;
    },
  });

  const expenses = data?.pages.flatMap((page) => page.data.items) ?? [];
  const summary = data?.pages[0].data;
  const metrics = summary?.metrics;

  const btnAction: TAction = {
    label: "Add Expense",
    variant: "success",
    compactOnMobile: true,
  };

  const metricsData = [
    ...(!isSuperAdmin()
      ? [
          {
            id: 1,
            title: "Total Expense Cost",
            value:
              metrics?.totalAmount != null
                ? `₱${metrics.totalAmount.toLocaleString()}`
                : "—",
            className: "danger",
          },
          {
            id: 2,
            title: "Highest Expense",
            value:
              metrics?.highestAmount != null
                ? `₱${metrics.highestAmount.amount.toLocaleString()} (${metrics.highestAmount.name})`
                : "—",
            className: "warning",
          },
        ]
      : []),
    {
      id: 3,
      title: "Total Expense Records",
      value:
        metrics?.totalCount != null ? metrics.totalCount.toLocaleString() : "—",
      className: "info",
    },
  ];

  return (
    <section className="expenses-section">
      <div className="metrics">
        {metricsData.map((metric) => {
          return (
            <MetricCard
              id={metric.id}
              title={metric.title}
              value={metric.value}
              className={metric.className}
            />
          );
        })}
      </div>
      <Title text="Expenses" action={btnAction} openModalFn={openModal} />
      <SearchBar
        value={search}
        onChangeFn={setSearch}
        placeholder="Search for an expense record..."
      />
      <Table
        columns={expenseColumns}
        rows={expenses ?? []}
        onRowClick={(expense) =>
          router.navigate({
            to: "/expense/$expenseId",
            params: {
              expenseId: expense.id.toString(),
            },
          })
        }
      />
      <Modal isOpen={isOpen} title="Add Expense" onClose={closeModal}>
        <ExpenseForm
          action="add"
          closeModalFn={closeModal}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Modal>
    </section>
  );
};

export default ExpensePage;
