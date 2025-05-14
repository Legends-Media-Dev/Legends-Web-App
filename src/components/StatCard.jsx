"use client";

import React from "react";

export default function StatCard({ icon, title, value, description }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition w-full min-h-[140px] flex flex-col items-center text-center">
      <div className="flex items-center space-x-2 text-gray-500 text-base font-semibold mb-1">
        {icon}
        <span>{title}</span>
      </div>
      <h2 className="text-4xl font-extrabold text-gray-900">{value}</h2>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}