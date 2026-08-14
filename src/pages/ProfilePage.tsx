import { useProfile } from "../hooks/useProfile";
import Title from "../components/ui/Title";
import "../styles/profile/profile.scss";

const ProfilePage = () => {
  const { profile } = useProfile();

  const getStatusBadge = () => {
    return profile?.isActive ? (
      <p className="status-active">
        <span className="status-dot"></span>
        Active
      </p>
    ) : (
      <p className="status-inactive">
        <span className="status-dot "></span>
        Inactive
      </p>
    );
  };

  const getRoleBadge = () => {
    const isSuperAdmin = profile?.role === 0;

    return (
      <p className={isSuperAdmin ? "role-admin" : "role-user"}>
        <span className="role-dot"></span>
        {isSuperAdmin ? "Super Admin" : "User"}
      </p>
    );
  };

  const details = [
    {
      label: "ID",
      value: profile?.id,
    },
    {
      label: "Status",
      value: getStatusBadge() || "—",
    },
    {
      label: "Username",
      value: profile?.username,
    },
    {
      label: "Full Name",
      value: profile?.fullName,
    },
    {
      label: "Role",
      value: getRoleBadge() || "—",
    },
    {
      label: "Contact Number",
      value: profile?.contactNumber,
    },
  ];

  return (
    <section>
      <Title text="Profile" />
      <div className="profile-details">
        <div className="details-wrapper">
          {details.map((detail) => (
            <div key={detail.label} className="detail-group">
              <label>{detail.label}</label>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
