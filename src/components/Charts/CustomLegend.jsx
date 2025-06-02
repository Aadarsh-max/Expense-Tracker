import React from "react";

const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null; // handle empty payload gracefully

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-black font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
