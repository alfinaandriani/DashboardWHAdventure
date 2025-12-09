"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TopSupplierVolume {
  supplier_name: string;
  total_qty: number;
  total_spent: number;
}

export default function TopSupplierVolume() {
  const [data, setData] = useState<TopSupplierVolume[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/performance/top-supplier")
      .then((res) => res.json())
      .then((items) => {
        if (!Array.isArray(items)) return;

        setData(
          items.map((d: any) => ({
            supplier_name: d.supplier_name,
            total_qty: Number(d.total_qty),
            total_spent: Number(d.total_spent),
          }))
        );
      });
  }, []);

  const maxQty = Math.max(...data.map((d) => d.total_qty), 1);
  const adjustedMax = Math.ceil(maxQty / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Top Supplier Berdasarkan Volume Pembelian
      </h3>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, adjustedMax]} />

          <YAxis
            type="category"
            dataKey="supplier_name"
            width={180}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.supplier_name}</p>
                    <p>Total Qty: {p.total_qty.toLocaleString()} unit</p>
                    <p>
                      Total Spent: USD {p.total_spent.toLocaleString("id-ID")}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="total_qty" name="Total Qty" fill="#ec4899" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
