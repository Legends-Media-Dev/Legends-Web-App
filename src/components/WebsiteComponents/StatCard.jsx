"use client";

import React from "react";

export default function StatCard({ title, value, trend, trendType, chart, progress }) {
  const trendColor =
    trendType === "up"
      ? "text-green-600"
      : trendType === "down"
      ? "text-gray-600"
      : "text-gray-500";

  const trendArrow = trendType === "up" ? "↑" : trendType === "down" ? "↓" : "";

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progress !== undefined
    ? circumference - (progress / 100) * circumference
    : circumference;

  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm w-full min-h-[88px]">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Optional Circular Progress */}
        {progress !== undefined && (
          <svg width="48" height="48" className="flex-shrink-0">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#e5e7eb" // gray-200
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#4f46e5" // indigo-600 or custom color
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </svg>
        )}

        {/* Stat Text */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-500 font-medium tracking-tight">
            {title}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-gray-900">{value}</span>
            {trend !== undefined && (
              <span className={`text-xs flex items-center gap-0.5 ${trendColor}`}>
                <span className="text-[12px]">{trendArrow}</span>
                {trend}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right chart */}
      {chart && (
        <div className="w-24 h-10 flex items-end justify-end">
          {chart}
        </div>
      )}
    </div>
  );
}
