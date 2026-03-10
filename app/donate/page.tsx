"use client";

import { useState } from "react";

export default function DonatePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    transaction: "",
    receipt: null as File | null,
  });

  const [loading, setLoading] = useState(false);

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
          "https://script.google.com/macros/s/AKfycbyxp5rfPfwqlE7SWXksrRUHNDdNdDLkNCBg0cWW0DjzYwZKj-RnhpKLQlVOATGPocCF/exec",
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
        {/* Page Heading */}
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
              <strong>Account Name:</strong> Indian Social Welfare Mission
              Hingoli
            </p>
            <p>
              <strong>Account Number:</strong> 544101010050662
            </p>
            <p>
              <strong>IFSC Code:</strong> UBIN0554413
            </p>
            <p>
              <strong>Bank:</strong> HINGOLI BRANCH, HINGOLI-431513,UNION BANK OF
              INDIA
            </p>
            <p>
              <strong>Branch:</strong> Hingoli, Maharashtra
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
            {/* Name */}
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
                className="w-full border text-gray-700 rounded-md p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Email */}
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
                className="w-full border text-gray-700 rounded-md p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Phone */}
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
                className="w-full border text-gray-700 rounded-md p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Transaction ID */}
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
                className="w-full border text-gray-700 rounded-md p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Upload Receipt */}
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

            {/* Submit */}
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
