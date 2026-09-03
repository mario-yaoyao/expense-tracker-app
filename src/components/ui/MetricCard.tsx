import type { TMetricCard } from "../../types/ui";
import Skeleton from "./Sekeleton";
import "../../styles/ui/metric-card.scss";

const MetricCard = ({
  id,
  title,
  value,
  className,
  isLoading,
}: TMetricCard) => {
  return (
    <div key={id} className="metric-card">
      <label>{title}</label>
      {isLoading ? (
        <Skeleton width="40%" />
      ) : (
        <span className={className}>{value}</span>
      )}
    </div>
  );
};

export default MetricCard;
