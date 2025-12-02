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

interface BestMonth {
  month: number;
  month_name: string;
  total_sales: number;
}

export default function BestMonth() {
  const [data, setData] = useState<BestMonth[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/trends/best-month")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            month: d.month,
            month_name: d.month_name,
            total_sales: Number(d.total_sales),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Bulan Penjualan Tertinggi</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="month_name" tick={{ fontSize: 12 }} interval={0} />

          <YAxis
            tickFormatter={(value) =>
              `Rp ${Number(value).toLocaleString("id-ID")}`
            }
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.month_name}</p>
                    <p>
                      Total Penjualan:{" "}
                      <span className="font-semibold">
                        Rp {p.total_sales.toLocaleString("id-ID")}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />
          <Bar
            dataKey="total_sales"
            fill="#10b981"
            name="Total Penjualan"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
