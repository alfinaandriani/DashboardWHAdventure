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

interface TopSupplierByValue {
  supplier_name: string;
  total_spent: number;
  total_qty: number;
}

export default function TopSupplierByValue() {
  const [data, setData] = useState<TopSupplierByValue[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:3001/api/purchase/performance/top-supplier-by-value"
    )
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            supplier_name: d.supplier_name,
            total_spent: Number(d.total_spent),
            total_qty: Number(d.total_qty),
          }))
        );
      });
  }, []);

  const maxValue =
    data.length > 0
      ? Math.max(...data.map((d) => d.total_spent))
      : 0;

  const adjustedMax = Math.ceil(maxValue / 10) * 10 || 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Top Supplier Berdasarkan Nilai Pembelian
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            domain={[0, adjustedMax]}
            tickFormatter={(value) =>
              `USD ${value.toLocaleString()}`
            }
          />

          <YAxis
            type="category"
            dataKey="supplier_name"
            width={200}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.supplier_name}</p>
                    <p>
                      Total Quantity:{" "}
                      {p.total_qty.toLocaleString()} unit
                    </p>
                    <p className="font-semibold mt-1">
                      Total Value: USD{" "}
                      {p.total_spent.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />
          <Bar
            dataKey="total_spent"
            name="Purchase Value"
            fill="#16a34a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
