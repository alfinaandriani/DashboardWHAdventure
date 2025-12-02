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

interface WeekendWeekdays {
  day_type: string;
  total_sales: number;
}

export default function WeekendWeekdays() {
  const [data, setData] = useState<WeekendWeekdays[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/trends/weekend-weekdays")
      .then((res) => res.json())
      .then((result: WeekendWeekdays[]) =>
        setData(
          result.map((d) => ({
            day_type: d.day_type,
            total_sales: Number(d.total_sales),
          }))
        )
      )
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Penjualan Weekend vs Weekday</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
        >
          <XAxis dataKey="day_type" tick={{ fontSize: 12 }} />

          <YAxis
            tickFormatter={(value) =>
              `Rp ${Number(value).toLocaleString("id-ID")}`
            }
            tick={{ fontSize: 12 }}
            allowDecimals={false}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">{p.day_type}</p>
                    <p>
                      Total Penjualan:{" "}
                      <span className="font-semibold">
                        Rp {Number(p.total_sales).toLocaleString("id-ID")}
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
            fill="#6366f1"
            name="Total Penjualan"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
