import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { deleteCategoryAsync, getCategoryByIdAsync } from "../../api/category";
import { useAuth } from "../../hooks/useAuth";
import { getTypeBadge, StatusBadge } from "../../utils/helper";
import { formatDate } from "../../utils/format";
import type { TCategoryDetails } from "../../types/category";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Confirmation from "../ui/Confirmation";
import CategoryForm from "./CategoryForm";
import Modal from "../ui/Modal";
import Skeleton from "../ui/Sekeleton";
import "../../styles/category/category-details.scss";

const CategoryDetails = ({ categoryId }: TCategoryDetails) => {
  const { user, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const categoryIdNum = Number(categoryId);
  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const openDeleteConfirmation = () => setIsDeleteConfirmationOpen(true);
  const closeDeleteConfirmation = () => setIsDeleteConfirmationOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryIdNum],
    queryFn: async () => {
      const response = await getCategoryByIdAsync(categoryIdNum);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => deleteCategoryAsync(categoryId),
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

  if (isError || !data) {
    return <p>Failed to load category details.</p>;
  }

  const details = [
    ...(isSuperAdmin
      ? [
          {
            label: "Status",
            value: <StatusBadge isActive={!data.isDeleted} />,
          },
          {
            label: "ID",
            value: data.id || "—",
          },
        ]
      : []),
    {
      label: "Name",
      value: data.name?.trim() || "—",
    },
    {
      label: "Type",
      value: getTypeBadge(data.type) || "—",
      isBadge: true,
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
    <section className="category-details-section">
      <Title text="Category Details" />
      <div className="category-details">
        <div className="details-wrapper">
          {details.map((detail) => (
            <div
              key={detail.label}
              className={`detail-group ${detail.isBadge ? "badge-group" : ""} `}
            >
              <label>{detail.label}</label>
              {isLoading ? (
                <Skeleton
                  width={detail.label === "Description" ? "90%" : "30%"}
                />
              ) : (
                <div className="detail-value">{detail.value}</div>
              )}
            </div>
          ))}
        </div>
        {!data.isDeleted && Number(user?.id) === data.userId && (
          <div className="btn-actions">
            <Button
              key="warning"
              label="Update Category"
              style="warning"
              compactOnMobile={true}
              onClickFn={openUpdateModal}
            />
            <Button
              key="danger"
              label="Delete Category"
              style="danger"
              compactOnMobile={true}
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
        <CategoryForm
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

export default CategoryDetails;
