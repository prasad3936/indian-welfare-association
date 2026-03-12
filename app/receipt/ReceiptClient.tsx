"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKZ1BEMHWNT4TXfsgO5Qc6CoUz3W53peGrr99NG8LERUjolxuoga1rHcd6ygeihDAp/exec";

export default function ReceiptClient() {
  const params = useSearchParams();
  const receiptNo = params.get("no");

  const [status, setStatus] = useState("Generating receipt...");

  useEffect(() => {
    if (!receiptNo) {
      setStatus("Invalid receipt number");
      return;
    }

    fetch(`${SCRIPT_URL}?action=getDonations`)
      .then((res) => res.json())
      .then((data) => {
        const d = data.find((x: any) => x.receiptno === receiptNo);

        if (!d) {
          setStatus("Receipt not found");
          return;
        }

        generatePDF(d);
      })
      .catch(() => {
        setStatus("Failed to load receipt");
      });
  }, [receiptNo]);

  const loadImage = (url: string) => {
    return new Promise<string>((resolve) => {
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

    const formattedAmount = Number(d.amount || 0).toLocaleString("en-IN");

    doc.addImage(logo, "PNG", 15, 10, 25, 25);

    doc.setFontSize(18);
    doc.text("Indian Social Welfare Association Hingoli", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.text("Hingoli, Maharashtra", pageWidth / 2, 27, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.text("DONATION RECEIPT", pageWidth / 2, 45, {
      align: "center",
    });

    doc.rect(20, 55, pageWidth - 40, 80);

    let y = 70;

    doc.setFontSize(12);

    const row = (label: string, value: string) => {
      doc.text(label, 30, y);
      doc.text(value, 100, y);
      y += 10;
    };

    row("Receipt No:", String(d.receiptno));
    row("Donor Name:", String(d.name || "-"));
    row("Phone:", String(d.phone || "-"));
    row("Email:", String(d.email || "-"));
    row("Donation Amount:", `₹ ${formattedAmount}`);
    row("Transaction ID:", String(d.transaction || "-"));
    row("Date:", new Date(d.date).toLocaleDateString("en-IN"));

    doc.setFontSize(11);
    doc.text(
      "This donation may be eligible for tax deduction under Section 80G.",
      pageWidth / 2,
      150,
      { align: "center" },
    );

    doc.addImage(signature, "JPEG", pageWidth - 70, 220, 40, 20);

    doc.setFontSize(10);
    doc.text("Authorized Signatory", pageWidth - 50, 245, {
      align: "center",
    });

    doc.save(`Donation_Receipt_${d.receiptno}.pdf`);

    setTimeout(() => {
      window.close();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status}
    </div>
  );
}
