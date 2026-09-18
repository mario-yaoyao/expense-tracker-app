import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { getUserByIdAsync, toggleUserStatusAsync } from "../../api/user";
import { RoleBadge, StatusBadge } from "../../utils/helper";
import { formatDate } from "../../utils/format";
import type { TUserDetails } from "../../types/user";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Confirmation from "../ui/Confirmation";
import ErrorState from "../ui/ErrorState";
import "../../styles/user/user-details.scss";

const UserDetails = ({ userId }: TUserDetails) => {
  const queryClient = useQueryClient();

  const [isUserStatusConfirmationOpen, setIsUserStatusConfirmationOpen] =
    useState(false);

  const openUserStatusConfirmation = () =>
    setIsUserStatusConfirmationOpen(true);
  const closeUserStatusConfirmation = () =>
    setIsUserStatusConfirmationOpen(false);

  const { data, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await getUserByIdAsync(userId);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => toggleUserStatusAsync(Number(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success(
        `User account ${data?.isActive ? "deactivated" : "activated"} successfully`,
      );

      closeUserStatusConfirmation();
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

  const details = [
    {
      label: "Status",
      value: <StatusBadge isActive={data?.isActive ?? false} />,
    },
    {
      label: "Role",
      value: <RoleBadge isSuperAdmin={data?.role === 0} />,
    },
    {
      label: "Username",
      value: data?.username || "—",
    },
    {
      label: "Full Name",
      value: data?.fullName || "—",
    },
    {
      label: "Email Address",
      value: data?.email || "—",
    },
    {
      label: "Contact Number",
      value: data?.contactNumber || "—",
    },
    {
      label: "Created At",
      value: formatDate(data?.createdAt),
    },
    {
      label: "Updated At",
      value: formatDate(data?.updatedAt),
    },
  ];

  if (isError) {
    return (
      <div className="user-details-section error">
        <Title text="User Details" />
        <div className="user-details">
          <ErrorState />
        </div>
      </div>
    );
  }

  return (
    <section className="user-details-section">
      <Title text="User Details" />
      <div className="user-details">
        <div className="details-wrapper">
          {details.map((detail) => (
            <div key={detail.label} className="detail-group">
              <label>{detail.label}</label>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
        <div className="btn-actions">
          <Button
            key="warning"
            label={data?.isActive ? "Deactivate User" : "Activate User"}
            style={data?.isActive ? "deactivate" : "activate"}
            onClickFn={openUserStatusConfirmation}
          />
        </div>
      </div>
      <Confirmation
        isOpen={isUserStatusConfirmationOpen}
        action={!data?.isActive ? "success" : undefined}
        description={
          data?.isActive
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
        onSubmitFn={() => mutation.mutate()}
        onClose={closeUserStatusConfirmation}
        isDisabled={mutation.isPending}
      />
    </section>
  );
};

export default UserDetails;
