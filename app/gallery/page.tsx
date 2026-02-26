import Image from "next/image";

export default function Gallery() {
  const images = [
    "/gallery/women.png",
    "/gallery/edu.png",
    "/gallery/crowd.png",
    "/gallery/plantation.png",
    "/gallery/health.png",
    "/gallery/image.png",
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Our Work in Action
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-72 rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
