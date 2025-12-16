// app/purchase/suppliers/page.tsx
import TopSupplierVolume from "@/components/purchase/suppliers/TopSupplier";
import TopSupplierByValue from "@/components/purchase/suppliers/TopSupplierByValue";

export default function PurchasePerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Supplier Insight</h1>
      <div className="pb-6">
      <TopSupplierVolume />
      </div>
      <TopSupplierByValue />

    </div>
  );
}
