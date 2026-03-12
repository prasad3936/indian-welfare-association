"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import jsPDF from "jspdf";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKZ1BEMHWNT4TXfsgO5Qc6CoUz3W53peGrr99NG8LERUjolxuoga1rHcd6ygeihDAp/exec";

export default function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(`${SCRIPT_URL}?action=getDonations`);
    const data = await res.json();

    const normalized = data.map((d: any) => ({
      ...d,
      paymentVerified: d.paymentverified || "No",
    }));

    setDonations(normalized);
    setFiltered(normalized);
  };

  const filterData = () => {
    let data = donations;

    if (month) {
      data = data.filter(
        (d: any) => new Date(d.date).getMonth() + 1 === Number(month),
      );
    }

    if (year) {
      data = data.filter(
        (d: any) => new Date(d.date).getFullYear() === Number(year),
      );
    }

    setFiltered(data);
  };

  const verifyPayment = async (row: number, value: string) => {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        type: "verifyPayment",
        row,
        value,
      }),
    });

    await loadData();
  };

  const generatePDF = (d: any) => {
    if (!d.receiptno) {
      alert("Receipt number not generated yet. Verify payment first.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const logo = "/logo.png";
    const signature = "/signature.jpeg";

    doc.addImage(logo, "PNG", 15, 10, 25, 25);

    doc.setFontSize(18);
    doc.text("Indian Social Welfare Mission Hingoli Hingoli", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.text("Hingoli, Maharashtra", pageWidth / 2, 27, { align: "center" });

    doc.setFontSize(16);
    doc.text("DONATION RECEIPT", pageWidth / 2, 45, { align: "center" });

    doc.rect(20, 55, pageWidth - 40, 80);

    let y = 70;

    doc.setFontSize(12);

    doc.text("Receipt No:", 30, y);
    doc.text(String(d.receiptno), 100, y);

    y += 10;
    doc.text("Donor Name:", 30, y);
    doc.text(String(d.name || "-"), 100, y);

    y += 10;
    doc.text("Phone:", 30, y);
    doc.text(String(d.phone || "-"), 100, y);

    y += 10;
    doc.text("Email:", 30, y);
    doc.text(String(d.email || "-"), 100, y);
y += 10;
doc.text("Donation Amount:", 30, y);

const formattedAmount = Number(d.amount || 0).toLocaleString("en-IN");

doc.text(`Rs. ${formattedAmount}`, 100, y);

    y += 10;
    doc.text("Transaction ID:", 30, y);
    doc.text(String(d.transaction || "-"), 100, y);

    y += 10;
    doc.text("Date:", 30, y);
    doc.text(String(new Date(d.date).toLocaleDateString("en-IN")), 100, y);

    doc.setFontSize(11);
    doc.text(
      "This donation may be eligible for tax deduction under Section 80G.",
      pageWidth / 2,
      150,
      { align: "center" },
    );

    doc.addImage(signature, "JPEG", pageWidth - 70, 220, 40, 20);

    doc.setFontSize(10);
    doc.text("Authorized Signatory", pageWidth - 50, 245, { align: "center" });

    doc.save(`Donation_Receipt_${d.receiptno}.pdf`);
  };

  const sendWhatsAppReceipt = (d: any) => {
    if (!d.receiptno) {
      alert("Verify payment first to generate receipt.");
      return;
    }

    const baseUrl = window.location.origin;

const receiptLink = `${baseUrl}/receipt?no=${d.receiptno}`;

    const message = `Hello ${d.name},

Thank you for supporting Indian Social Welfare Mission Hingoli.

Receipt No: ${d.receiptno}
Amount: ₹${d.amount}

Download your receipt here:
${receiptLink}

We appreciate your support 🙏`;

    const url = `https://wa.me/91${d.phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const totalDonations = filtered.length;

  const totalAmount = filtered.reduce(
    (sum: number, d: any) => sum + Number(d.amount || 0),
    0,
  );

  const verifiedCount = filtered.filter(
    (d) => d.paymentVerified === "Yes",
  ).length;

  const verifiedAmount = filtered
    .filter((d) => d.paymentVerified === "Yes")
    .reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Transaction",
      "Amount",
      "Date",
      "PaymentVerified",
      "ReceiptNo",
    ];

    const rows = filtered.map((d: any) => [
      d.name,
      d.email,
      d.phone,
      d.transaction,
      d.amount,
      d.date,
      d.paymentVerified,
      d.receiptno || "",
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
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
          <h1 className="text-3xl font-bold text-gray-700 mb-10">
            Donation Dashboard
          </h1>

          <div className="grid md:grid-cols-4 text-gray-700 gap-6 mb-10">
            <div className="bg-green-50 text-gray-700 p-6 rounded-xl">
              <p>Total Donations</p>
              <h2 className="text-3xl text-gray-700  font-bold">
                {totalDonations}
              </h2>
            </div>

            <div className="bg-blue-50 text-gray-700 p-6 rounded-xl">
              <p>Total Amount</p>
              <h2 className="text-3xl text-gray-700  font-bold">
                ₹ {totalAmount}
              </h2>
            </div>

            <div className="bg-yellow-50 text-gray-700 p-6 rounded-xl">
              <p>Verified Payments</p>
              <h2 className="text-3xl text-gray-700  font-bold">
                {verifiedCount}
              </h2>
            </div>

            <div className="bg-purple-50 text-gray-700 p-6 rounded-xl">
              <p>Verified Amount</p>
              <h2 className="text-3xl text-gray-700  font-bold">
                ₹ {verifiedAmount}
              </h2>
            </div>
          </div>

          <div className="flex text-gray-700 gap-4 mb-10">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border  text-gray-700 p-2"
            >
              <option  value="">All Months</option>
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
              className="border text-gray-700 p-2"
            />

            <button
              onClick={filterData}
              className="bg-green-600 text-gray-700  text-white px-4"
            >
              Filter
            </button>

            <button
              onClick={downloadCSV}
              className="bg-blue-600 text-white px-4"
            >
              Download CSV
            </button>
          </div>

          <table className="w-full border">
            <thead>
              <tr>
                <th className="border text-gray-700 p-3">Name</th>
                <th className="border text-gray-700 p-3">Phone</th>
                <th className="border text-gray-700 p-3">Transaction</th>
                <th className="border text-gray-700 p-3">Amount</th>
                <th className="border text-gray-700 p-3">Date</th>
                <th className="border text-gray-700 p-3">Payment</th>
                <th className="border text-gray-700 p-3">Receipt</th>
                <th className="border text-gray-700 p-3">WhatsApp</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td className="border text-gray-700  p-3">{d.name}</td>
                  <td className="border text-gray-700  p-3">{d.phone}</td>
                  <td className="border text-gray-700  p-3">{d.transaction}</td>
                  <td className="border text-gray-700  p-3">₹ {d.amount}</td>
                  <td className="border text-gray-700  p-3">{d.date}</td>

                  <td className="border p-3">
                    <select
                      value={d.paymentVerified}
                      onChange={(e) => verifyPayment(d.row, e.target.value)}
                      className="border text-gray-700  p-1"
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </td>

                  <td className="border text-gray-700  p-3">
                    {d.receiptno || "Pending"}
                    <button
                      onClick={() => generatePDF(d)}
                      className="ml-2 text-green-700"
                    >
                      PDF
                    </button>
                  </td>

                  <td className="border text-gray-700 p-3">
                    <button
                      onClick={() => sendWhatsAppReceipt(d)}
                      className="text-green-700"
                    >
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}
