"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import CountUp from "react-countup";


import "swiper/css";
import "swiper/css/navigation";

import events from "../data/events.json";
import translations from "../data/translations.json";

export default function Home() {
  const [lang, setLang] = useState<"en" | "mr">("en");
  const t = translations[lang];

  const carouselImages = [
  "/gallery/health.png",
  "/gallery/edu.png",
  "/gallery/women.png",
  "/gallery/crowd.png",
  "/gallery/plantation.png",
];

  const latestEvents = events.filter((e) => e.type === "latest");
  const upcomingEvents = events.filter((e) => e.type === "upcoming");

  return (
    <div>
      {/* ================= HEADER ================= */}
      <section className="relative h-[75vh] w-full">
        {/* Language Toggle */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 mr-2 rounded ${
              lang === "en" ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("mr")}
            className={`px-3 py-1 rounded ${
              lang === "mr" ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            मराठी
          </button>
        </div>

        <Image
          src="/header.png"
          alt="NGO Work"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
              {t.hero}
            </h1>

            <a
              href="/donate"
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700"
            >
              {t.donate}
            </a>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white shadow-md p-8 rounded-xl border border-gray-100">
              <h3 className="text-4xl font-bold text-green-600 mb-2">500+</h3>
              <p className="text-gray-700 font-medium">Children Educated</p>
            </div>

            <div className="bg-white shadow-md p-8 rounded-xl border border-gray-100">
              <h3 className="text-4xl font-bold text-green-600 mb-2">120+</h3>
              <p className="text-gray-700 font-medium">Health Camps</p>
            </div>

            <div className="bg-white shadow-md p-8 rounded-xl border border-gray-100">
              <h3 className="text-4xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-700 font-medium">Villages Reached</p>
            </div>

            <div className="bg-white shadow-md p-8 rounded-xl border border-gray-100">
              <h3 className="text-4xl font-bold text-green-600 mb-2">1000+</h3>
              <p className="text-gray-700 font-medium">Volunteers</p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FOUNDER SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Founder Image */}
          <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/founder.png"
              alt="Founder"
              fill
              className="object-cover"
            />
          </div>

          {/* Founder Message */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
              {t.founderTitle}
            </h2>

            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              {t.founderMessage1}
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              {t.founderMessage2}
            </p>

            <p className="mt-6 font-semibold text-green-700">— Founder Name</p>
          </div>
        </div>
      </motion.section>
      {/* ================= CAROUSEL ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
            Our Work & Events
          </h2>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {carouselImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img}
                    alt="Work Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* ================= LATEST EVENTS ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">
            {t.latest}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {latestEvents.map((event) => (
              <a
                key={event.slug}
                href={`/events/${event.slug}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative h-56">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="text-sm text-green-600 mb-2">{event.date}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">
            {t.upcoming}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <a
                key={event.slug}
                href={`/events/${event.slug}`}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <p className="text-sm text-green-600 font-medium mb-2">
                  {event.date}
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {event.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-green-700 text-white py-16 text-center mb-0">
        <h2 className="text-3xl font-bold mb-6">Be a Part of the Change</h2>
        <a
          href="/donate"
          className="bg-white text-green-700 px-8 py-3 rounded hover:bg-gray-100"
        >
          Donate Now
        </a>
      </section>
    </div>
  );
}
