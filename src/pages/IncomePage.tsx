import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { getIncomesAsync } from "../api/income";
import { useAuth } from "../hooks/useAuth";
import { getDateFilterLabel } from "../utils/helper";
import { formatCurrency } from "../utils/format";
import { incomeBtnActions, incomeColumns } from "../constants/income";
import IncomeForm from "../components/Income/IncomeForm";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import SearchBar from "../components/ui/SearchBar";
import MetricCard from "../components/ui/MetricCard";
import DatePicker from "../components/ui/DatePicker";
import Popover from "../components/ui/Popover";
import Button from "../components/ui/Button";
import "../styles/income/income.scss";

const IncomePage = () => {
  const { isSuperAdmin } = useAuth();
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

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "incomes",
      debouncedSearch,
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: async ({ pageParam }) => {
      return await getIncomesAsync({
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

  const incomes = data?.pages.flatMap((page) => page.data.items) ?? [];
  const summary = data?.pages[0].data;
  const metrics = summary?.metrics;

  const metricsData = [
    ...(!isSuperAdmin
      ? [
          {
            id: 1,
            title: "Total Income Cost",
            value: formatCurrency(metrics?.totalAmount),
            className: "danger",
          },
          {
            id: 2,
            title: "Highest Income",
            value: metrics?.highestAmount
              ? `${formatCurrency(metrics.highestAmount.amount)} (${metrics.highestAmount.name})`
              : "—",
            className: "warning",
          },
        ]
      : []),
    {
      id: 3,
      title: "Total Income Records",
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
    <section className="incomes-section">
      <div className="metrics">
        {metricsData.map((metric) => {
          return (
            <MetricCard
              key={metric.id}
              id={metric.id}
              title={metric.title}
              value={metric.value}
              className={metric.className}
              isLoading={isLoading}
              isError={isError}
            />
          );
        })}
      </div>
      <Title
        text="Incomes"
        action={incomeBtnActions[0]}
        openModalFn={openModal}
      />
      <div className="toolbar">
        <SearchBar
          value={search}
          onChangeFn={setSearch}
          placeholder="Search incomes..."
        />
        <div className="date-picker-wrapper" ref={wrapperRef}>
          <Button
            label={getDateFilterLabel(startDate, endDate)}
            style={incomeBtnActions[1].variant}
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
        columns={incomeColumns}
        rows={incomes ?? []}
        onRowClick={(income) =>
          router.navigate({
            to: "/income/$incomeId",
            params: {
              incomeId: income.id.toString(),
            },
          })
        }
        isLoading={isLoading}
        isError={isError}
      />
      <Modal isOpen={isOpen} title="Add Income" onClose={closeModal}>
        <IncomeForm
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

export default IncomePage;
