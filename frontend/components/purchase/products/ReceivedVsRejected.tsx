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

interface ReceivedRejected {
  product_name: string;
  received_qty: number;
  rejected_qty: number;
}

export default function ReceivedVsRejectedChart() {
  const [data, setData] = useState<ReceivedRejected[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/procurement/received-vs-rejected")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items.map((d: any) => ({
            product_name: d.product_name,
            received_qty: Number(d.received_qty),
            rejected_qty: Number(d.rejected_qty),
          }))
        )
      );
  }, []);

  // Hitung batas XAxis
  const maxValue = Math.max(
    ...data.map((d) => d.received_qty + d.rejected_qty),
    1
  );
  const adjustedMax = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Perbandingan Received vs Rejected Produk
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, adjustedMax]} />

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
                    <p className="text-green-600">
                      Received: {p.received_qty.toLocaleString()} unit
                    </p>
                    <p className="text-red-600">
                      Rejected: {p.rejected_qty.toLocaleString()} unit
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Bar dataKey="received_qty" name="Received" stackId="a">
            {data.map((_, index) => (
              <Cell key={index} fill="#22c55e" />
            ))}
          </Bar>

          <Bar dataKey="rejected_qty" name="Rejected" stackId="a">
            {data.map((_, index) => (
              <Cell key={index} fill="#ef4444" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
