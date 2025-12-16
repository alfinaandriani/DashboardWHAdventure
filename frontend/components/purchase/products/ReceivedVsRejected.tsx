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

  // Batas YAxis
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.received_qty, d.rejected_qty]),
    1
  );
  const adjustedMax = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Perbandingan Received vs Rejected Produk
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barGap={6}>
          <XAxis
            dataKey="product_name"
            interval={0}
            angle={-30}
            textAnchor="end"
            height={80}
          />

          <YAxis
            domain={[0, adjustedMax]}
            tickFormatter={(v) => v.toLocaleString()}
          />

          <Tooltip
            formatter={(value: number) =>
              `${value.toLocaleString()} unit`
            }
          />

          <Legend />

          {/* Received */}
          <Bar
            dataKey="received_qty"
            name="Received"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          {/* Rejected */}
          <Bar
            dataKey="rejected_qty"
            name="Rejected"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
