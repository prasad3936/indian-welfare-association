"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwUMcS7792zKpkd3d4gb-LY8QLbj-ovMpVJ0hDcc_ULiCnQhcQP9Kus7IuoRsEaaiXt/exec?action=getDonations"
    )
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setFiltered(data);
      });
  }, []);

  const filterData = () => {
    let data = donations;

    if (month) {
      data = data.filter((d: any) => {
        return new Date(d.date).getMonth() + 1 === Number(month);
      });
    }

    if (year) {
      data = data.filter((d: any) => {
        return new Date(d.date).getFullYear() === Number(year);
      });
    }

    setFiltered(data);
  };

  const totalDonations = filtered.length;

  const totalAmount = filtered.reduce((sum: number, d: any) => {
    return sum + Number(d.amount || 0);
  }, 0);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Transaction", "Amount", "Date"];

    const rows = filtered.map((d: any) => [
      d.name,
      d.email,
      d.phone,
      d.transaction,
      d.amount,
      d.date,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "donations.csv";

    a.click();
  };

  return (
    <AdminGuard>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold  text-gray-700 mb-10">Donation Statistics</h1>

          {/* Stats */}

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-green-50 p-6 rounded-xl">
              <p className="text-gray-700">Total Donations</p>
              <h2 className="text-3xl font-bold text-green-700">
                {totalDonations}
              </h2>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700">Total Amount</p>
              <h2 className="text-3xl font-bold text-blue-700">
                ₹ {totalAmount}
              </h2>
            </div>
          </div>

          {/* Filters */}

          <div className="flex gap-4 mb-10">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border p-2 rounded text-gray-700"
            >
              <option value="">All Months</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>

            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 rounded text-gray-700"
            />

            <button
              onClick={filterData}
              className="bg-green-600 text-white px-4 rounded"
            >
              Filter
            </button>

            <button
              onClick={downloadCSV}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Download CSV
            </button>
          </div>

          {/* Table */}

          <table className="w-full border">
            <thead className="text-gray-700">
              <tr>
                <th className=" text-gray-700 border p-3">Name</th>
                <th className="text-gray-700 border p-3">Email</th>
                <th className="text-gray-700 border p-3">Phone</th>
                <th className="text-gray-700 border p-3">Transaction</th>
                <th className="text-gray-700 border p-3">Amount</th>
                <th className="text-gray-700 border p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td className=" text-gray-700 border p-3">{d.name}</td>
                  <td className="text-gray-700 border p-3">{d.email}</td>
                  <td className="text-gray-700 border p-3">{d.phone}</td>
                  <td className="text-gray-700 border p-3">{d.transaction}</td>
                  <td className="text-gray-700 border p-3">₹ {d.amount}</td>
                  <td className="text-gray-700 border p-3">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}
