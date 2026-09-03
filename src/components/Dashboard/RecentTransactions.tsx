import { formatDate } from "../../utils/format";
import "../../styles/dashboard/recent-transactions.scss";

const RecentTransactions = () => {
  const mockData = [
    {
      id: 1,
      action: "Added an expense record.",
      type: "expense",
      date: "2026-09-01T09:15:00.1719312",
    },
    {
      id: 2,
      action: "Added an income record.",
      type: "income",
      date: "2026-09-01T10:30:00.2845123",
    },
    {
      id: 3,
      action: "Updated category 'Food & Dining'.",
      type: "category",
      date: "2026-09-01T14:20:00.3928471",
    },
    {
      id: 4,
      action: "Deleted an expense record.",
      type: "expense",
      date: "2026-09-02T08:45:00.1372154",
    },
    {
      id: 5,
      action: "Added a new category 'Transportation'.",
      type: "category",
      date: "2026-09-02T11:00:00.5021938",
    },
    {
      id: 6,
      action: "Updated profile information.",
      type: "info",
      date: "2026-09-02T16:10:00.7284916",
    },
    {
      id: 7,
      action: "Deleted an income record.",
      type: "income",
      date: "2026-09-03T09:00:00.9138427",
    },
    {
      id: 8,
      action: "Added an expense record.",
      type: "expense",
      date: "2026-09-03T10:25:00.1467285",
    },
    {
      id: 9,
      action: "Added an expense record.",
      type: "expense",
      date: "2026-09-03T10:25:00.1467285",
    },
    {
      id: 10,
      action: "Added an expense record.",
      type: "expense",
      date: "2026-09-03T10:25:00.1467285",
    },
  ];

  return (
    <div className="recent-transactions">
      <label>Recent Transactions</label>
      <div className="list">
        {mockData.map((data) => (
          <div key={data.id} className="row">
            <div className={`indicator ${data.type}`} />
            <div className="content">
              <p className="action">{data.action}</p>
              <p className="date">{formatDate(data.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
