import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { getExpensesAsync } from "../api/expense";
import { isSuperAdmin } from "../utils/auth";
import { getDateFilterLabel } from "../utils/helper";
import { expenseBtnActions, expenseColumns } from "../constants/expense";
import ExpenseForm from "../components/Expense/ExpenseForm";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import SearchBar from "../components/ui/SearchBar";
import MetricCard from "../components/ui/MetricCard";
import DatePicker from "../components/ui/DatePicker";
import Popover from "../components/ui/Popover";
import Button from "../components/ui/Button";
import "../styles/expense/expense.scss";

const ExpensePage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "expenses",
        debouncedSearch,
        startDate?.toISOString(),
        endDate?.toISOString(),
      ],
      queryFn: async ({ pageParam }) => {
        return await getExpensesAsync({
          page: pageParam,
          limit: 20,
          search: debouncedSearch,
          startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
          endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
        });
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!isDateFilterOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDateFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDateFilterOpen]);

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
      <Title
        text="Expenses"
        action={expenseBtnActions[0]}
        openModalFn={openModal}
      />
      <div className="toolbar">
        <SearchBar
          value={search}
          onChangeFn={setSearch}
          placeholder="Search expenses..."
        />
        <div className="date-picker-wrapper" ref={wrapperRef}>
          <Button
            label={getDateFilterLabel(startDate, endDate)}
            style={expenseBtnActions[1].variant}
            onClickFn={() => setIsDateFilterOpen((prev) => !prev)}
          />
          <Popover
            isOpen={isDateFilterOpen}
            onClose={() => setIsDateFilterOpen(false)}
          >
            <div>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </div>
          </Popover>
        </div>
      </div>
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
