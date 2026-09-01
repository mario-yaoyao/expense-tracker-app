import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

import type { TDatePicker } from "../../types/ui";
import "../../styles/ui/date-picker.scss";

const DatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onRangeSelected,
}: TDatePicker) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const selected: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ?? undefined,
          to: endDate ?? undefined,
        }
      : undefined;

  const handleToday = () => {
    setSelectedPreset("today");
    const today = new Date();

    onStartDateChange(today);
    onEndDateChange(today);
  };

  const handleYesterday = () => {
    setSelectedPreset("yesterday");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    onStartDateChange(yesterday);
    onEndDateChange(yesterday);
  };

  const handleLast7Days = () => {
    setSelectedPreset("last-7-days");
    const end = new Date();

    const start = new Date();
    start.setDate(start.getDate() - 6);

    onStartDateChange(start);
    onEndDateChange(end);
  };

  const handleThisMonth = () => {
    setSelectedPreset("this-month");
    const now = new Date();

    onStartDateChange(new Date(now.getFullYear(), now.getMonth(), 1));
    onEndDateChange(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  };

  const handleLastMonth = () => {
    setSelectedPreset("last-month");
    const now = new Date();

    onStartDateChange(new Date(now.getFullYear(), now.getMonth() - 1, 1));
    onEndDateChange(new Date(now.getFullYear(), now.getMonth(), 0));
  };

  const handleReset = () => {
    onStartDateChange(null);
    onEndDateChange(null);
  };

  return (
    <div className="date-picker">
      <div className="presets">
        <button
          className={selectedPreset === "today" ? "active" : ""}
          onClick={handleToday}
        >
          Today
        </button>
        <button
          className={selectedPreset === "yesterday" ? "active" : ""}
          onClick={handleYesterday}
        >
          Yesterday
        </button>
        <button
          className={selectedPreset === "last-7-days" ? "active" : ""}
          onClick={handleLast7Days}
        >
          Last 7 Days
        </button>
        <button
          className={selectedPreset === "this-month" ? "active" : ""}
          onClick={handleThisMonth}
        >
          This Month
        </button>
        <button
          className={selectedPreset === "last-month" ? "active" : ""}
          onClick={handleLastMonth}
        >
          Last Month
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="calendar">
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={(range) => {
            onStartDateChange(range?.from ?? null);
            onEndDateChange(range?.to ?? null);

            if (range?.from && range?.to) {
              onRangeSelected?.();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DatePicker;
