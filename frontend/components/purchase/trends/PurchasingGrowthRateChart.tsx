"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GrowthValue {
  label: string;
  growth_value: number;
}

export default function PurchasingGrowthValueChart() {
  const [data, setData] = useState<GrowthValue[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/trends/monthly-growth-value")
      .then((res) => res.json())
      .then((items) =>
        setData(
          items
            .filter((d: any) => d.growth_value !== null)
            .map((d: any) => ({
              label: `${d.month_name} ${d.year}`,
              growth_value: Number(d.growth_value),
            }))
        )
      );
  }, []);

  const maxValue = Math.max(...data.map((d) => Math.abs(d.growth_value)), 1);
  const adjustedMax = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        Purchasing Growth (Value)
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis
            domain={[-adjustedMax, adjustedMax]}
            tickFormatter={(v) => `USD ${v.toLocaleString()}`}
          />

          <Tooltip
            formatter={(v: number) => `USD ${v.toLocaleString()}`}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="growth_value"
            name="Growth Value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
