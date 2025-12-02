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
  CartesianGrid,
} from "recharts";

interface CustomerTrend {
  period: string;
  new_customer: number;
  loyal_customer: number;
}

export default function CustomerTrend() {
  const [data, setData] = useState<CustomerTrend[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/customer-trend")
      .then((res) => res.json())
      .then((rows) => {
        setData(
          rows.map((d: any) => ({
            period: d.period,
            new_customer: Number(d.new_customer),
            loyal_customer: Number(d.loyal_customer),
          }))
        );
      })
      .catch((err) => console.error("Error fetch trend:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Tren Pelanggan Baru vs Pelanggan Loyal
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="period" />
          <YAxis />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">Periode: {p.period}</p>

                    <p>
                      Pelanggan Baru:{" "}
                      <span className="font-semibold">
                        {Number(p.new_customer || 0).toLocaleString()}
                      </span>
                    </p>

                    <p>
                      Pelanggan Loyal:{" "}
                      <span className="font-semibold">
                        {Number(p.loyal_customer || 0).toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="new_customer"
            stroke="#3b82f6"
            name="Pelanggan Baru"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="loyal_customer"
            stroke="#10b981"
            name="Pelanggan Loyal"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
