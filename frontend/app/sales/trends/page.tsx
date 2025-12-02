// app/sales/trends/page.tsx
import TimeSeriesDrillDown from "@/components/sales/trends/RevenueByMonthDrillDown";
import WeekendWeekdays from "@/components/sales/trends/WeekendWeekdays";
import BestMonth from "@/components/sales/trends/BestMonth";

export default function EmployeePerformance() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trends</h1>
      <TimeSeriesDrillDown />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WeekendWeekdays />
        <BestMonth />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
