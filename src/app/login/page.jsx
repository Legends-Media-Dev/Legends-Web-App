"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Login Page</h1>
      <p className="text-gray-600">This is a placeholder. Login logic will go here.</p>
      <Link href="/signup">
        <button className="text-blue-500 underline">Don't have an account? Sign Up</button>
      </Link>
      <Link href="/">
        <button className="text-gray-500 underline">Back to Dashboard</button>
      </Link>
    </div>
  );
}
