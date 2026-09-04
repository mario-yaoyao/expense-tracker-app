import type { TMetricCard } from "../../types/ui";
import Skeleton from "./Sekeleton";
import "../../styles/ui/metric-card.scss";
import ErrorState from "./ErrorState";

const MetricCard = ({
  id,
  title,
  value,
  className,
  isLoading,
  isError,
}: TMetricCard) => {
  return (
    <div key={id} className="metric-card">
      <label>{title}</label>
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
