// app/sales/performance/page.tsx
import KPISales from "@/components/sales/performance/KPISales";
import TopProductsRevenue from "@/components/sales/performance/TopProductsRevenue";
import TopProductsQty from "@/components/sales/performance/TopProductsQty";
import DiscountImpact from "@/components/sales/performance/DiscountImpact";
import RevenuePerMonth from "@/components/sales/performance/Revenue";

export default function SalesPerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Sales Performance
      </h1>

      <KPISales />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsRevenue />
        <TopProductsQty />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DiscountImpact />
        <RevenuePerMonth />
      </div>
    </div>
  );
}
