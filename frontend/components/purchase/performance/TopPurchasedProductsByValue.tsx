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

interface TopPurchasedProductsByValue {
  product_name: string;
  category: string;
  subcategory: string;
  total_purchased: number;
}

export default function TopPurchasedProductsByValue() {
  const [data, setData] = useState<TopPurchasedProductsByValue[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:3001/api/purchase/performance/top-product-purchase-value"
    )
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            category: d.category,
            subcategory: d.subcategory,
            total_purchased: Number(d.total_purchased),
          }))
        );
      });
  }, []);

  // Hitung max value untuk XAxis
  const maxValue = Math.max(...data.map((d) => d.total_purchased), 1);
  const adjustedMax = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Top 10 Produk dengan Nilai Pembelian Terbesar
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
            dataKey="product_name"
            width={180}
            interval={0}
          />

          <Tooltip
            formatter={(value: number) =>
              `USD ${value.toLocaleString()}`
            }
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.product_name}</p>
                    <p>Kategori: {p.category || "-"}</p>
                    <p>Sub Kategori: {p.subcategory || "-"}</p>
                    <p className="font-semibold mt-1">
                      Total Value: USD{" "}
                      {p.total_purchased.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />
          <Bar
            dataKey="total_purchased"
            name="Purchase Value"
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
