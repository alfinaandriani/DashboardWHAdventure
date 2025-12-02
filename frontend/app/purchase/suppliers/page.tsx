// app/purchase/suppliers/page.tsx
import TopSupplierVolume from "@/components/purchase/suppliers/TopSupplier";

export default function PurchasePerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Supplier</h1>

      <TopSupplierVolume />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"></div>
    </div>
  );
}
