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

interface TopPurchasedProducts {
  product_name: string;
  category: string;
  subcategory: string;
  total_qty: number;
}

export default function TopPurchasedProducts() {
  const [data, setData] = useState<TopPurchasedProducts[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/performance/top-product-purchase")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            category: d.category,
            subcategory: d.subcategory,
            total_qty: Number(d.total_qty),
          }))
        );
      });
  }, []);

  // Hitung max qty untuk menentukan batas XAxis
  const maxQty = Math.max(...data.map((d) => d.total_qty), 1);
  const adjustedMax = Math.ceil(maxQty / 10) * 10; // pembulatan agar rapi

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Top 10 Produk Dibeli</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, adjustedMax]} />

          <YAxis
            type="category"
            dataKey="product_name"
            width={180}
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
                    <p>Sub Kategori: {p.subcategory || "-"}</p>
                    <p className="font-semibold mt-1">
                      Quantity: {p.total_qty.toLocaleString()} unit
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />

          <Bar dataKey="total_qty" name="Quantity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
