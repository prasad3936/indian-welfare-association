export default function ContactPage() {
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
                <span className="font-semibold">Email:</span> info@iwa.org
              </p>

              <p>
                <span className="font-semibold">Phone:</span> +91 9876543210
              </p>

              <p>
                <span className="font-semibold">Address:</span>
                Pune, Maharashtra, India
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="mt-10 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=Pune,Maharashtra&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>

          {/* ================= CONTACT FORM ================= */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="space-y-6"
            >
              
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
