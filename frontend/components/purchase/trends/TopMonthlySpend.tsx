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

interface TopMonthSpend {
  label: string;
  total_spent: number;
}

export default function TopMonthSpendChart() {
  const [data, setData] = useState<TopMonthSpend[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/trends/top-monthly-spend")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items.map((d: any) => ({
            label: `${d.month_name} ${d.year}`,
            total_spent: Number(d.total_spent), // ⬅️ FIX
          }))
        )
      );
  }, []);

  const maxSpend = Math.max(...data.map((d) => d.total_spent), 1);
  const adjustedMax = Math.ceil(maxSpend / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Top Bulan dengan Purchasing Spend Terbesar
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            domain={[0, adjustedMax]}
            tickFormatter={(v) => `USD ${v.toLocaleString()}`}
          />

          <YAxis
            type="category"
            dataKey="label"
            width={160}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.label}</p>
                    <p className="font-semibold text-green-600 mt-1">
                      Total Spend: USD {p.total_spent.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="total_spent" name="Total Spend">
            {data.map((_, i) => (
              <Cell key={i} fill="#22c55e" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
