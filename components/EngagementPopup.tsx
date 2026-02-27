"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EngagementPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2000] px-6"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Make a Difference Today
            </h2>

            <p className="mb-6 text-gray-600">
              You can support our mission by volunteering or donating.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="/donate"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Donate Now
              </a>

              <a
                href="/contact"
                className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
              >
                Volunteer With Us
              </a>
            </div>

            <button
              onClick={() => setShow(false)}
              className="mt-6 text-sm text-gray-500 underline"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
