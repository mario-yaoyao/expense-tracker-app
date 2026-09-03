import { useQuery } from "@tanstack/react-query";

import { getDashboardAsync } from "../api/dashboard";
import { formatCurrency } from "../utils/format";
import { useAuth } from "../hooks/useAuth";
import Title from "../components/ui/Title";
import MetricCard from "../components/ui/MetricCard";
import BaseLineChart from "../components/ui/LineChart";
import BaseBarChart from "../components/ui/BarChart";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import RecentRegisteredUsers from "../components/Dashboard/RecentRegisteredUsers";
import "../styles/dashboard/dashboard.scss";

const DashboardPage = () => {
  const { isSuperAdmin, isUser } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardAsync(isSuperAdmin),
  });

  const metrics = data?.pages?.[0]?.data?.metrics;

  if (isError) {
    return <div>Error loading dashboard</div>;
  }

  const balanceClassName =
    metrics?.balance == null
      ? "info"
      : metrics.balance > 0
        ? "success"
        : metrics.balance < 0
          ? "danger"
          : "info";

  const metricsData = [
    ...(isSuperAdmin
      ? [
          {
            id: 1,
            title: "Total Users",
            value: metrics?.totalUsers,
            className: "info",
          },
          {
            id: 2,
            title: "Active Users",
            value: metrics?.activeUsers,
            className: metrics?.activeUsers > 1 ? "success" : "danger",
          },
          {
            id: 3,
            title: "New Users",
            value: metrics?.newUsers,
            className: metrics?.newUsers > 1 ? "success" : "info",
          },
        ]
      : []),
    ...(isUser
      ? [
          {
            id: 4,
            title: "Total Income",
            value: formatCurrency(metrics?.totalIncome),
            className: "success",
          },
          {
            id: 5,
            title: "Total Expense",
            value: formatCurrency(metrics?.totalExpense),
            className: "danger",
          },
          {
            id: 6,
            title: "Balance",
            value: formatCurrency(metrics?.balance),
            className: balanceClassName,
          },
        ]
      : []),
  ];

  return (
    <section className="dashboard-section">
      <Title text="Dashboard" />
      <div className="dashboard-wrapper">
        <div className="metrics">
          {metricsData.map((metric) => {
            return (
              <MetricCard
                key={metric.id}
                id={metric.id}
                title={metric.title}
                value={metric.value}
                className={metric.className}
                isLoading={isLoading}
              />
            );
          })}
        </div>
        <div className="charts-wrapper">
          <div
            className={`line-chart-wrapper ${isSuperAdmin ? "superAdmin" : "user"}`}
          >
            <BaseLineChart
              data={isSuperAdmin ? data?.usersGrowthTrend : data?.savingsTrend}
              xKey="month"
              yKey={isSuperAdmin ? "newUsers" : "savings"}
              isLoading={isLoading}
            />
          </div>
          {isUser ? (
            <div className="bar-chart-wrapper">
              <BaseBarChart
                data={data?.incomeExpenseTrend}
                xKey="month"
                bars={[
                  {
                    dataKey: "income",
                    label: "Income",
                    color: "#22c55e",
                  },
                  {
                    dataKey: "expense",
                    label: "Expense",
                    color: "#e11d48",
                  },
                ]}
              />
            </div>
          ) : null}
        </div>
        <div className="recent-transactions-wrapper">
          {isSuperAdmin ? (
            <RecentRegisteredUsers
              data={data?.recentUsers ?? []}
              isLoading={isLoading}
            />
          ) : (
            <RecentTransactions />
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
