"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // setError("");
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   router.push("/");
    // } catch (err) {
    //   setError(err.message);
    // }
    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  };

  console.log("✅ API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <input
        className="border p-2 mb-2 w-full max-w-sm"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full max-w-sm"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full max-w-sm"
      >
        Log In
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-500 underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
