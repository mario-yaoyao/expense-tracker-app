import { useQuery } from "@tanstack/react-query";

import { getTransactionByIdAsync } from "../../api/transaction";
import { useAuth } from "../../hooks/useAuth";
import { getLogTypeBadge } from "../../utils/helper";
import { formatDate } from "../../utils/format";
import type { TTransactionDetails } from "../../types/transaction";
import Title from "../ui/Title";
import Skeleton from "../ui/Sekeleton";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import "../../styles/transaction/transaction-details.scss";

const TransactionDetails = ({ transactionId }: TTransactionDetails) => {
  const { isSuperAdmin } = useAuth();

  const transactionIdNum = Number(transactionId);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transaction", transactionIdNum],
    queryFn: async () => {
      const response = await getTransactionByIdAsync(transactionIdNum);
      return response.data;
    },
  });

  const details = [
    ...(isSuperAdmin
      ? [
          {
            label: "ID",
            value: data?.id || "—",
          },
          {
            label: "Username",
            value: data?.username?.trim() || "—",
          },
        ]
      : []),
    {
      label: "Type",
      value: getLogTypeBadge(data?.type) || "—",
      isBadge: true,
    },
    {
      label: "Timestamp",
      value: formatDate(data?.timeStamp),
    },
    ...(isSuperAdmin
      ? [
          {
            label: "Message",
            value: data?.message,
            className: "message",
          },
        ]
      : [
          {
            label: "Activity",
            value: data?.activity,
            className: "activity",
          },
        ]),
  ];

  if (!data) {
    return (
      <div className="transaction-details-section error">
        <Title text="Transaction Details" />
        <div className="transaction-details">
          <EmptyState />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="transaction-details-section error">
        <Title text="Transaction Details" />
        <div className="transaction-details">
          <ErrorState />
        </div>
      </div>
    );
  }

  return (
    <section className="transaction-details-section">
      <Title text="Transaction Details" />
      <div className="transaction-details">
        <div className="details-wrapper">
          {details.map((detail) => (
            <div
              key={detail.label}
              className={`detail-group ${detail.isBadge ? "badge-group" : ""} ${detail.className} `}
            >
              <label>{detail.label}</label>
              {isLoading ? (
                <Skeleton
                  width={
                    ["Activity", "Message"].includes(detail.label)
                      ? "90%"
                      : "30%"
                  }
                />
              ) : (
                <div className="detail-value">{detail.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionDetails;
