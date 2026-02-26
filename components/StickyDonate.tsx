"use client";

export default function StickyDonate() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-green-700 text-white z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm md:text-base font-medium">
          Support education, healthcare & empowerment initiatives across India.
        </p>

        <a
          href="/donate"
          className="mt-2 md:mt-0 bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}
