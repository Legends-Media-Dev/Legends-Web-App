"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import TeamMembersCard from "@/components/TeamMembersCard";
import TopNav from "@/components/TopNav";

import { IoPeople, IoTrendingUp, IoPersonAdd } from "react-icons/io5";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([
    { name: "Jessica Guzman" },
    { name: "Melina Rushton" },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-[#464A4F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar onCollapseChange={setSidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 pt-[60px] ${
          sidebarCollapsed ? "ml-[64px]" : "ml-[256px]"
        }`}
      >
        {/* Top Nav */}
        <TopNav title="Dashboard" />

        {/* Page Content */}
        <div className="px-8 pt-10 pb-10">
          <div className="flex w-full gap-7 items-start">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={<IoPeople size={18} />}
                  title="Total Users"
                  value="478"
                  description="From the running month"
                />
                <StatCard
                  icon={<IoTrendingUp size={18} />}
                  title="Active Users"
                  value="58"
                  description="Last 7 days"
                />
                <StatCard
                  icon={<IoPersonAdd size={18} />}
                  title="New Signups"
                  value="26"
                  description="This Month"
                />
              </div>

              {/* All Users Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
                <h2 className="text-xl font-bold mb-4">All Users</h2>
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr>
                      <th className="px-6 py-3">Customer Name</th>
                      <th className="px-6 py-3">Other</th>
                      <th className="px-6 py-3">Other</th>
                      <th className="px-6 py-3">Other</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 font-medium text-gray-900">Customer Name</td>
                        <td className="px-6 py-4">Other</td>
                        <td className="px-6 py-4">Other</td>
                        <td className="px-6 py-4">Other</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-[325px]">
              <TeamMembersCard initialMembers={members} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
