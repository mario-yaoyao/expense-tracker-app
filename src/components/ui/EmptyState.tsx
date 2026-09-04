import type { TEmptyState } from "../../types/ui";
import "../../styles/ui/empty-state.scss";

const EmptyState = ({ message = "No data available." }: TEmptyState) => {
  return <div className="no-data">{message}</div>;
};

export default EmptyState;
