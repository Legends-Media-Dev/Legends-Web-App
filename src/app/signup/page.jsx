"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Sign Up Page</h1>
      <p className="text-gray-600">
        This is a placeholder. Sign up logic will go here.
      </p>
      <Link href="/login">
        <button className="text-blue-500 underline">
          Already have an account? Log In
        </button>
      </Link>
      <Link href="/">
        <button className="text-gray-500 underline">Back to Dashboard</button>
      </Link>
    </div>
  );
}
