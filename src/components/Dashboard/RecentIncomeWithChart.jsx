import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Expanded colors palette — vibrant & diverse
const COLORS = [
  "#2563EB", // blue
  "#DC2626", // red
  "#16A34A", // green
  "#F59E0B", // amber
  "#8B5CF6", // violet
  "#EF4444", // bright red
  "#3B82F6", // sky blue
  "#22C55E", // lime green
  "#D946EF", // pinkish purple
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data) return;

    // Group by source and sum amounts to avoid duplicates
    const groupedData = data.reduce((acc, item) => {
      const existing = acc.find((d) => d.name === item.source);
      if (existing) {
        existing.amount += item.amount;
      } else {
        acc.push({ name: item.source, amount: item.amount });
      }
      return acc;
    }, []);

    setChartData(groupedData);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        showTextAnchor
        colors={COLORS}
      />

      {/* Total income display */}
      <div className="mt-4 text-center text-lg font-semibold text-gray-900">
        Total Income: ₹{totalIncome?.toLocaleString() || '0'}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm font-medium text-gray-800">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;