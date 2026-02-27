import events from "../../../data/events.json";
import Image from "next/image";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Event Not Found
          </h1>
        </div>
      </div>
    );
  }

  const shareUrl = `https://yourdomain.com/events/${event.slug}`;
  const shareText = `Check out this event by Indian Social Welfare Association: ${event.title}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {event.title}
        </h1>

        {/* Date + Venue */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-lg">
          <span className="text-green-600 font-medium">📅 {event.date}</span>
          <span className="text-gray-700">📍 {event.venue}</span>
        </div>

        {/* Status Badge */}
        {event.type === "upcoming" && (
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Upcoming Event
          </span>
        )}

        {event.type === "latest" && (
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            Completed Event
          </span>
        )}

        {/* Event Image */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px] mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          {event.description}
        </p>

        {/* Action Section */}
        <div className="bg-green-50 p-8 rounded-xl shadow-md mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {event.type === "upcoming"
              ? "Join This Upcoming Event"
              : "Support This Cause"}
          </h2>

          {event.type === "upcoming" ? (
            <a
              href="/contact"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Volunteer Now
            </a>
          ) : (
            <a
              href="/donate"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Donate Now
            </a>
          )}
        </div>

        {/* Social Share Section */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share This Event
          </h3>

          <div className="flex flex-wrap gap-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                shareText + " " + shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Facebook
            </a>

            {/* X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText,
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              X
            </a>
          </div>
        </div>

        {/* Back */}
        <a
          href="/events"
          className="inline-block mt-10 text-green-600 font-semibold hover:underline"
        >
          ← Back to Events
        </a>
      </div>
    </div>
  );
}