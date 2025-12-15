"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface RevenueData {
  month: string;
  total_revenue: number;
}

export default function RevenuePerMonth() {
  const [data, setData] = useState<RevenueData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/revenue")
      .then((res) => res.json())
      .then((rows) => {
        setData(
          rows.map((d: any) => ({
            month: d.month,
            total_revenue: Number(d.total_revenue),
          }))
        );
      });
  }, []);

  // Cari bulan revenue tertinggi
  const maxRevenue = Math.max(...data.map((d) => d.total_revenue), 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Revenue Per Bulan</h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={(value) => `USD ${value.toLocaleString()}`}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.month}</p>
                    <p>
                      Revenue:{" "}
                      <span className="font-semibold">
                        USD {p.total_revenue.toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="total_revenue"
            name="Revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />

          {/* Tambahkan marker khusus untuk bulan dengan revenue tertinggi */}
          <Line
            type="monotone"
            dataKey={(d: RevenueData) =>
              d.total_revenue === maxRevenue ? d.total_revenue : null
            }
            stroke="#ef4444"
            strokeWidth={0}
            dot={{ r: 8, fill: "#ef4444" }}
            name="Highest Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
