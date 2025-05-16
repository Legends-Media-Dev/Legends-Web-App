"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiDownload } from "react-icons/fi";

export default function NotificationToolbar({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-4">
      {/* Left side (optional children) */}
      <div>{children}</div>

      {/* Right side: Download + Search */}
      <div className="flex items-center gap-3" ref={searchRef}>
        {/* Download Button with Tooltip */}
        <div className="relative group">
          <button
            className="flex items-center justify-center border border-gray-300 text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-all"
            onClick={() => {
              console.log("Download clicked");
            }}
            aria-label="Download"
          >
            <FiDownload size={16} />
          </button>
          {/* Tooltip */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10">
            Export as CSV
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-64 bg-white">
          <FiSearch size={16} className="text-gray-400" />
          <input
            type="text"
            className="w-full text-sm outline-none text-gray-800 placeholder-gray-400"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
