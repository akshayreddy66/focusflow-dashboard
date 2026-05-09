import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Analytics({
  completed,
  pending,
  percentage,
}) {
  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="box">
      <h2>
        Productivity Analytics
      </h2>

      <h1>{percentage}%</h1>

      <p>
        Completed:
        {" "}
        {completed}
      </p>

      <p>
        Pending:
        {" "}
        {pending}
      </p>

      <PieChart
        width={320}
        height={300}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </div>
  );
}

export default Analytics;