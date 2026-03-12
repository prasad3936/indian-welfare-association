"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
            type: "contact",
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
          }),
        },
      );

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Error sending message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          {/* ================= CONTACT INFO ================= */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                contact@indiansocialwelfare.com
              </p>

              <p>
                <span className="font-semibold">Phone:</span> +91 9665802090
              </p>

              <p>
                <span className="font-semibold">Address:</span>
                Pune, Maharashtra, India
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="mt-10 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1816.1938243781167!2d77.02027243559705!3d19.754190923442916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd050a9a3bc3921%3A0xfbb244caae231a71!2sNarsi%20Namdev%2C%20Maharashtra%20431513!5e1!3m2!1sen!2sin!4v1772117417501!5m2!1sen!2sin"
                width="100%"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* ================= CONTACT FORM ================= */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
