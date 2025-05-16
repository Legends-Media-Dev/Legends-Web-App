"use client";

import { useState } from "react";
import { TbArrowsSort } from "react-icons/tb"; 
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

const headers = [
  { label: "CAMPAIGN NAME", key: "campaign" },
  { label: "STATUS", key: "status" },
  { label: "SENT", key: "sent" },
  { label: "ACTIONS", key: "actions" }, // not sortable
  { label: "DATE SENT/SCHEDULED", key: "date" },
];

const sampleData = [
  {
    campaign: "Welcome Offer",
    status: "Sent",
    sent: "2,348",
    date: "2024-10-03",
  },
  {
    campaign: "VIP Drop",
    status: "Scheduled",
    sent: "-",
    date: "2024-10-09",
  },
];

export default function NotificationTable() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    if (key === "actions") return; // skip sorting on actions column
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortConfig.key || sortConfig.key === "actions") return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    return sortConfig.direction === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Header Row */}
      <div className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm grid grid-cols-5 gap-4 text-xs font-semibold text-gray-600 uppercase">
        {headers.map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center gap-1 cursor-pointer select-none hover:text-gray-800 transition"
            onClick={() => handleSort(key)}
          >
            {label}
            {key !== "actions" && (
              sortConfig.key === key ? (
                sortConfig.direction === "asc" ? (
                  <FiChevronUp size={14} className="text-gray-800" />
                ) : (
                  <FiChevronDown size={14} className="text-gray-800" />
                )
              ) : (
                <TbArrowsSort size={14} className="text-gray-400" />
              )
            )}
          </div>
        ))}
      </div>

      {/* Data Rows */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm divide-y divide-gray-100">
        {sortedData.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition"
          >
            <div>{row.campaign}</div>
            <div>
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-[6px] text-xs font-medium rounded-md ${
                        row.status === "Sent"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    >
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${
                        row.status === "Sent" ? "bg-green-600" : "bg-yellow-600"
                        }`}
                    />
                    {row.status}
                </span>
            </div>
            <div>{row.sent}</div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => console.log("Action clicked")}
                className="p-1 text-gray-500 hover:text-gray-800 transition"
              >
                <HiOutlineDotsVertical size={18} />
              </button>
            </div>
            <div>{row.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
