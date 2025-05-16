"use client";

import { useState, useEffect, use } from "react";
import { IoAddCircle } from "react-icons/io5";

import Sidebar from "@/components/WebsiteComponents/Sidebar";
import TopNav from "@/components/WebsiteComponents/TopNav";
import StatCard from "@/components/WebsiteComponents/StatCard";
import NotificationTypeFilter from "@/components/NotificationsPage/NotificationTypeFilter";
import NotificationToolbar from "@/components/NotificationsPage/NotificationToolbar";
import NotificationTable from "@/components/NotificationsPage/NotificationTable";
import CreateNotificationDrawer from "@/components/CreateNotificationDrawer";

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    }
  }, []);

    // Sample dummy data for now
    const totalUsers = 1248;
    const notifEnabledUsers = 968;
    const enabledPercent = ((notifEnabledUsers / totalUsers) * 100).toFixed(1);  

    return (
      <div className="flex min-h-screen bg-[#f4f7f9] text-gray-800">
        <CreateNotificationDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
        <Sidebar onCollapseChange={setSidebarCollapsed} />
  
        <main
          className={`flex-1 transition-all duration-300 pt-[40px] ${
            sidebarCollapsed ? "ml-16" : "ml-48"
          }`}
        >
          {/* Top Nav */}
          <TopNav title="Notifications" />

          {/* Page Content */}
          <div className="px-6 pt-10 pb-10 flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total App Users" value={totalUsers} />
              <StatCard title="Notification-enabled Users" value={notifEnabledUsers} />
              <StatCard title="Enabled Users Percentage" value={`${enabledPercent}%`} progress={parseFloat(enabledPercent)} />
            </div>
            {/* Filter + Button Row */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <NotificationTypeFilter onChange={(filters) => {}} />
              <button
                className="flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
                onClick={() => setShowDrawer(true)}
              >
                <IoAddCircle size={20} />
                New Message
              </button>
            </div>
            {/* Toolbar */}
            <NotificationToolbar></NotificationToolbar>
            {/* Data */}
            <NotificationTable />
          </div>
        </main>
      </div>
    );
  }