import { formatDate } from "../../utils/format";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "@tanstack/react-router";

import type { TRecentTransactions } from "../../types/dashboard";
import Skeleton from "../ui/Sekeleton";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import "../../styles/dashboard/recent-transactions.scss";

const RecentTransactions = ({
  data,
  isLoading,
  isError,
}: TRecentTransactions) => {
  const { isSuperAdmin } = useAuth();
  const router = useRouter();

  const getClassName = (type: number) => {
    switch (type) {
      case 0:
        return "create";
      case 1:
        return "update";
      case 2:
        return "delete";
      default:
        return "info";
    }
  };

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
              <div
                key={data.id}
                onClick={() =>
                  router.navigate({
                    to: "/transactions/$transactionId",
                    params: {
                      transactionId: data.id.toString(),
                    },
                  })
                }
                className="row"
              >
                <div className={`indicator ${getClassName(data.type)}`} />
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
