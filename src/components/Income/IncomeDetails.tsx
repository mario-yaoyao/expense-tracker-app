import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { deleteIncomeAsync, getIncomeByIdAsync } from "../../api/income";
import { useAuth } from "../../hooks/useAuth";
import { isSuperAdmin } from "../../utils/auth";
import { StatusBadge } from "../../utils/helper";
import { formatDate } from "../../utils/format";
import type { TIncomeDetails } from "../../types/income";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import IncomeForm from "./IncomeForm";
import Confirmation from "../ui/Confirmation";
import "../../styles/income/income-details.scss";

const IncomeDetails = ({ incomeId }: TIncomeDetails) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const openDeleteConfirmation = () => setIsDeleteConfirmationOpen(true);
  const closeDeleteConfirmation = () => setIsDeleteConfirmationOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["income", incomeId],
    queryFn: async () => {
      const response = await getIncomeByIdAsync(incomeId);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => deleteIncomeAsync(incomeId),
    onSuccess: () => {
      toast.success("Income deleted successfully");
      navigate({ to: "/income" });
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

  if (isLoading) {
    return <p>Loading income details...</p>;
  }

  if (isError || !data) {
    return <p>Failed to load income details.</p>;
  }

  const details = [
    ...(isSuperAdmin()
      ? [
          {
            label: "Status",
            value: <StatusBadge isActive={!data.isDeleted} />,
          },
          {
            label: "ID",
            value: data.id || "—",
          },
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
      label: "Category Name",
      value: data.categoryName?.trim() || "—",
    },
    {
      label: "Amount",
      value: `₱${data.amount.toLocaleString()}`,
      className: "amount",
    },

    {
      label: "Description",
      value: data.description?.trim() || "—",
      className: "description",
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
    <section className="income-details-section">
      <Title text="Income Details" />
      <div className="income-details">
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
        {!data.isDeleted && Number(user?.id) === data.userId && (
          <div className="btn-actions">
            <Button
              key="warning"
              label="Update Income"
              style="warning"
              compactOnMobile={true}
              onClickFn={openUpdateModal}
            />
            <Button
              key="danger"
              label="Delete Income"
              style="danger"
              compactOnMobile={true}
              onClickFn={openDeleteConfirmation}
            />
          </div>
        )}
      </div>
      <Modal
        isOpen={isUpdateModalOpen}
        title="Update Income"
        onClose={closeUpdateModal}
      >
        <IncomeForm
          data={data}
          action="update"
          closeModalFn={closeUpdateModal}
        />
      </Modal>
      <Confirmation
        isOpen={isDeleteConfirmationOpen}
        description="Are you sure you want to delete this income record?"
        onSubmitFn={() => mutation.mutate()}
        onClose={closeDeleteConfirmation}
      />
    </section>
  );
};

export default IncomeDetails;
