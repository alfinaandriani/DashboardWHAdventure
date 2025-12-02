// app/sales/employee/page.tsx
import EmpPerformance from "@/components/sales/employees/EmployeePerformance";
import EmployeeTopProduct from "@/components/sales/employees/EmployeeTopProduct";

export default function EmployeePerformance() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Employee Performance
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EmpPerformance />
        <EmployeeTopProduct />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
