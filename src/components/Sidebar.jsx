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
  IoTrophy,
} from "react-icons/io5";

/**
 * Props:
 * - onCollapseChange?: (collapsed: boolean) => void
 */
export default function Sidebar({ onCollapseChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange?.(newState); // Notify parent
  };

  useEffect(() => {
    onCollapseChange?.(collapsed);
  }, []); // Notify parent on initial mount

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow z-50 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
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

      <div className="flex flex-col items-center p-4 space-y-6">
        {/* Logo */}
        {!collapsed && (
          <img
            src="/images/legends_logo.png"
            alt="Logo"
            className="w-36 h-auto mt-2"
          />
        )}

        {/* Nav */}
        <nav className="w-full space-y-2 mt-4">
          <SidebarLink
            href="/dashboard"
            icon={<IoGrid size={20} />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <SidebarLink
            href="/notifications"
            icon={<IoNotifications size={20} />}
            label="Notifications"
            collapsed={collapsed}
          />
          <SidebarLink
            href="/newdrop"
            icon={<IoAddCircle size={20} />}
            label="New Drop"
            collapsed={collapsed}
          />
          <SidebarLink
            href="/giveaways"
            icon={<IoTrophy size={20} />}
            label="Giveaways"
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
        className={`flex items-center px-4 py-3 rounded-md cursor-pointer transition space-x-2
          ${collapsed ? "justify-center" : ""}
          ${isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100 text-gray-800"}
        `}
      >
        <span className={`${isActive ? "text-blue-600" : "text-gray-600"}`}>
          {icon}
        </span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </Link>
  );
}
