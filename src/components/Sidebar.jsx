"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoChevronForward,
  IoChevronBack,
  IoGrid,
  IoNotifications,
  IoAddCircle,
} from "react-icons/io5";

export default function Sidebar({ onCollapseChange }) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });

  const [hovered, setHovered] = useState(false);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", newState.toString());
    onCollapseChange?.(newState);
  };

  useEffect(() => {
    onCollapseChange?.(collapsed);
  }, [collapsed]);

  return (
    <aside
      className={`fixed left-0 z-30 mt-[60px] h-[calc(100vh-60px)] bg-white shadow transition-all duration-300 ${
        collapsed ? "w-16" : "w-48"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Toggle Button */}
      {(hovered || collapsed) && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-7 h-7 rounded-full bg-white border shadow-lg flex items-center justify-center border-gray-200 hover:scale-105 transition"
        >
          {collapsed ? <IoChevronForward size={14} /> : <IoChevronBack size={14} />}
        </button>
      )}

      {/* Sidebar Content */}
      <div className="flex flex-col items-center pt-6">
        <nav className={`w-full space-y-2 ${collapsed ? "mt-8" : "mt-6 px-3"}`}>
          <SidebarLink
            href="/analytics"
            icon={<IoGrid size={20} />}
            label="Analytics"
            collapsed={collapsed}
          />
          <SidebarLink
            href="/notifications"
            icon={<IoNotifications size={20} />}
            label="Notifications"
            collapsed={collapsed}
          />
          <SidebarLink
            href="/websiteEvents"
            icon={<IoAddCircle size={20} />}
            label="Website Events"
            collapsed={collapsed}
          />
        </nav>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label, collapsed }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center rounded-md cursor-pointer transition space-x-2 ${
          collapsed ? "justify-center p-3 w-11 h-11 mx-auto" : "px-3 py-2 w-full"
        } ${
          isActive
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "hover:bg-gray-100 text-gray-800"
        }`}
      >
        <span className={`${isActive ? "text-blue-600" : "text-gray-600"}`}>
          {icon}
        </span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
}
