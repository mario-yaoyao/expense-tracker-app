import { useState } from "react";

import { useProfile } from "../hooks/useProfile";
import { StatusBadge, RoleBadge } from "../utils/helper";
import { formatDate } from "../utils/format";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";
import "../styles/profile/profile.scss";

const ProfilePage = () => {
  const { profile } = useProfile();

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  const profileDetails = [
    {
      label: "Status",
      value: <StatusBadge isActive={profile?.isActive ?? false} />,
    },
    {
      label: "Role",
      value: <RoleBadge isSuperAdmin={profile?.role === 0} />,
    },
    {
      label: "Username",
      value: profile?.username || "—",
    },
    {
      label: "Full Name",
      value: profile?.fullName || "—",
    },
    {
      label: "Email Address",
      value: profile?.email || "—",
    },
    {
      label: "Contact Number",
      value: profile?.contactNumber || "—",
    },
    {
      label: "Created At",
      value: formatDate(profile?.createdAt),
    },
    {
      label: "Updated At",
      value: formatDate(profile?.updatedAt),
    },
  ];

  return (
    <section className="profile-section">
      <Title text="Profile" />
      <div className="profile-details">
        <div className="details-wrapper">
          {profileDetails.map((detail) => (
            <div key={detail.label} className="detail-group">
              <label>{detail.label}</label>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
        <div className="btn-actions">
          <Button
            key="warning"
            label="Change Password"
            style="warning"
            compactOnMobile={true}
            onClickFn={openChangePasswordModal}
          />
        </div>
      </div>
      <Modal
        isOpen={isChangePasswordModalOpen}
        title="Change Password"
        onClose={closeChangePasswordModal}
      >
        <ChangePasswordForm closeModalFn={closeChangePasswordModal} />
      </Modal>
    </section>
  );
};

export default ProfilePage;
