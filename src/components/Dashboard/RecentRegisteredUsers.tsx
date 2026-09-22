import { useRouter } from "@tanstack/react-router";

import { formatDate } from "../../utils/format";
import { RoleBadge } from "../../utils/helper";
import type { TRecentRegisteredUsersProps } from "../../types/dashboard";
import Skeleton from "../ui/Sekeleton";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import "../../styles/dashboard/recent-users.scss";

const RecentRegisteredUsers = ({
  data,
  isLoading,
  isError,
}: TRecentRegisteredUsersProps) => {
  const router = useRouter();

  if (isError) {
    return (
      <div className="recent-users">
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="recent-users">
      <label>Recently Registered Users</label>
      <div className="list">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <Skeleton width="100%" height="3.375rem" />
              </div>
            ))
          : data.map((recentUser) => (
              <div
                key={recentUser.id}
                onClick={() =>
                  router.navigate({
                    to: "/users/$userId",
                    params: {
                      userId: recentUser.id.toString(),
                    },
                  })
                }
                className="row"
              >
                <div className="content">
                  <div className="detail">
                    <span>{recentUser.username}</span>
                    <RoleBadge isSuperAdmin={recentUser.role === 0} />
                  </div>

                  <p className="date">{formatDate(recentUser.createdAt)}</p>
                </div>
              </div>
            ))}
      </div>
      {!isLoading && !isError && data.length === 0 && <EmptyState />}
    </div>
  );
};

export default RecentRegisteredUsers;
