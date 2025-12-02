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
  Cell,
} from "recharts";

interface MostRejectedProduct {
  product_name: string;
  category: string;
  rejected_qty: number;
}

export default function MostRejectedProducts() {
  const [data, setData] = useState<MostRejectedProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/insight/most-rejected")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            category: d.category,
            rejected_qty: Number(d.rejected_qty),
          }))
        )
      );
  }, []);

  // Hitung batas XAxis
  const maxRejected = Math.max(...data.map((d) => d.rejected_qty), 1);
  const adjustedMax = Math.ceil(maxRejected / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Top Produk dengan Rejected Tertinggi
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, adjustedMax]} />

          <YAxis
            type="category"
            dataKey="product_name"
            width={200}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.product_name}</p>
                    <p>Kategori: {p.category || "-"}</p>
                    <p className="font-semibold mt-1 text-red-600">
                      Rejected: {p.rejected_qty.toLocaleString()} unit
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="rejected_qty" name="Rejected Qty">
            {data.map((entry, index) => (
              <Cell key={index} fill="#ef4444" /> // merah untuk highlight masalah
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
