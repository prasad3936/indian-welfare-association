import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import EngagementPopup from "@/components/EngagementPopup";
import StickyDonate from "@/components/StickyDonate";

export const metadata: Metadata = {
  title: {
    default: "Indian Welfare Association",
    template: "%s | Indian Welfare Association",
  },
  description:
    "Indian Welfare Association is dedicated to education, healthcare, women empowerment and rural development across India.",
  keywords: [
    "NGO in India",
    "Charity",
    "Donate India",
    "Education NGO",
    "80G NGO",
  ],
  openGraph: {
    title: "Indian Welfare Association",
    description:
      "Join us in building a better future through education and empowerment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 antialiased">
        {/* ================= NAVBAR ================= */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-green-700">
              Indian Welfare Association
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 font-medium hover:text-green-600 transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 font-medium hover:text-green-600 transition"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 font-medium hover:text-green-600 transition"
              >
                Gallery
              </Link>
              <Link
                href="/events"
                className="text-gray-700 font-medium hover:text-green-600 transition"
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 font-medium hover:text-green-600 transition"
              >
                Contact
              </Link>
              <Link
                href="/donate"
                className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition"
              >
                Donate
              </Link>
            </nav>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="min-h-screen">{children}</main>

        {/* ================= WHATSAPP FLOAT ================= */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition z-50"
        >
          WhatsApp
        </a>

        {/* ================= FOOTER ================= */}
        <footer className="bg-gray-900 text-white mt-0 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold text-lg text-white mb-4">
                Indian Welfare Association
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Working towards education, healthcare and empowerment across
                India.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-white mb-4">
                80G Certified NGO
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Donations are eligible for tax exemption under Section 80G of
                the Income Tax Act.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-white mb-4">
                Address
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                Indian Welfare Association,Narsi Namdeo,Hingoli, Maharashtra, India
              </p>
              <p className="text-gray-300">Email-id: info@indianwelfareassociation.org</p>
              <p className="text-gray-300">Phone: +9999999999</p>
              <p className="text-gray-300">Whatsapp: +918888888888</p>
            </div>
          </div>

          <div className="text-center py-6 border-t border-gray-200 text-gray-600">
            © {new Date().getFullYear()} Indian Welfare Association. All rights
            reserved.Powered by{"ZP Global Systems"}
          </div>
        </footer>

        {/* ================= GLOBAL COMPONENTS ================= */}
        <EngagementPopup />
        <StickyDonate />
      </body>
    </html>
  );
}
