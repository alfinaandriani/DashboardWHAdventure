// app/sales/customer/page.tsx
import TopCustomers from "@/components/sales/customers/TopCustomers";
import CustomerTypeTransaction from "@/components/sales/customers/CustomerTypeTransactions";
import CustomerTypeRevenue from "@/components/sales/customers/CustomerTypeRevenue";
import CustomerTrend from "@/components/sales/customers/CustomerTrend";

export default function CustomerAnalysisPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Customer Analysis
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCustomers />
        <CustomerTrend />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CustomerTypeTransaction />
        <CustomerTypeRevenue />
      </div>
    </div>
  );
}
