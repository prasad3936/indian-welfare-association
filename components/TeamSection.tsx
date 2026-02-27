"use client";

import Image from "next/image";
import team from "@/data/team.json";

export default function TeamSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Leadership Team
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Dedicated individuals driving change and building a better future
            for communities across Maharashtra.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition p-6 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-green-600 text-sm font-medium mt-1">
                {member.role}
              </p>

              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}