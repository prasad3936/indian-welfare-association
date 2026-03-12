"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const imagesPerPage = 12;

  /* =============================
     FETCH GALLERY
  ============================= */

  const fetchGallery = async () => {
    const res = await fetch("/gallery.json", { cache: "no-store" });
    const data = await res.json();

    setImages(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* =============================
     UPLOAD IMAGE
  ============================= */

  const uploadImage = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      alert("Image uploaded");
      setFile(null);
      fetchGallery();
    }

    setLoading(false);
  };

  /* =============================
     DELETE IMAGE
  ============================= */

  const deleteImage = async (name: string) => {
    if (!confirm("Delete this image?")) return;

    await fetch("/api/gallery/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    fetchGallery();
  };

  /* =============================
     PAGINATION
  ============================= */

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const start = (page - 1) * imagesPerPage;
  const currentImages = images.slice(start, start + imagesPerPage);

  return (
    <AdminGuard>
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-3xl text-gray-800 font-bold mb-10">Gallery Manager</h1>

          {/* Upload Section */}

          <div className="bg-gray-50 border p-6 rounded-lg mb-10">
            <div className="flex gap-4 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border text-gray-700 p-2 rounded"
              />

              <button
                onClick={uploadImage}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Gallery Grid */}

          <div className="grid md:grid-cols-4 gap-6">
            {currentImages.map((img, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={`/gallery/${img}`}
                  className="w-full h-40 object-cover"
                />

                <div className="flex justify-between p-3 text-sm">
                  <a
                    href={`/gallery/${img}`}
                    download
                    className="text-blue-600"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => deleteImage(img)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded border ${
                  page === i + 1 ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
