export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center">
          About indian social welfare Association
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          indian social welfare Association is a registered NGO dedicated to improving
          lives through education, healthcare, women empowerment, and rural
          development programs across India.
        </p>

        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Our mission is to empower underprivileged communities and create
          sustainable change across Maharashtra and beyond.
        </p>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            80G Certified NGO
          </h2>

          <p className="text-gray-700 mb-6">
            Donations are eligible for tax exemption under Section 80G of the
            Income Tax Act.
          </p>

          <a
            href="/80g-certificate.pdf"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Download 80G Certificate
          </a>
        </div>
      </div>
    </div>
  );
}
