import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { getCategoriesAsync } from "../api/category";
import { formatDate } from "../utils/format";
import type { TAction } from "../types/ui";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import CategoryForm from "../components/Category/CategoryForm";
import "../styles/category/category.scss";

const CategoryPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAsync(),
  });

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
      <Table
        columns={categoryColumns}
        rows={data?.data ?? []}
        onRowClick={(category) => {
          console.log("clicked");
          router.navigate({
            to: "/categories/$categoryId",
            params: {
              categoryId: category.id.toString(),
            },
          });
        }}
      />
      <Modal isOpen={isOpen} title="Add Expense" onClose={closeModal}>
        <CategoryForm action="add" closeModalFn={closeModal} />
      </Modal>
    </section>
  );
};

export default CategoryPage;
