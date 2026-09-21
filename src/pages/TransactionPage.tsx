import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { getTransactionsAsync } from "../api/transaction";
import { getDateFilterLabel } from "../utils/helper";
import {
  transactionColumns,
  transactionTypeOptions,
} from "../constants/transaction";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Popover from "../components/ui/Popover";
import DatePicker from "../components/ui/DatePicker";
import Dropdown from "../components/ui/Dropdown";
import "../styles/transaction/transaction.scss";

const TransactionPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      selectedType,
      "transactions",
      debouncedSearch,
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: async ({ pageParam }) => {
      const response = await getTransactionsAsync({
        type: selectedType === -1 ? undefined : selectedType,
        page: pageParam,
        limit: 20,
        search: debouncedSearch,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
      });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      return pagination.hasNextPage ? pagination.page + 1 : undefined;
    },
  });

  const transactions = data?.pages.flatMap((page) => page.data.items) ?? [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!isDateFilterOpen && !isTypeFilterOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDropdown = dropdownRef.current?.contains(target);
      const clickedDate = dateRef.current?.contains(target);

      if (!clickedDropdown && !clickedDate) {
        setIsDateFilterOpen(false);
        setIsTypeFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDateFilterOpen, isTypeFilterOpen]);

  return (
    <section className="transactions-section">
      <Title text="Transactions" />
      <div className="toolbar">
        <SearchBar
          value={search}
          onChangeFn={setSearch}
          placeholder="Search transactions..."
        />
        <div className="btns">
          <div ref={dropdownRef}>
            <Dropdown
              isOpen={isTypeFilterOpen}
              name="type"
              options={transactionTypeOptions}
              defaultOption={transactionTypeOptions[0]}
              variant="filter"
              onOpenChange={(isOpen) => {
                setIsTypeFilterOpen(isOpen);

                if (isOpen) {
                  setIsDateFilterOpen(false);
                }
              }}
              onChangeFn={(option) => setSelectedType(Number(option.value))}
            />
          </div>
          <div className="date-picker-wrapper" ref={dateRef}>
            <Button
              label={getDateFilterLabel(startDate, endDate)}
              style="calendar"
              onClickFn={() => {
                setIsDateFilterOpen((prev) => {
                  const next = !prev;

                  if (next) {
                    setIsTypeFilterOpen(false);
                  }

                  return next;
                });
              }}
            />
            <Popover
              isOpen={isDateFilterOpen}
              onClose={() => setIsDateFilterOpen(false)}
            >
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </Popover>
          </div>
        </div>
      </div>
      <Table
        columns={transactionColumns}
        rows={transactions ?? []}
        onRowClick={(transaction) => {
          router.navigate({
            to: "/transactions/$transactionId",
            params: {
              transactionId: transaction.id.toString(),
            },
          });
        }}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
};

export default TransactionPage;
