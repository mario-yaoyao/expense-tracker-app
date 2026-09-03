import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { TBaseBarChart } from "../../types/ui";

const BaseBarChart = ({ data, xKey, bars }: TBaseBarChart) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: 350,
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
    >
      <CartesianGrid />
      <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
      <YAxis width="auto" tick={{ fontSize: 12 }} />
      <Tooltip
        labelFormatter={(label) => {
          const months: Record<string, string> = {
            Jan: "January",
            Feb: "February",
            Mar: "March",
            Apr: "April",
            May: "May",
            Jun: "June",
            Jul: "July",
            Aug: "August",
            Sep: "September",
            Oct: "October",
            Nov: "November",
            Dec: "December",
          };

          return months[label as string] ?? label;
        }}
        contentStyle={{
          fontSize: "14px",
          borderRadius: "10px",
          padding: "1rem",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
        itemStyle={{
          fontSize: "12px",
          padding: "2px",
        }}
        labelStyle={{
          fontSize: "14px",
          marginBottom: "6px",
          fontWeight: 600,
        }}
      />
      <Legend
        wrapperStyle={{
          fontSize: "14px",
        }}
      />
      {bars.map((bar) => (
        <Bar
          key={bar.dataKey}
          dataKey={bar.dataKey}
          name={bar.label}
          fill={bar.color}
          radius={[10, 10, 0, 0]}
        />
      ))}
    </BarChart>
  );
};

export default BaseBarChart;
