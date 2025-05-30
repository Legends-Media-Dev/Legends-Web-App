"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import Sidebar from "@/components/Sidebar";

export default function NotificationsPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Body:", body);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] text-gray-800">
      {/* Sidebar */}
      <Sidebar onCollapseChange={setSidebarCollapsed} />

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="ml-8">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-gray-500">14th Apr 2025</p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative pr-20">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src="/images/jessica.png"
                className="w-10 h-10 rounded-full object-cover"
                alt="User"
              />
              <span className="text-xl font-bold">Jessica Guzman</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-50">
                <button
                  onClick={async () => {
                    await auth.signOut();
                    router.push("/");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notification Form */}
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-[878px]">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <p className="text-sm text-gray-500">Notifications.</p>
        </div>
      </main>
    </div>
  );
}
