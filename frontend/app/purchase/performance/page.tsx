// app/purchase/performance/page.tsx
import KPI from "@/components/purchase/performance/KPI";
import TopPurchasedProducts from "@/components/purchase/performance/TopProductDibeli";
import TopPurchasedProductsByValue from "@/components/purchase/performance/TopPurchasedProductsByValue";

export default function PurchasePerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Purchase Performance
      </h1>

      <KPI />

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <TopPurchasedProducts />
        <TopPurchasedProductsByValue />
      </div>

    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
