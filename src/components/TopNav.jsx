import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import PageHeader from "@/components/PageHeader";

export default function TopNav({ title }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-gray-200 z-40 flex items-center justify-between px-6">
      {/* Left: Icon + Page Title */}
      <div className="flex items-center space-x-5 ">
        <Image
          src="/icon.png"
          alt="Legends Logo"
          width={50}
          height={50}
          className="rounded-md object-contain"
        />
        <PageHeader title={title} className="mb-0" />
      </div>

      {/* Right: User Dropdown */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-sm font-medium text-gray-800">
              {user.displayName || "User"}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-md z-50">
              <button
                onClick={async () => {
                  await auth.signOut();
                  router.push("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 font-medium transition"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
