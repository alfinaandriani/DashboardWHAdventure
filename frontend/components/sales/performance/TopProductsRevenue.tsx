// components/sales/performance/TopProductsRevenue.tsx
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

interface ProductData {
  product_name: string;
  category: string;
  subcategory: string;
  total_revenue: number;
}

export default function TopProducts() {
  const [data, setData] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/top-products")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            category: d.category,
            subcategory: d.subcategory,
            total_revenue: Number(d.total_revenue),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Top 10 Produk Berdasarkan Revenue</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            tickFormatter={(v) => `USD ${v.toLocaleString()}`}
            domain={[0, 5000000]}
          />
          <YAxis
            dataKey="product_name"
            type="category"
            width={150}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.product_name}</p>
                    <p>Kategori: {p.category}</p>
                    <p>Sub Kategori: {p.subcategory}</p>
                    <p className="font-semibold mt-1">
                      Revenue: USD {Number(p.total_revenue).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />

          <Bar dataKey="total_revenue" name="Revenue" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
