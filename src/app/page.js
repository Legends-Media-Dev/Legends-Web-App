"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">This is a placeholder home screen.</p>
      <Link href="/login">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Go to Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Go to Sign Up
        </button>
      </Link>
    </div>
  );
}
