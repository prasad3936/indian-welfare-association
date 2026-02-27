import Link from "next/link";
import Image from "next/image";
import events from "../../data/events.json";

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-16">
          Our Events
        </h1>

        {/* Event Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-56">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <p className="text-sm text-green-600 font-medium mb-1">
                  📅 {event.date}
                </p>

                {/* Venue */}
                <p className="text-sm text-gray-600 mb-2">📍 {event.venue}</p>

                {/* Badge */}
                {event.type === "upcoming" && (
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    Upcoming Event
                  </span>
                )}

                {event.type === "latest" && (
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    Completed
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
