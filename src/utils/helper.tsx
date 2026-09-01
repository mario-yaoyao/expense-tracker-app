import type { TRoleBadge, TStatusBadge } from "../types/ui";

export const getDateFilterLabel = (
  startDate: Date | null,
  endDate: Date | null,
) => {
  if (!startDate || !endDate) {
    return "Filter Date";
  }

  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

export const getTypeBadge = (value: number) => {
  return value ? (
    <p className="income">Income</p>
  ) : (
    <p className="expense">Expense</p>
  );
};

export const StatusBadge = ({
  isActive,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}: TStatusBadge) => {
  return (
    <p className={isActive ? "status-active" : "status-inactive"}>
      <span className="status-dot"></span>
      {isActive ? activeLabel : inactiveLabel}
    </p>
  );
};

export const RoleBadge = ({ isSuperAdmin }: TRoleBadge) => {
  return (
    <p className={isSuperAdmin ? "role-super-admin" : "role-user"}>
      <span className="role-dot"></span>
      {isSuperAdmin ? "Super Admin" : "User"}
    </p>
  );
};

export default RoleBadge;
