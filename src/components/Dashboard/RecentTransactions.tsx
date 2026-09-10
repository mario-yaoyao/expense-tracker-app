import { formatDate } from "../../utils/format";
import { useAuth } from "../../hooks/useAuth";

import type { TRecentTransactions } from "../../types/dashboard";
import Skeleton from "../ui/Sekeleton";
import ErrorState from "../ui/ErrorState";
import "../../styles/dashboard/recent-transactions.scss";
import EmptyState from "../ui/EmptyState";

const RecentTransactions = ({
  data,
  isLoading,
  isError,
}: TRecentTransactions) => {
  const { isSuperAdmin } = useAuth();

  if (isError) {
    return (
      <div className="recent-transactions">
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="recent-transactions">
      <label>Recent Transactions</label>
      <div className="list">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton width="100%" height="3.125rem" />
              </div>
            ))
          : data?.map((data) => (
              <div key={data.id} className="row">
                <div
                  className={`indicator ${data.action.toLocaleLowerCase()}`}
                />
                <div className="content">
                  <p className="action">
                    {isSuperAdmin ? data.message : data.activity}
                  </p>
                  <p className="date">{formatDate(data.createdAt)}</p>
                </div>
              </div>
            ))}
      </div>
      {!isLoading && !isError && data.length === 0 && <EmptyState />}
    </div>
  );
};

export default RecentTransactions;
