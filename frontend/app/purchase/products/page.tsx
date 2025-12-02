// app/purchase/products/page.tsx
import MostRejectedProducts from "@/components/purchase/products/MostRejectedProducts";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product</h1>

      <MostRejectedProducts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
