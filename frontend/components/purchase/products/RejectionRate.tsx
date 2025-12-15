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

interface RejectionRateProduct {
  product_name: string;
  rejection_rate: number;
}

export default function RejectionRateProducts() {
  const [data, setData] = useState<RejectionRateProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/procurement/rejection-rate")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            rejection_rate: Number(d.rejection_rate),
          }))
        )
      );
  }, []);

  // Hitung batas XAxis
  const maxRate = Math.max(...data.map((d) => d.rejection_rate), 1);
  const adjustedMax = Math.ceil(maxRate / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Rejection Rate per Produk (%)
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            domain={[0, adjustedMax]}
            tickFormatter={(v) => `${v.toFixed(1)} %`}
          />

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
                    <p className="font-semibold text-orange-600 mt-1">
                      Rejection Rate: {p.rejection_rate.toFixed(2)} %
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="rejection_rate" name="Rejection Rate (%)">
            {data.map((_, index) => (
              <Cell key={index} fill="#f97316" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
