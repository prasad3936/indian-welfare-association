"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import translations from "@/data/translations.json";
import { Facebook, Instagram, Twitter, Menu, X, MessageCircle } from "lucide-react";
import EngagementPopup from "@/components/EngagementPopup";
import StickyDonate from "@/components/StickyDonate";

type Lang = "en" | "mr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang;
    if (savedLang) setLang(savedLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = translations[lang];

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`relative font-medium transition
        ${
          pathname === href
            ? "text-green-600"
            : "text-gray-700 hover:text-green-600"
        }
      `}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-green-600 transition-all duration-300
        ${pathname === href ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );

  return (
    <html lang={lang}>
      <body className="bg-white text-gray-800 antialiased min-h-screen flex flex-col">
        {/* ================= NAVBAR ================= */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
          } border-b border-gray-200`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="text-base md:text-xl font-bold text-green-700">
                {t.site.name}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLink("/", t.navbar.home)}
              {navLink("/about", t.navbar.about)}
              {navLink("/gallery", t.navbar.gallery)}
              {navLink("/events", t.navbar.events)}
              {navLink("/contact", t.navbar.contact)}

              <Link
                href="/donate"
                className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
              >
                {t.navbar.donate}
              </Link>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => switchLanguage("en")}
                  className={`text-sm ${
                    lang === "en" ? "text-green-600 font-semibold" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage("mr")}
                  className={`text-sm ${
                    lang === "mr" ? "text-green-600 font-semibold" : ""
                  }`}
                >
                  मराठी
                </button>
              </div>

              <div className="flex gap-4 ml-4 text-gray-700">
                <Facebook
                  size={18}
                  className="hover:text-green-600 transition cursor-pointer"
                />
                <Instagram
                  size={18}
                  className="hover:text-green-600 transition cursor-pointer"
                />
                <Twitter
                  size={18}
                  className="hover:text-green-600 transition cursor-pointer"
                />
              </div>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Slide Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-125" : "max-h-0"
            } bg-white border-t`}
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLink("/", t.navbar.home)}
              {navLink("/about", t.navbar.about)}
              {navLink("/gallery", t.navbar.gallery)}
              {navLink("/events", t.navbar.events)}
              {navLink("/contact", t.navbar.contact)}

              <Link
                href="/donate"
                className="bg-green-600 text-white text-center py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {t.navbar.donate}
              </Link>

              <div className="flex gap-4 pt-4">
                <button onClick={() => switchLanguage("en")}>EN</button>
                <button onClick={() => switchLanguage("mr")}>मराठी</button>
              </div>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 w-full">{children}</main>

        {/* ================= MOBILE DONATE BAR ================= 
        <div className="fixed bottom-20 md:bottom-6 right-6 md:hidden bg-green-600 text-white flex justify-center py-3 z-50">
          <Link href="/donate" className="font-semibold">
            {t.navbar.donate}
          </Link>
        </div>
        {/* ================= STICKY WHATSAPP ================= */}
        <a
          href="https://wa.me/918888888888"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition z-[999] flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </a>
        {/* ================= FOOTER ================= */}
        <footer className="bg-gray-900 text-white pt-16 w-full">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            {/* NGO Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Indian Social Welfare Association
              </h3>

              <p className="text-gray-300 leading-relaxed mb-4">
                Working towards education, healthcare and empowerment across
                India.
              </p>

              {/* Contact Info */}
              <p className="text-gray-300">
                📧{" "}
                <a
                  href="mailto:info@indianwelfareassociation.org"
                  className="hover:text-white transition"
                >
                  info@indianwelfareassociation.org
                </a>
              </p>

              <p className="text-gray-300">
                📞{" "}
                <a
                  href="tel:+919999999999"
                  className="hover:text-white transition"
                >
                  +91 9999999999
                </a>
              </p>

              <p className="text-gray-300 flex items-center gap-2">
                <MessageCircle size={18} />
                <a
                  href="https://wa.me/918888888888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  +91 8888888888
                </a>
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* 80G Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">80G Certified NGO</h3>
              <p className="text-gray-300">
                Donations are eligible for tax exemption under Section 80G of
                the Income Tax Act.
              </p>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              <p className="text-gray-300">
                Indian Social Welfare Association,
                <br />
                Narsi Namdeo, Hingoli,
                <br />
                Maharashtra, India
              </p>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-700 py-4">
            © {new Date().getFullYear()} Indian Social Welfare Association. All
            rights reserved.
            <br />
            Powered by{" "}
            <span className="text-gray-300 font-medium">ZP Global Systems</span>
          </div>
        </footer>

        <EngagementPopup />
        <StickyDonate />
      </body>
    </html>
  );
}
