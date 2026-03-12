"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    type: "upcoming",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadEvents = async () => {
    const res = await fetch("/api/events/list");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEvent = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch("/api/events/add", {
      method: "POST",
      body: formData,
    });

    setForm({
      title: "",
      date: "",
      venue: "",
      description: "",
      type: "upcoming",
    });

    setImageFile(null);

    loadEvents();
  };

  const deleteEvent = async (slug: string) => {
    await fetch("/api/events/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    loadEvents();
  };

  return (
    <AdminGuard>
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-3xl text-gray-700 font-bold mb-10">
            Manage Events
          </h1>

          {/* ADD EVENT */}

          <div className="border p-6 rounded-xl mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Add Event
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="border p-3 rounded text-gray-700"
              />

              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Event Date"
                className="border p-3 rounded text-gray-700"
              />

              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="Venue"
                className="border p-3 rounded text-gray-700"
              />

              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="border p-3 rounded text-gray-700"
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border p-3 rounded text-gray-700"
              >
                <option value="latest">Latest</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-3 rounded md:col-span-2 text-gray-700"
              />
            </div>

            <button
              onClick={addEvent}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
            >
              Add Event
            </button>
          </div>

          {/* EVENTS LIST */}

          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Event List
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.slug} className="border rounded-lg p-5">
                {event.image && (
                  <img
                    src={event.image}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}

                <h3 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>

                <p className="text-gray-600">
                  {event.date} • {event.venue}
                </p>

                <p className="text-gray-700 mt-2 text-sm">
                  {event.description}
                </p>

                <p className="text-xs mt-2 text-gray-500">Type: {event.type}</p>

                <button
                  onClick={() => deleteEvent(event.slug)}
                  className="mt-4 text-red-600"
                >
                  Delete Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
