"use client";

import { useEffect, useState } from "react";

export default function DonatePage() {
  const [bank, setBank] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    transaction: "",
    amount: "",
    receipt: null as File | null,
  });

  useEffect(() => {
    fetch("/api/bank/get")
      .then((res) => res.json())
      .then((data) => setBank(data));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    setForm({ ...form, receipt: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.receipt) {
      alert("Please upload payment receipt");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = reader.result?.toString().split(",")[1];

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbwUMcS7792zKpkd3d4gb-LY8QLbj-ovMpVJ0hDcc_ULiCnQhcQP9Kus7IuoRsEaaiXt/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "donation",
              name: form.name,
              email: form.email,
              phone: form.phone,
              amount: form.amount,
              transaction: form.transaction,
              file: base64,
              fileName: form.receipt?.name,
            }),
          },
        );

        alert("Donation submitted successfully. Thank you!");

        setForm({
          name: "",
          email: "",
          phone: "",
          transaction: "",
          amount: "",
          receipt: null,
        });
      } catch (error) {
        alert("Error submitting donation. Please try again.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(form.receipt);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Heading */}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Support Our Cause
        </h1>

        {/* Bank Details */}

        <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-16">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Bank Transfer Details
          </h2>

          <div className="space-y-3 text-gray-700 text-lg">
            <p>
              <strong>Account Name:</strong> {bank.accountName}
            </p>

            <p>
              <strong>Account Number:</strong> {bank.accountNumber}
            </p>

            <p>
              <strong>IFSC Code:</strong> {bank.ifsc}
            </p>

            <p>
              <strong>Bank:</strong> {bank.bank}
            </p>

            <p>
              <strong>Branch:</strong> {bank.branch}
            </p>
          </div>

          <p className="mt-6 text-gray-600">
            After completing the bank transfer, please fill the form below and
            upload your payment receipt for verification.
          </p>
        </div>

        {/* Donation Form */}

        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-8">
            Submit Donation Details
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Donation Amount
              </label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Transaction ID / UTR Number
              </label>

              <input
                type="text"
                name="transaction"
                value={form.transaction}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Upload Payment Receipt
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Submitting..." : "Submit Donation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
