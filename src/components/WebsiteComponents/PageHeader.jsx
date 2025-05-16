"use client";

import React from "react";

export default function PageHeader({ title, className = "mb-8" }) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={className}>
      <h1 className="text-md font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{formattedDate}</p>
    </div>
  );
}
