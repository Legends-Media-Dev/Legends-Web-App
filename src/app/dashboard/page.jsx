"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        <div className="w-6 h-6 border-4 border-gray-300 border-t-[#464A4F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">This is the Dashboard</h1>
      <button
        onClick={async () => {
          await auth.signOut();
          router.push("/");
        }}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        Log Out
      </button>
    </div>
  );
}
