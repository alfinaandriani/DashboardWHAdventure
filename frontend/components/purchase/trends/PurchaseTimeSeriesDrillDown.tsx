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

interface MonthlyPurchase {
  month_name: string;
  month: number;
  total_purchase: number;
}

interface WeeklyPurchase {
  week_number: number;
  week_start: string;
  total_purchase: number;
}

export default function PurchaseTimeSeriesDrillDown() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [monthlyData, setMonthlyData] = useState<MonthlyPurchase[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyPurchase[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Load years
  useEffect(() => {
    fetch("http://localhost:3001/api/purchase/years")
      .then(async (res) => {
        if (!res.ok) {
          console.error("Error loading years:", await res.text());
          throw new Error("Failed to load years");
        }
        return res.json();
      })
      .then((data) => {
        setYears(data);
        if (data.length > 0) setSelectedYear(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  // Load monthly purchase chart
  useEffect(() => {
    if (selectedYear) {
      fetch(`http://localhost:3001/api/purchase/monthly?year=${selectedYear}`)
        .then(async (res) => {
          if (!res.ok) {
            console.error("Error monthly:", await res.text());
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setMonthlyData(
              data.map((x: any) => ({
                ...x,
                total_purchase: Number(x.total_purchase),
              }))
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [selectedYear]);

  // Handle drilldown
  const handleBarClick = (data: any) => {
    if (data.month == null) return;

    setSelectedMonth(data.month);
    setView("weekly");

    fetch(
      `http://localhost:3001/api/purchase/weekly?year=${selectedYear}&month=${data.month}`
    )
      .then((res) => res.json())
      .then((d) =>
        setWeeklyData(
          d.map((x: any) => ({
            ...x,
            total_purchase: Number(x.total_purchase),
          }))
        )
      );
  };

  const handleBack = () => {
    setView("monthly");
    setSelectedMonth(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h3 className="font-semibold text-lg">
          {view === "monthly"
            ? `Total Pembelian per Bulan (${selectedYear})`
            : `Total Pembelian per Minggu – ${selectedMonth}/${selectedYear}`}
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
          <XAxis
            dataKey={view === "monthly" ? "month_name" : "week_number"}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) =>
              `Rp ${Number(value).toLocaleString("id-ID")}`
            }
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
                      Total Pembelian:{" "}
                      <span className="font-semibold">
                        Rp{" "}
                        {Number(
                          view === "monthly"
                            ? p.total_purchase
                            : p.total_purchase
                        ).toLocaleString("id-ID")}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar
            dataKey="total_purchase"
            fill="#3b82f6"
            onClick={(data) => {
              if (view === "monthly") handleBarClick(data);
            }}
          >
            {view === "monthly" &&
              monthlyData.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  cursor="pointer"
                  fill={entry.month === selectedMonth ? "#1d4ed8" : "#3b82f6"}
                />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
