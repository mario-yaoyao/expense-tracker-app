import type { TAction, TRoleBadge, TStatusBadge } from "../types/ui";

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
    <p className={isSuperAdmin ? "super-admin" : "user"}>
      <span className="role-dot"></span>
      {isSuperAdmin ? "Super Admin" : "User"}
    </p>
  );
};

export const getLogTypeBadge = (value: number) => {
  switch (value) {
    case 0:
      return <p className="create">Create</p>;
    case 1:
      return <p className="update">Update</p>;
    case 2:
      return <p className="delete">Delete</p>;
    default:
      return <p className="info">Info</p>;
  }
};

export const getMonthName = (month: string | number) => {
  const months: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  return months[month] ?? month;
};

export const filterAction = (actions: TAction[], searchText: string) => {
  return actions.find((action) => action.label === searchText);
};
