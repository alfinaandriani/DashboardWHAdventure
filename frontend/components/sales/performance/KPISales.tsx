"use client";

import { useEffect, useState } from "react";

interface KPI {
  total_revenue: number;
  total_profit: number;
  avg_order_value: number;
}

export default function KPISales() {
  const [kpi, setKpi] = useState<KPI | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/kpi")
      .then((res) => res.json())
      .then((data) =>
        setKpi({
          total_revenue: Number(data.total_revenue),
          total_profit: Number(data.total_profit),
          avg_order_value: Number(data.avg_order_value),
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
        <h3 className="text-sm font-medium">Total Revenue</h3>
        <p className="text-2xl font-bold">
          Rp {kpi.total_revenue.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Total Profit</h3>
        <p className="text-2xl font-bold">
          Rp {kpi.total_profit.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Avg Order Value</h3>
        <p className="text-2xl font-bold">
          Rp {kpi.avg_order_value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
