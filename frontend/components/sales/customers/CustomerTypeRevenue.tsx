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

interface CustomerTypeRevenue {
  person_type: string;
  total_revenue: number;
}

export default function CustomerTypeRevenue() {
  const [data, setData] = useState<CustomerTypeRevenue[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales/performance/customer-type-revenue")
      .then((res) => res.json())
      .then((rows) => {
        setData(
          rows.map((d: any) => ({
            person_type: d.person_type,
            total_revenue: Number(d.total_revenue),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Revenue Berdasarkan Jenis Pelanggan
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis
            type="category"
            dataKey="person_type"
            width={150}
            interval={0}
          />

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
                    <p className="font-semibold">
                      Jenis Pelanggan: {p.person_type}
                    </p>
                    <p>
                      Total Revenue:{" "}
                      <span className="font-semibold">
                        Rp {Number(p.total_revenue || 0).toLocaleString()}
                      </span>
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
