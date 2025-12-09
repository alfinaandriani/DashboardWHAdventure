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

interface DiscountImpact {
  discount_group: string;
  order_count: number;
  total_revenue: number;
  avg_revenue_per_order: number;
}

export default function DiscountImpact() {
  const [data, setData] = useState<DiscountImpact[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/discount-impact")
      .then((res) => res.json())
      .then((result: DiscountImpact[]) =>
        setData(
          result.map((d) => ({
            ...d,
            total_revenue: Number(d.total_revenue),
            avg_revenue_per_order: Number(d.avg_revenue_per_order),
            order_count: Number(d.order_count),
          }))
        )
      )
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Penjualan Berdasarkan Diskon</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
        >
          <XAxis dataKey="discount_group" interval={0} />

          <YAxis
            tickFormatter={(value) =>
              `USD ${Number(value).toLocaleString("en-EN")}`
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
                    <p className="font-semibold">{p.discount_group}</p>
                    <p>Order Count: {p.order_count || "-"}</p>
                    <p>
                      Avg Revenue per Order:{" "}
                      {`USD ${p.avg_revenue_per_order.toLocaleString(
                        "en-EN"
                      )}` || "-"}
                    </p>
                    <p className="font-semibold mt-1">
                      Total Revenue:{" "}
                      {`USD ${p.total_revenue.toLocaleString("en-EN")}`}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="total_revenue" fill="#6366f1" name="Total Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
