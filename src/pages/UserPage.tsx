import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { getUsersAsync } from "../api/user";
import { getDateFilterLabel } from "../utils/helper";
import { expenseBtnActions } from "../constants/expense";
import { userColumns } from "../constants/user";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import SearchBar from "../components/ui/SearchBar";
import DatePicker from "../components/ui/DatePicker";
import Popover from "../components/ui/Popover";
import Button from "../components/ui/Button";
import "../styles/user/user.scss";

const UserPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: [
      "users",
      debouncedSearch,
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: async ({ pageParam }) => {
      return await getUsersAsync({
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

  const users = data?.pages.flatMap((page) => page.data.items) ?? [];

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
    <section className="users-section">
      <Title text="Users" />
      <div className="toolbar">
        <SearchBar
          value={search}
          onChangeFn={setSearch}
          placeholder="Search users..."
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
        columns={userColumns}
        rows={users ?? []}
        onRowClick={(user) =>
          router.navigate({
            to: "/users/$userId",
            params: {
              userId: user.id.toString(),
            },
          })
        }
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
};

export default UserPage;
