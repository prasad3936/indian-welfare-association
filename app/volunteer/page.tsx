"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    skills: "",
    availability: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

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
            type: "volunteer",
            name: form.name,
            email: form.email,
            phone: form.phone,
            city: form.city,
            skills: form.skills,
            availability: form.availability,
            message: form.message,
          }),
        },
      );

      alert("Volunteer registration submitted successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        skills: "",
        availability: "",
        message: "",
      });
    } catch (error) {
      alert("Error submitting volunteer form.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Become a Volunteer
        </h1>

        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-16">
          Join us in making a positive impact in our communities. Fill out the
          form below to volunteer with Indian Social Welfare Association.
        </p>

        {/* Volunteer Form */}

        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md">
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
                className="w-full border text-gray-700 rounded-md p-3"
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
                className="w-full border text-gray-700 rounded-md p-3"
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
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Skills / Expertise
              </label>

              <input
                type="text"
                name="skills"
                placeholder="Teaching, Medical, Event Management etc."
                value={form.skills}
                onChange={handleChange}
                className="w-full border text-gray-700 rounded-md p-3"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Availability
              </label>

              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                required
                className="w-full border text-gray-700 rounded-md p-3"
              >
                <option value="">Select Availability</option>
                <option value="Weekends">Weekends</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Full Time">Full Time</option>
                <option value="Event Based">Event Based</option>
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Message
              </label>

              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how you would like to contribute"
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
                {loading ? "Submitting..." : "Register as Volunteer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
