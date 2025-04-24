"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { supabase } from "@/services/supabaseClient";
import { FaGoogle } from "react-icons/fa6";
interface AuthFormProps {
  isSignup?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const response = await api.post(endpoint, { email, password });
      console.log(response.data);
      if (isSignup) {
        router.push("/login");
      } else {
        const accessToken = response.data?.session?.access_token;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          router.push("/notes")
        }
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert("Google login failed");
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800 text-zinc-100"
    >
      <h2 className="text-2xl font-semibold mb-6 text-zinc-200">
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-100 placeholder-zinc-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-100 placeholder-zinc-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition-colors"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>
      <div className="text-center mt-2">or</div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded flex items-center gap-2 justify-center"
      >
       <FaGoogle className="text-2xl"/> Continue with Google
      </button>
    </form>
  );
};

export default AuthForm;
