// app/purchase/products/page.tsx
import MostRejectedProducts from "@/components/purchase/products/MostRejectedProducts";
import ReceivedVsRejectedChart from "@/components/purchase/products/ReceivedVsRejected";
import RejectedCostChart from "@/components/purchase/products/RejectedCost";
import RejectionRateChart from "@/components/purchase/products/RejectionRate";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Procurement Product</h1>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <MostRejectedProducts />
      <ReceivedVsRejectedChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RejectionRateChart />
        <RejectedCostChart />
      </div>
    </div>
  );
}
