"use client";

import { useEffect, useState } from "react";

interface KPI {
  total_purchasing_amount: number;
  total_quantity_purchased: number;
  avg_purchase_value: number;
}

export default function KPIPurchase() {
  const [kpi, setKpi] = useState<KPI | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/performance/kpi")
      .then((res) => res.json())
      .then((data) =>
        setKpi({
          total_purchasing_amount: Number(data.total_purchasing_amount),
          total_quantity_purchased: Number(data.total_quantity_purchased),
          avg_purchase_value: Number(data.avg_purchase_value),
        })
      );
  }, []);

  if (!kpi) {
    // Skeleton loading
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-300 animate-pulse p-4 rounded-xl h-21"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Total Purchase</h3>
        <p className="text-2xl font-bold">
          USD {kpi.total_purchasing_amount.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Total Qty</h3>
        <p className="text-2xl font-bold">
          {kpi.total_quantity_purchased.toLocaleString()} Units
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Avg Purchase Value</h3>
        <p className="text-2xl font-bold">
          USD {kpi.avg_purchase_value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
