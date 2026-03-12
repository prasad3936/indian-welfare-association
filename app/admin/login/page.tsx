"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-2xl font-bold text-green-700 text-center mb-8">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border text-gray-800 p-3 rounded mb-4"
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
}
