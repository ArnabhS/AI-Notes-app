"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GridBackground } from "@/components/ui/grid-background";
import { supabase } from "@/services/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/notes");
    } else {
      router.push("/signup");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };
  useEffect(() => {
    const getSessionAndStoreToken = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.access_token) {
        localStorage.setItem('accessToken', data.session.access_token);
      }
      if(error){
        console.error(error.message)
      }
    };

    getSessionAndStoreToken();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.access_token) {
          localStorage.setItem('accessToken', session.access_token);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased relative overflow-hidden font-poppins">
 
  <div className="absolute inset-0 z-0 pointer-events-none">
    <GridBackground />
  </div>

  
  {/* <div className="absolute inset-0 z-10 pointer-events-none">
    <Spotlight />
  </div> */}

  
  <div className="p-4 max-w-7xl mx-auto relative z-20 w-full pt-20 md:pt-0 text-center ">
    <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
      AI Note Summarizer
    </h1>
    <p className="mt-4 text-base text-neutral-300 max-w-xl mx-auto">
      Turn your thoughts into organized notes powered by AI. Seamless. Smart. Simple.
    </p>

    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={handleGetStarted}
        className="px-6 py-2 bg-emerald-500 text-white rounded-2xl transition"
      >
        Get Started
      </button>
      <button
        onClick={handleLogin}
        className="px-6 py-2 border border-neutral-700 text-white rounded-2xl hover:bg-neutral-800 transition"
      >
        Login
      </button>
    </div>
  </div>
</div>

  );
}
