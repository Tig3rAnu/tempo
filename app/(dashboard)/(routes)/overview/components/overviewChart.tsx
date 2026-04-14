"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "2023",
    total: 1000,
  },
  {
    name: "2022",
    total: 750,
  },
  {
    name: "2021",
    total: 500,
  },
  {
    name: "2020",
    total: 250,
  },
  {
    name: "2019",
    total: 15,
  },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#1361D2"
          fontSize={14}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#000" }}
        />
        <YAxis
          stroke="#1361D2"
          fontSize={14}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#000" }}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#1361D2" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
