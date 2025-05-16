"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Sidebar from "@/components/WebsiteComponents/Sidebar";
import StatCard from "@/components/WebsiteComponents/StatCard";
import TeamMembersCard from "@/components/TeamMembersCard";
import TopNav from "@/components/WebsiteComponents/TopNav";

export default function AnalyticsPage() {
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

  const [showAllUsers, setShowAllUsers] = useState(false);

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
        className={`flex-1 transition-all duration-300 pt-[40px] ${
          sidebarCollapsed ? "ml-16" : "ml-48"
        }`}
      >
        {/* Top Nav */}
        <TopNav title="Analytics" />

        {/* Page Content */}
        <div className="px-6 pt-10 pb-10 flex flex-col gap-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Users"
              value="478"
              trend={2}
              trendType="up"
              chart={<MiniChart />}
            />
            <StatCard
              title="Daily Active Users"
              value="58"
              trend={-4}
              trendType="down"
              chart={<MiniChart />}
            />
            <StatCard
              title="New Signups (This Week)"
              value="26"
              trend={5}
              trendType="up"
              chart={<MiniChart />}
            />
            <StatCard
              title="Top Viewed Screen"
              value={<span className="font-semibold text-lg">Product Page</span>}
              chart={null}
            />
          </div>

          {/* All Users + Team Members Row */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* All Users Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full lg:w-3/4">
              <h2 className="text-sm font-medium text-gray-500 mb-4">All Users</h2>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showAllUsers ? "max-h-fit" : "max-h-[450px]"
                }`}
              >
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
                    {Array.from({ length: 20 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 font-medium text-gray-900">Customer {i + 1}</td>
                        <td className="px-6 py-4">Other</td>
                        <td className="px-6 py-4">Other</td>
                        <td className="px-6 py-4">Other</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!showAllUsers && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowAllUsers(true)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>

            {/* Team Members Section */}
            <TeamMembersCard initialMembers={members} />
          </div>
        </div>
      </main>
    </div>
  );
}

function MiniChart() {
  const heights = [20, 40, 60, 30, 50];
  return (
    <div className="flex items-end justify-between w-full h-full">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] bg-blue-500 rounded-sm"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
