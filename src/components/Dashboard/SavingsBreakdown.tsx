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
          const isFutureMonth = idx > currentMonth;

          return (
            <div key={item.month} className="month-card">
              <h4>{getMonthName(item.month)}</h4>
              <div className="metric-row income">
                <span>Income</span>
                {isLoading ? (
                  <Skeleton width="40%" />
                ) : (
                  <strong>
                    {isFutureMonth ? "—" : formatCurrency(Number(item.income))}
                  </strong>
                )}
              </div>
              <div className="metric-row expense">
                <span>Expense</span>
                {isLoading ? (
                  <Skeleton width="40%" />
                ) : (
                  <strong>
                    {isFutureMonth ? "—" : formatCurrency(Number(item.expense))}
                  </strong>
                )}
              </div>
              <div className="metric-row savings">
                <span>Saved</span>
                {isLoading ? (
                  <Skeleton width="40%" />
                ) : (
                  <strong>
                    {isFutureMonth ? "—" : formatCurrency(Number(item.savings))}
                  </strong>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavingsBreakdown;
