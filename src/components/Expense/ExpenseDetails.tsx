import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { deleteExpenseAsync, getExpenseByIdAsync } from "../../api/expense";
import { useAuth } from "../../hooks/useAuth";
import { isSuperAdmin } from "../../utils/auth";
import { formatDate } from "../../utils/format";
import type { TExpenseDetails } from "../../types/expense";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ExpenseForm from "./ExpenseForm";
import Confirmation from "../ui/Confirmation";
import "../../styles/expense/expense-details.scss";

const ExpenseDetails = ({ expenseId }: TExpenseDetails) => {
  const navigate = useNavigate();
  const { user } = useAuth.getState();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const openDeleteConfirmation = () => setIsDeleteConfirmationOpen(true);
  const closeDeleteConfirmation = () => setIsDeleteConfirmationOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: async () => {
      const response = await getExpenseByIdAsync(expenseId);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => deleteExpenseAsync(expenseId),
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      navigate({ to: "/expense" });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          toast.error(error.response.data.errors);
        } else {
          toast.error(error.response?.data.errorMessage);
        }
      }
    },
  });

  const getStatusBadge = () => {
    return data.isDeleted ? (
      <p className="status-inactive">
        <span className="status-dot "></span>
        Inactive
      </p>
    ) : (
      <p className="status-active">
        <span className="status-dot"></span>
        Active
      </p>
    );
  };

  if (isLoading) {
    return <p>Loading expense details...</p>;
  }

  if (isError || !data) {
    return <p>Failed to load expense details.</p>;
  }

  const details = [
    {
      label: "ID",
      value: data.id || "—",
    },
    {
      label: "Status",
      value: getStatusBadge() || "—",
    },
    ...(isSuperAdmin()
      ? [
          {
            label: "Username",
            value: data.username || "—",
          },
          {
            label: "Full Name",
            value: data.fullName || "—",
          },
        ]
      : []),
    {
      label: "Description",
      value: data.description?.trim() || "—",
      className: "description",
    },
    {
      label: "Amount",
      value: `₱${data.amount.toLocaleString()}`,
      className: "amount",
    },
    {
      label: "Category",
      value: data.category?.trim() || "—",
    },
    {
      label: "Created At",
      value: formatDate(data.createdAt),
    },
    {
      label: "Updated At",
      value: formatDate(data.updatedAt),
    },
  ];

  return (
    <section className="expense-details">
      <Title text="Expense Details" />
      <div className="details-content">
        <div className="details-wrapper">
          {details.map((detail) => (
            <div
              key={detail.label}
              className={`detail-group ${detail.className ?? ""}`}
            >
              <label>{detail.label}</label>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
        {!data.isDeleted && user?.id === data.userId && (
          <div className="btn-actions">
            <Button
              key="warning"
              label="Update Expense"
              style="warning"
              onClickFn={openUpdateModal}
            />
            <Button
              key="danger"
              label="Delete Expense"
              style="danger"
              onClickFn={openDeleteConfirmation}
            />
          </div>
        )}
      </div>
      <Modal
        isOpen={isUpdateModalOpen}
        title="Add Expense"
        onClose={closeUpdateModal}
      >
        <ExpenseForm
          data={data}
          action="update"
          closeModalFn={closeUpdateModal}
        />
      </Modal>
      <Confirmation
        isOpen={isDeleteConfirmationOpen}
        description="Are you sure you want to delete this expense record?"
        onSubmitFn={() => mutation.mutate()}
        onClose={closeDeleteConfirmation}
      />
    </section>
  );
};

export default ExpenseDetails;
