"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] text-gray-800">
      {/* Sidebar */}
      <Sidebar onCollapseChange={setSidebarCollapsed} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Top Navigation Bar */}
        <TopNav title="Notifications" />

        {/* Content */}
        <main className="p-8 mt-[88px]"> {/* Add top margin to offset fixed header */}
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-[878px]">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <p className="text-sm text-gray-500">Notifications.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
