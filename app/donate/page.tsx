"use client";

import Image from "next/image";
import { useState } from "react";

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-10">
          Support Our Mission
        </h1>

        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-16">
          Your contribution helps us provide education, healthcare and
          empowerment programs across Maharashtra and India.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* ================= UPI SECTION ================= */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Donate via UPI
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 bg-white border border-gray-300 p-4 rounded-md text-gray-900 font-semibold">
                9637370116@ybl
              </div>

              <button
                onClick={() => handleCopy("9637370116@ybl", "upi")}
                className="bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700 transition"
              >
                {copiedField === "upi" ? "Copied!" : "Copy"}
              </button>
            </div>

            <a
              href="upi://pay?pa=9637370116@ybl&pn=Indian%20Welfare%20Association&tn=Donation%20Support&cu=INR"
              className="inline-block w-full text-center bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Pay via UPI (Mobile Only)
            </a>

            <p className="text-sm text-gray-500 mt-4">
              Works only on mobile devices with UPI apps.
            </p>
          </div>

          {/* ================= QR SECTION ================= */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Scan QR Code
            </h2>

            <div className="relative w-64 h-64 mx-auto mb-6">
              <Image
                src="/upi-qr.png"
                alt="UPI QR Code"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-gray-700">
              Scan using Google Pay, PhonePe, Paytm or any UPI app.
            </p>
          </div>
        </div>

        {/* ================= BANK DETAILS ================= */}
        <div className="mt-20 bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Bank Transfer Details
          </h2>

          <div className="space-y-6">
            {/* Account Name */}
            <div>
              <p className="text-gray-700 mb-2 font-semibold">Account Name</p>
              <div className="bg-white border border-gray-300 p-4 rounded-md text-gray-900 font-medium">
                Indian Welfare Association
              </div>
            </div>

            {/* Account Number */}
            <div>
              <p className="text-gray-700 mb-2 font-semibold">Account Number</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white border border-gray-300 p-4 rounded-md text-gray-900 font-medium">
                  XXXXXXXX
                </div>
                <button
                  onClick={() => handleCopy("XXXXXXXX", "account")}
                  className="bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  {copiedField === "account" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* IFSC */}
            <div>
              <p className="text-gray-700 mb-2 font-semibold">IFSC Code</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white border border-gray-300 p-4 rounded-md text-gray-900 font-medium">
                  XXXXXXXX
                </div>
                <button
                  onClick={() => handleCopy("XXXXXXXX", "ifsc")}
                  className="bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  {copiedField === "ifsc" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Bank Name */}
            <div>
              <p className="text-gray-700 mb-2 font-semibold">Bank Name</p>
              <div className="bg-white border border-gray-300 p-4 rounded-md text-gray-900 font-medium">
                XXXX Bank
              </div>
            </div>
          </div>
        </div>

        {/* ================= 80G SECTION ================= */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            80G Tax Benefit
          </h2>

          <p className="text-gray-700 mb-6">
            All donations are eligible for tax exemption under Section 80G.
          </p>

          <a
            href="/80g-certificate.pdf"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Download 80G Certificate
          </a>
        </div>
      </div>
    </div>
  );
}
