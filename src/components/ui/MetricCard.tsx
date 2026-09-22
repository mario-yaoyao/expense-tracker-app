import { IoInformationCircleOutline } from "react-icons/io5";

import type { TMetricCard } from "../../types/ui";
import Skeleton from "./Sekeleton";
import ErrorState from "./ErrorState";
import "../../styles/ui/metric-card.scss";

const MetricCard = ({
  id,
  title,
  period,
  value,
  className,
  onClickFn,
  isLoading,
  isError,
}: TMetricCard) => {
  return (
    <div key={id} className="metric-card">
      <div className="label">
        <label>
          {title} {period && `(${period})`}
        </label>
        {id === 7 && (
          <button onClick={onClickFn} title="View monthly savings breakdown">
            <IoInformationCircleOutline size={18} />
          </button>
        )}
      </div>
      {isLoading ? (
        <Skeleton width="40%" />
      ) : isError ? (
        <ErrorState
          singleLiner={true}
          message="Failed to load data. Please try again."
        />
      ) : (
        <span className={className}>{value}</span>
      )}
    </div>
  );
};

export default MetricCard;
