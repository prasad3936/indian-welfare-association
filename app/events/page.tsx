import Link from "next/link";
import Image from "next/image";
import events from "../../data/events.json";

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Our Events
        </h1>

        {/* Event Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-green-600 font-medium mb-2">
                  {event.date}
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed">
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
