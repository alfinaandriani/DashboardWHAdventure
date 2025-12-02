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

interface EmployeeTopProduct {
  full_name: string;
  product_name: string;
  total_sold: number;
}

export default function EmployeeTopProduct() {
  const [data, setData] = useState<EmployeeTopProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/employee/top-products")
      .then((res) => res.json())
      .then((items) => {
        setData(
          items.map((d: any) => ({
            full_name: d.full_name,
            product_name: d.product_name,
            total_sold: Number(d.total_sold),
          }))
        );
      });
  }, []);

  const maxQty = Math.max(...data.map((d) => d.total_sold), 1);
  const adjustedMax = Math.ceil(maxQty / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Produk Paling Sering Dijual oleh Tiap Employee
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, adjustedMax]} />

          <YAxis
            type="category"
            dataKey="full_name"
            width={180}
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
                    <p>Produk: {p.product_name}</p>
                    <p>Total Terjual: {p.total_sold}</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="total_sold" name="Total Terjual" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
