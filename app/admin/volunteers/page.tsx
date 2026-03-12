"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKZ1BEMHWNT4TXfsgO5Qc6CoUz3W53peGrr99NG8LERUjolxuoga1rHcd6ygeihDAp/exec";

export default function VolunteerManager() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getVolunteers`, {
        cache: "no-store",
      });

      const data = await res.json();

      const normalized = data.map((v: any) => ({
        ...v,
        approved: v.approved || v.status || "Pending",
      }));

      setVolunteers(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const approveVolunteer = async (row: number, status: string) => {
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "approveVolunteer",
          row,
          status,
        }),
      });

      setVolunteers((prev) =>
        prev.map((v) => (v.row === row ? { ...v, approved: status } : v)),
      );
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const sendWhatsApp = (v: any) => {
    const message = `Hello ${v.name},

Thank you for volunteering with Indian Social Welfare Mission.

Your volunteer request has been approved.

Next Steps:
Join our volunteer WhatsApp group and wait for event updates.

Contact: +91 9665802090`;

    const url = `https://wa.me/91${v.phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const filtered = volunteers.filter((v) =>
    (v.city || "").toLowerCase().includes(filter.toLowerCase()),
  );

  const downloadCSV = () => {
    const header = ["Name", "Email", "Phone", "City", "Skills", "Availability", "Status"];

    const rows = filtered.map((v) => [
      v.name,
      v.email,
      v.phone,
      v.city,
      v.skills,
      v.availability,
      v.status
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "volunteers.csv";
    a.click();
  };

  return (
    <AdminGuard>
      <div className="bg-white text-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold mb-8">Volunteer Manager</h1>

          <div className="flex gap-4 mb-6">
            <input
              placeholder="Filter by city"
              className="border border-gray-300 p-2 rounded"
              onChange={(e) => setFilter(e.target.value)}
            />

            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Phone</th>
                  <th className="text-left">City</th>
                  <th className="text-left">Skills</th>
                  <th className="text-left">Availability</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((v, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
                    <td>{v.city}</td>
                    <td>{v.skills}</td>
                    <td>{v.availability}</td>

                    <td>
                      <select
                        className="border border-gray-300 p-1 bg-white text-black rounded"
                        value={v.approved ?? "Pending"}
                        onChange={(e) =>
                          approveVolunteer(v.row, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </td>

                    <td className="flex gap-3 p-2">
                      <button
                        onClick={() => sendWhatsApp(v)}
                        className="text-green-600 hover:underline"
                      >
                        WhatsApp
                      </button>

                      <a
                        href={`mailto:${v.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-500">
                      No volunteers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
