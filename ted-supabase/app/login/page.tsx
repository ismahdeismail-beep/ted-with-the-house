'"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/feed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}
