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
  CartesianGrid,
} from "recharts";

interface CustomerData {
  customer_name: string;
  total_revenue: number;
  total_orders: number;
}

export default function TopCustomers() {
  const [data, setData] = useState<CustomerData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/top-customers")
      .then((res) => res.json())
      .then((rows) => {
        setData(
          rows.map((d: any) => ({
            customer_name: d.customer_name,
            total_revenue: Number(d.total_revenue),
            total_orders: Number(d.total_orders),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Top 10 Customer dengan Pembelian Terbanyak
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            tickFormatter={(v) => `Rp ${v.toLocaleString()}`}
          />

          <YAxis
            type="category"
            dataKey="customer_name"
            width={180}
            interval={0}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.customer_name}</p>
                    <p>
                      Total Orders:{" "}
                      <span className="font-semibold">{p.total_orders}</span>
                    </p>
                    <p>
                      Total Revenue:{" "}
                      <span className="font-semibold">
                        Rp {p.total_revenue.toLocaleString()}
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
            dataKey="total_revenue"
            name="Revenue"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
