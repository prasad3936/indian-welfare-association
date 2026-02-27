"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function StickyDonate() {
  return (
    <Link
      href="/donate"
      className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-green-700 transition z-[1000] flex items-center gap-2 font-semibold"
    >
      <Heart size={20} />
      Donate Now
    </Link>
  );
}
