"use client";

import { useState, useEffect, useRef } from "react";

export default function NotificationTypeFilter({ onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("All Notification Types");

  const dropdownRef = useRef(null);

  const filterOptions = [
    "One-Time Notifications",
    "Automated Notifications",
    "Recurring Notifications",
    "Multiple Notifications",
    "API Notifications",
  ];

  const toggleOption = (option) => {
    let updated;
    if (selectedOptions.includes(option)) {
      updated = selectedOptions.filter((o) => o !== option);
    } else {
      updated = [...selectedOptions, option];
    }

    setSelectedOptions(updated);

    // Update label
    if (updated.length === 0) {
      setSelectedLabel("All Notification Types");
    } else if (updated.length === 1) {
      setSelectedLabel(updated[0]);
    } else {
      setSelectedLabel(`${updated.length} selected`);
    }

    if (onChange) onChange(updated);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex flex-wrap items-center gap-3" ref={dropdownRef}>
      <span className="text-sm font-bold text-gray-700">Results for</span>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-between gap-2 text-sm font-medium bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm hover:bg-gray-50"
        >
          {selectedLabel}
          <svg
            className="w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-md p-2">
            {filterOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="form-checkbox"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
