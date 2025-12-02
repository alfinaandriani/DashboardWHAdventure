// app/sales/product/page.tsx
import MostSold from "@/components/sales/products/MostSold";
import LeastSold from "@/components/sales/products/LeastSold";
import DiscountedProducts from "@/components/sales/products/DiscountedProducts";

export default function SalesPerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Sales</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MostSold />
        <LeastSold />
      </div>
      <DiscountedProducts />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
