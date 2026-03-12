"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const imagesPerPage = 12;

  useEffect(() => {
    fetch("/gallery.json")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Gallery load error:", err));
  }, []);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const start = (page - 1) * imagesPerPage;
  const currentImages = images.slice(start, start + imagesPerPage);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Gallery
        </h1>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentImages.map((img, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={`/gallery/${img}`}
                alt="Gallery Image"
                className="w-full h-64 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
