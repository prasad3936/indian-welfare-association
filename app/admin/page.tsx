"use client";

import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminDashboard() {
  const logout = () => {
    localStorage.removeItem("admin-auth");
    window.location.href = "/admin/login";
  };

  return (
    <AdminGuard>
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-gray-700 ">Admin Dashboard</h1>

            <button
              onClick={logout}
              className="bg-red-500 text-black px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-3  text-gray-700 gap-8">            
            <Link href="/admin/donations" className="border p-6 rounded shadow">
              Donation Dashboard
            </Link>
            
            <Link
              href="/admin/volunteers"
              className="border p-6 rounded shadow"
            >
              Volunteers
            </Link>

            <Link href="/admin/bank" className="border p-6 rounded shadow">
              Bank Settings
            </Link>
            
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
