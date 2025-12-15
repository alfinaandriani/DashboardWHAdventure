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

interface RejectedCost {
  product_name: string;
  rejected_cost: number;
}

export default function RejectedCostChart() {
  const [data, setData] = useState<RejectedCost[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/procurement/rejected-cost")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            rejected_cost: Number(d.rejected_cost),
          }))
        )
      );
  }, []);

  const maxCost = Math.max(...data.map((d) => d.rejected_cost), 1);
  const adjustedMax = Math.ceil(maxCost / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Cost Impact Produk Rejected
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
                    <p className="font-semibold text-blue-600 mt-1">
                      Cost Rejected: USD{" "}
                      {p.rejected_cost.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="rejected_cost" name="Rejected Cost">
            {data.map((_, index) => (
              <Cell key={index} fill="#3b82f6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
