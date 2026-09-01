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
  const selected: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ?? undefined,
          to: endDate ?? undefined,
        }
      : undefined;

  const handleToday = () => {
    const today = new Date();

    onStartDateChange(today);
    onEndDateChange(today);
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    onStartDateChange(yesterday);
    onEndDateChange(yesterday);
  };

  const handleLast7Days = () => {
    const end = new Date();

    const start = new Date();
    start.setDate(start.getDate() - 6);

    onStartDateChange(start);
    onEndDateChange(end);
  };

  const handleThisMonth = () => {
    const now = new Date();

    onStartDateChange(new Date(now.getFullYear(), now.getMonth(), 1));
    onEndDateChange(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  };

  const handleLastMonth = () => {
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
        <button onClick={handleToday}>Today</button>
        <button onClick={handleYesterday}>Yesterday</button>
        <button onClick={handleLast7Days}>Last 7 Days</button>
        <button onClick={handleThisMonth}>This Month</button>
        <button onClick={handleLastMonth}>Last Month</button>
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
