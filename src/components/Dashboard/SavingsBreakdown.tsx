import { formatCurrency } from "../../utils/format";
import { getMonthName } from "../../utils/helper";
import type { TSavingsBreakdown } from "../../types/dashboard";
import Skeleton from "../ui/Sekeleton";
import "../../styles/dashboard/savings-breakdown.scss";

const SavingsBreakdown = ({
  title,
  description,
  data,
  isLoading,
}: TSavingsBreakdown) => {
  const currentMonth = new Date().getMonth();

  return (
    <section className="savings-breakdown-section">
      <div className="savings-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="savings-content">
        {data.map((item, idx) => {
          const isCurrentMonth = idx === currentMonth;
          const isFutureMonth = idx > currentMonth;

          const hasActivity =
            Number(item.income) > 0 ||
            Number(item.expense) > 0 ||
            Number(item.savings) !== 0;

          return (
            <div
              key={item.month}
              className={`month-card ${isCurrentMonth ? "current" : ""}`}
            >
              <h4>{getMonthName(item.month)}</h4>
              {isFutureMonth ? (
                <div className="card-state future">
                  <span>Upcoming Month</span>
                  <small>Data will appear once this month starts.</small>
                </div>
              ) : !hasActivity ? (
                <div className="card-state empty">
                  <span>No Activity</span>
                  <small>No transactions recorded.</small>
                </div>
              ) : (
                <>
                  <div className="metric-row income">
                    <span>Income</span>
                    {isLoading ? (
                      <Skeleton width="40%" />
                    ) : (
                      <strong>{formatCurrency(Number(item.income))}</strong>
                    )}
                  </div>
                  <div className="metric-row expense">
                    <span>Expense</span>
                    {isLoading ? (
                      <Skeleton width="40%" />
                    ) : (
                      <strong>{formatCurrency(Number(item.expense))}</strong>
                    )}
                  </div>
                  <div className="metric-row savings">
                    <span>Saved</span>
                    {isLoading ? (
                      <Skeleton width="40%" />
                    ) : (
                      <strong>{formatCurrency(Number(item.savings))}</strong>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavingsBreakdown;
