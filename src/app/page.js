"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useEffect} from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-[#464A4F] rounded-full animate-spin"></div>
          <span className="text-gray-600 text-md">.</span>
        </div>
      </div>
    );
  }  

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Login */}
      <div className="w-7/12 flex flex-col justify-center items-center w-1/2 bg-[#FFFFFF] p-10">
        <img
          src="/images/legends_logo.png"
          alt="Legends Logo"
          className="w-112 mb-10"
        />
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-7">
          <div>
            <input
              type="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md bg-[#DBE0E3] px-4 py-2 text-gray-700 placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md bg-[#DBE0E3] px-4 py-2 text-gray-700 placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[250px] h-[40px] bg-[#464A4F] text-white text-sm font-semibold rounded-md active:opacity-70 transition duration-150"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
  
      {/* Right side - Image */}
      <div className="w-5/12 h-screen">
        <img
          src="/images/r34.png"
          alt="Skyline R34"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
  }  