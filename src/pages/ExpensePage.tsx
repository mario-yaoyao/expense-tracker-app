import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { getExpensesAsync } from "../api/expense";
import { expenseColumns } from "../constants/expense";
import type { TAction } from "../types/ui";
import ExpenseForm from "../components/Expense/ExpenseForm";
import Table from "../components/ui/Table";
import Title from "../components/ui/Title";
import Modal from "../components/ui/Modal";
import "../styles/expense/expense.scss";

const ExpensePage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesAsync,
  });

  const btnAction: TAction = {
    label: "Add Expense",
    variant: "success",
    compactOnMobile: true,
  };

  return (
    <section className="expenses-section">
      <Title text="Expenses" action={btnAction} openModalFn={openModal} />
      <Table
        columns={expenseColumns}
        rows={data?.data ?? []}
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
        <ExpenseForm action="add" closeModalFn={closeModal} />
      </Modal>
    </section>
  );
};

export default ExpensePage;
