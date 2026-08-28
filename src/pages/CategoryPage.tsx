import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getCategoriesAsync } from "../api/category";
import { formatDate } from "../utils/format";
import type { TAction } from "../types/ui";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import CategoryForm from "../components/Category/CategoryForm";
import SearchBar from "../components/ui/SearchBar";
import "../styles/category/category.scss";

const CategoryPage = () => {
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
    queryKey: ["categories", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const response = await getCategoriesAsync({
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

  const categories = data?.pages.flatMap((page) => page.data.items) ?? [];

  const getTypeBadge = (value: number) => {
    return value ? (
      <p className="income">Income</p>
    ) : (
      <p className="expense">Expense</p>
    );
  };

  const categoryColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (value: unknown) => String(value ?? "").trim() || "—",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (value: unknown) => getTypeBadge(value as number),
      isBadge: true,
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: (value: unknown) => formatDate(value as string | null),
    },
    {
      accessorKey: "updatedAt",
      header: "Date Updated",
      cell: (value: unknown) => formatDate(value as string | null),
    },
  ];

  const btnAction: TAction = {
    label: "Add Category",
    variant: "success",
    compactOnMobile: true,
  };

  return (
    <section className="categories-section">
      <Title text="Categories" action={btnAction} openModalFn={openModal} />
      <SearchBar
        value={search}
        onChangeFn={setSearch}
        placeholder="Search for a category record..."
      />
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
