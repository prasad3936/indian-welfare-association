"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import jsPDF from "jspdf";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKZ1BEMHWNT4TXfsgO5Qc6CoUz3W53peGrr99NG8LERUjolxuoga1rHcd6ygeihDAp/exec";

export default function ReceiptPage() {
  const params = useSearchParams();
  const receiptNo = params.get("no");

  useEffect(() => {
    if (!receiptNo) return;

    fetch(`${SCRIPT_URL}?action=getDonations`)
      .then((res) => res.json())
      .then((data) => {
        const d = data.find((x: any) => x.receiptno === receiptNo);

        if (!d) return;

        generatePDF(d);
      });
  }, [receiptNo]);

  const loadImage = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = url;
    });
  };

  const generatePDF = async (d: any) => {
    const logo = await loadImage("/logo.png");
    const signature = await loadImage("/signature.jpeg");

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(logo as string, "PNG", 15, 10, 25, 25);

    doc.setFontSize(18);
    doc.text("Indian Social Welfare Association Hingoli", pageWidth / 2, 20, {
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

    doc.addImage(signature as string, "JPEG", pageWidth - 70, 220, 40, 20);

    doc.setFontSize(10);
    doc.text("Authorized Signatory", pageWidth - 50, 245, { align: "center" });

    doc.save(`Donation_Receipt_${d.receiptno}.pdf`);

    setTimeout(() => {
      window.close();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black text-lg">
      Generating your receipt...
    </div>
  );
}
