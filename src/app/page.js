"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function HomePage() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login"; // or use router.push("/login") if preferred
  };

  return (
    <ProtectedRoute>
      <div className="p-10 space-y-4">
        <h1 className="text-2xl font-semibold">
          Welcome to the Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Log Out
        </button>
      </div>
    </ProtectedRoute>
  );
}
