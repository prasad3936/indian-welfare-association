"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function BankManager() {
  const [bank, setBank] = useState({
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bank: "",
    branch: "",
  });

  useEffect(() => {
    fetch("/api/bank/get")
      .then((res) => res.json())
      .then((data) => setBank(data));
  }, []);

  const handleChange = (e: any) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const saveBank = async () => {
    await fetch("/api/bank/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bank),
    });

    alert("Bank details updated");
  };

  return (
    <AdminGuard>
      <div className="bg-white min-h-screen text-black">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold mb-8">Manage Bank Details</h1>

          <div className="space-y-4">
            <input
              name="accountName"
              value={bank.accountName}
              onChange={handleChange}
              placeholder="Account Name"
              className="border p-3 w-full rounded"
            />

            <input
              name="accountNumber"
              value={bank.accountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              className="border p-3 w-full rounded"
            />

            <input
              name="ifsc"
              value={bank.ifsc}
              onChange={handleChange}
              placeholder="IFSC Code"
              className="border p-3 w-full rounded"
            />

            <input
              name="bank"
              value={bank.bank}
              onChange={handleChange}
              placeholder="Bank Name"
              className="border p-3 w-full rounded"
            />

            <input
              name="branch"
              value={bank.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="border p-3 w-full rounded"
            />

            <button
              onClick={saveBank}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
