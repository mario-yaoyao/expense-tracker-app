import type { TMetricCard } from "../../types/ui";
import "../../styles/ui/metriccard.scss";

const MetricCard = ({ id, title, value, className }: TMetricCard) => {
  return (
    <div key={id} className="metric-card">
      <label>{title}</label>
      <span className={className}>{value}</span>
    </div>
  );
};

export default MetricCard;
