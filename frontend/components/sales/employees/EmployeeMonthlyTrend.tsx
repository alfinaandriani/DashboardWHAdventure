"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendData {
  employee_id: number;
  full_name: string;
  period: string;
  total_sales: number;
}

export default function EmployeeMonthlyTrend() {
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/employee/monthly-trend")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            employee_id: d.employee_id,
            full_name: d.full_name,
            period: d.period,
            total_sales: Number(d.total_sales),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Tren Kinerja Employee per Bulan</h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="period" />
          <YAxis />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.full_name}</p>
                    <p>Bulan: {p.period}</p>
                    <p>
                      Total Sales:{" "}
                      <span className="font-semibold">
                        USD {p.total_sales.toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          {/* Render 1 line per employee */}
          {[...new Set(data.map((d) => d.full_name))].map((name, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="total_sales"
              data={data.filter((d) => d.full_name === name)}
              name={name}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
