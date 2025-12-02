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

interface CustomerTypeTransaction {
  person_type: string;
  total_transactions: number;
}

export default function CustomerTypeTransaction() {
  const [data, setData] = useState<CustomerTypeTransaction[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:3001/api/sales/performance/customer-type-transactions"
    )
      .then((res) => res.json())
      .then((rows) => {
        setData(
          rows.map((d: any) => ({
            person_type: d.person_type,
            total_transactions: Number(d.total_transactions),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Transaksi Berdasarkan Jenis Pelanggan
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

          <YAxis type="number" tick={{ fontSize: 12 }} />

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
                      Total Transaksi:{" "}
                      <span className="font-semibold">
                        {p.total_transactions.toLocaleString()}
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
            dataKey="total_transactions"
            name="Total Transaksi"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
