"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

interface RejectionRateProduct {
  product_name: string;
  rejection_rate: number;
  [key: string]: string | number;
}

const COLORS = [
  "#f97316",
  "#fb923c",
  "#fdba74",
  "#fed7aa",
  "#ea580c",
  "#c2410c",
];

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

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Rejection Rate per Produk (%)
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="rejection_rate"
            nameKey="product_name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent = 0 }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number) => `${value.toFixed(2)} %`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
