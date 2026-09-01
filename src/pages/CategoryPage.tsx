import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { getCategoriesAsync } from "../api/category";
import { getDateFilterLabel } from "../utils/helper";
import { categoryBtnActions, categoryColumns } from "../constants/category";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import CategoryForm from "../components/Category/CategoryForm";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Popover from "../components/ui/Popover";
import DatePicker from "../components/ui/DatePicker";
import "../styles/category/category.scss";

const CategoryPage = () => {
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
    // isLoading,
    // isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "categories",
      debouncedSearch,
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: async ({ pageParam }) => {
      const response = await getCategoriesAsync({
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

  const categories = data?.pages.flatMap((page) => page.data.items) ?? [];

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
    <section className="categories-section">
      <Title
        text="Categories"
        action={categoryBtnActions[0]}
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
            style={categoryBtnActions[1].variant}
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
        columns={categoryColumns}
        rows={categories ?? []}
        onRowClick={(category) => {
          router.navigate({
            to: "/categories/$categoryId",
            params: {
              categoryId: category.id.toString(),
            },
          });
        }}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <Modal isOpen={isOpen} title="Add Expense" onClose={closeModal}>
        <CategoryForm action="add" closeModalFn={closeModal} />
      </Modal>
    </section>
  );
};

export default CategoryPage;
