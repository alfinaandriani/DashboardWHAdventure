// components/sales/TimeSeriesDrillDown.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MonthlyData {
  month_name: string;
  month: number;
  revenue: number;
}

interface WeeklyData {
  week_number: number;
  week_start: string;
  revenue: number;
}

export default function TimeSeriesDrillDown() {
  // State
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Load years on mount
  useEffect(() => {
    fetch("http://localhost:3001/api/sales/years")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("API Error (HTML?):", text.substring(0, 200));
          throw new Error("Failed to load years");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Years from API:", data);
        setYears(data);
        if (data.length > 0) setSelectedYear(data[0]);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []); // 🔒 Dependency: kosong → hanya jalan sekali

  // ✅ EFFECT 2: Load monthly data saat tahun berubah
  useEffect(() => {
    if (selectedYear !== null) {
      fetch(`http://localhost:3001/api/sales/monthly?year=${selectedYear}`)
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            console.error("Monthly API Error:", text.substring(0, 200));
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setMonthlyData(
              data.map((x: any) => ({
                ...x,
                revenue: Number(x.revenue),
              }))
            );
          }
        })
        .catch((err) => console.error("Monthly fetch error:", err));
    }
  }, [selectedYear]);

  // Handle bar click (drill-down)
  const handleBarClick = (data: any) => {
    // Pastikan data punya properti yang dibutuhkan
    if (data.month != null && data.revenue != null) {
      setSelectedMonth(data.month);
      setView("weekly");

      fetch(
        `http://localhost:3001/api/sales/weekly?year=${selectedYear}&month=${data.month}`
      )
        .then((res) => res.json())
        .then((d) =>
          setWeeklyData(
            d.map((x: any) => ({ ...x, revenue: Number(x.revenue) }))
          )
        );
    }
  };

  // Back to monthly
  const handleBack = () => {
    setView("monthly");
    setSelectedMonth(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h3 className="font-semibold text-lg">
          {view === "monthly"
            ? `Penjualan per Bulan (${selectedYear})`
            : `Penjualan per Minggu – ${selectedMonth}/${selectedYear}`}
        </h3>

        <div className="flex items-center gap-3">
          {view === "weekly" && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-300 text-sm"
            >
              ← Kembali
            </button>
          )}

          <label className="text-sm font-medium text-gray-700">Tahun:</label>
          <select
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={view === "monthly" ? monthlyData : weeklyData}>
          <XAxis dataKey={view === "monthly" ? "month_name" : "week_number"} />
          <YAxis
            tickFormatter={(value) => `Rp ${value.toLocaleString()}`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const p = payload[0].payload;

                return (
                  <div className="bg-white p-3 rounded shadow border text-sm">
                    <p className="font-semibold">
                      {view === "monthly"
                        ? p.month_name
                        : `Minggu ${p.week_number}`}
                    </p>
                    <p>
                      Total Penjualan:{" "}
                      <span className="font-semibold">
                        Rp {Number(p.revenue).toLocaleString("id-ID")}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar
            dataKey="revenue"
            fill="#10b981"
            onClick={(data, index, event) => {
              if (view === "monthly") {
                handleBarClick(data);
              }
            }}
          >
            {view === "monthly" &&
              monthlyData.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  cursor="pointer"
                  fill={entry.month === selectedMonth ? "#059669" : "#10b981"}
                />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
