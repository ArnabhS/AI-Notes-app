"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function SimpleNavbar() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setShowLogin(!token);
    }
  }, []);

  return (
    <div className="w-full flex justify-center mt-10">
      <nav className=" border-1 border-gray-600 text-white px-10 py-5 rounded-full shadow-lg flex justify-between items-center gap-6 max-w-3xl w-full">
        <Link href="/" className="text-lg font-semibold hover:text-emerald-400 transition">
           Notes App
        </Link>

        <div className="flex-1 flex justify-center gap-8">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/notes" className="hover:text-emerald-400 transition">Notes</Link>
        </div>

        {showLogin && (
          <Link href="/login">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm">
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}
