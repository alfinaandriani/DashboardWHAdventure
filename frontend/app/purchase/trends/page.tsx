// app/sales/trends/page.tsx
import PurchaseTimeSeriesDrillDown from "@/components/purchase/trends/PurchaseTimeSeriesDrillDown";
import TopMonthlySpend from "@/components/purchase/trends/TopMonthlySpend";
import PurchasingGrowthRateChart from "@/components/purchase/trends/PurchasingGrowthRateChart";

export default function Trends() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trends</h1>
      <PurchaseTimeSeriesDrillDown />
      <TopMonthlySpend />
      <PurchasingGrowthRateChart />
      
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
