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

interface EmployeePerformance {
  full_name: string;
  total_sales: number;
}

export default function EmployeePerformance() {
  const [data, setData] = useState<EmployeePerformance[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/employee/employee-performance")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            full_name: d.full_name,
            total_sales: Number(d.total_sales),
          }))
        );
      });
  }, []);

  const maxQty = Math.max(...data.map((d) => d.total_sales), 1);
  const adjustedMax = Math.ceil(maxQty / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Kinerja Karyawan</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            tickFormatter={(v) => `USD ${v.toLocaleString()}`}
          />
          <YAxis
            type="category"
            dataKey="full_name"
            width={200}
            interval={0}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.full_name}</p>
                    <p>
                      Total Penjualan:{" "}
                      <span className="font-semibold">
                        USD {Number(p.total_sales).toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="total_sales" name="Total Penjualan" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
