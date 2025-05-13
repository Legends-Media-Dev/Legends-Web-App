"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link"; 

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // These users should not be set it should be pulling the users from firestore and then displaying those users in the Team Members section
  const [members, setMembers] = useState([
    { name: "Jessica Guzman", image: "/images/jessica.png" },
    { name: "Melina Rushton", image: "/images/melina.png" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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

  const handleAddMember = () => {
    if (!newName.trim()) return;
    setMembers([...members, { name: newName, image: "/default.png" }]);
    setNewName("");
    setShowForm(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-[#464A4F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] text-gray-800">
        {/* Sidebar Button for Mobile */}
        <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-white bg-blue-500"
        >
            <ion-icon name="menu"></ion-icon>
        </button>

       {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block fixed top-0 left-0 h-screen w-64 bg-white shadow flex flex-col p-6 space-y-6 z-50`}
      >
        <img src="/images/legends_logo.png" alt="LEGENDS Logo" className="w-36 h-auto mt-4" />
        <nav className="w-full">
          <Link href="/dashboard">
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 font-medium mb-4 ${
                router.pathname === "/dashboard" ? "bg-gray-400" : ""
              }`}
            >
              <ion-icon name="grid"></ion-icon>
              <span>Dashboard</span>
            </button>
          </Link>
          <Link href="/notifications">
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 font-medium mb-4 ${
                router.pathname === "/notifications" ? "bg-gray-400" : "hover:bg-gray-100"
              }`}
            >
              <ion-icon name="notifications"></ion-icon>
              <span>Notifications</span>
            </button>
          </Link>
          <Link href="/newdrop">
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 font-medium mb-4 ${
                router.pathname === "/newdrop" ? "bg-gray-400"  : "hover:bg-gray-100"
              }`}
            >
              <ion-icon name="add-circle"></ion-icon>
              <span>New Drop</span>
            </button>
          </Link>
          <Link href="/giveaways">
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 font-medium ${
                router.pathname === "/giveaways" ? "bg-gray-400" : "hover:bg-gray-100"
              }`}
            >
              <ion-icon name="trophy"></ion-icon>
              <span>Giveaways</span>
            </button>
          </Link>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-4 sm:6 lg:p-8 lg:ml-64 bg-[#f4f7f9]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="ml-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">14th Apr 2025</p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative pr-20">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src="/images/jessica.png" className="w-10 h-10 rounded-full object-cover" alt="User" />
              <span className="text-xl font-bold">Jessica Guzman</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

        {/* Content Grid */}
        <div className="flex w-full gap-7">
          {/* Left: Stat Cards + All Users */}
          <div className="flex-1 flex flex-col gap-4 pt-8 px-[40px]">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Total Users */}
              <div className="bg-red-300 p-4 rounded-lg text-center shadow min-h-[120px]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-3">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <p className="font-semibold text-sm">Total Users</p>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">478</h2>
                  <p className="text-xs">From the running month</p>
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-gray-300 p-4 rounded-lg text-center shadow min-h-[120px]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-3">
                    <ion-icon name="trending-up"></ion-icon>
                    <p className="font-semibold text-sm">Active Users</p>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">58</h2>
                  <p className="text-xs">Last 7 days</p>
                </div>
              </div>

              {/* New Signups */}
              <div className="bg-gray-700 text-white p-4 rounded-lg text-center shadow min-h-[120px]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-3">
                    <ion-icon name="add-circle"></ion-icon>
                    <p className="font-semibold text-sm">New Signups</p>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">26</h2>
                  <p className="text-xs">This Month</p>
                </div>
              </div>
            </div>
            
            {/* All Users Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-14 w-full">
              <h2 className="text-xl font-bold mb-4">All Users</h2>
              <div className="overflowflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3">Customer Name</th>
                    <th scope="col" className="px-6 py-3">Other</th>
                    <th scope="col" className="px-6 py-3">Other</th>
                    <th scope="col" className="px-6 py-3">Other</th>
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
          </div>

          {/* Right: Team Members Box */}
          <div className="flex justify-end pr-[50px] mt-8 mr-6">
            <div className="bg-white p-4 rounded-lg shadow h-fit w-[325px] min-h-[250px]">

            <h2 className="font-bold text-xl mb-4">Team Members</h2>
            <ul className="space-y-4 mb-4">
              {members.map((member, index) => (
                <li key={index}>
                  <span className="bg-gray-100 text-sm font-bold text-gray-800 py-2 px-3 rounded-lg w-full flex items-center space-x-2">
                    <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="truncate">{member.name}</span>
                  </span>
                </li>
              ))}
            </ul>

            {showForm ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="border p-2 rounded flex-1"
                  placeholder="Enter name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  onClick={handleAddMember}
                  className="bg-black text-white px-3 py-2 rounded"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-400 w-full py-2 rounded flex items-center justify-center space-x-2"
                onClick={() => setShowForm(true)}
              >
                <ion-icon name="add-circle-sharp"></ion-icon>
                <span>Add a Member</span>
              </button>
            )}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
