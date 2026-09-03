import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  createHorizontalChart,
} from "recharts";

import { formatWord } from "../../utils/format";
import type { TBaseLineChart, TChartData } from "../../types/ui";
import Skeleton from "./Sekeleton";

const Typed = createHorizontalChart<TChartData, string, number>()({
  XAxis,
  YAxis,
  Tooltip,
  Line,
});

const BaseLineChart = ({ data, xKey, yKey, isLoading }: TBaseLineChart) => {
  return isLoading ? (
    <Skeleton width="100%" height="350px" />
  ) : (
    <Typed.LineChart
      style={{
        width: "100%",
        height: "380px",
      }}
      responsive
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Typed.XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
      <Typed.YAxis width="auto" tick={{ fontSize: 12 }} />
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

      <Typed.Line
        type="monotone"
        dataKey={yKey}
        name={formatWord(yKey)}
        stroke="#279af1"
        strokeWidth={2}
      />
    </Typed.LineChart>
  );
};

export default BaseLineChart;
