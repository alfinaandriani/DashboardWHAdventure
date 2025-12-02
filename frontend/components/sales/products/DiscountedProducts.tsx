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

interface TopDiscountedProducts {
  product_name: string;
  discount_count: number;
  total_discount_amount: number;
}

export default function TopDiscountedProducts() {
  const [data, setData] = useState<TopDiscountedProducts[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/product/top-discounted-products")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            discount_count: d.discount_count,
            total_discount_amount: d.total_discount_amount,
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Produk Paling Sering Diskon</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            tickFormatter={(v) => v.toLocaleString()}
            allowDecimals={false}
          />

          {/* YAxis = product names */}
          <YAxis
            type="category"
            dataKey="product_name"
            width={140}
            interval={0}
            // tick={{ fontSize: 12 }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload as TopDiscountedProducts;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.product_name}</p>

                    <p>
                      Jumlah Diskon Diberikan:{" "}
                      <span className="font-semibold">
                        {p.discount_count.toLocaleString()}
                      </span>
                    </p>

                    <p>
                      Total Nominal Diskon:{" "}
                      <span className="font-semibold">
                        Rp {p.total_discount_amount.toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Ubah barSize jika ingin batang lebih tebal */}
          <Bar
            dataKey="discount_count"
            name="Jumlah Diskon"
            fill="#3b82f6"
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
