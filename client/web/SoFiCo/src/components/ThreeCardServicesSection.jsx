import React from "react";

const ThreeCardServicesSection = () => {
  return (
    <section className="w-full py-10 bg-white flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Card 1 */}
        <div className="rounded-2xl bg-lime-100 p-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">100% Dedication</h3>
            <p className="text-lime-700 text-sm font-medium">
              We Offer A Comprehensive Range Of Innovative Financial Services Tailored To Meet Your Needs.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="rounded-2xl bg-white p-8 flex flex-col justify-between min-h-[220px] border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            {/* Pin Icon (Red Dot) */}
            <span className="inline-block w-3 h-3 bg-red-400 rounded-full"></span>
          </div>
          <div className="flex items-center mb-3">
            <span className="bg-green-400 text-white rounded-full w-7 h-7 flex items-center justify-center mr-2 text-lg font-bold">$</span>
            <span className="text-xl font-bold text-black">Hold Money In<br />30+ Currencies</span>
          </div>
          {/* Mini-graphic placeholder */}
          <div className="mt-4">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
              alt="Transaction History"
              className="rounded-lg w-32 h-16 object-cover"
            />
          </div>
        </div>
        {/* Card 3 */}
        <div className="rounded-2xl bg-teal-600 p-8 flex items-center justify-center min-h-[220px]">
          <span className="text-white text-2xl font-semibold text-center">
            Visit Our<br />Services Page
          </span>
        </div>
      </div>
      {/* View More Button */}
      <div className="mt-8">
        <button className="flex items-center px-8 py-3 bg-white border-2 border-green-500 rounded-full shadow font-semibold text-black hover:bg-green-500 hover:text-white transition">
          View More
          <span className="ml-2 bg-green-500 text-white rounded-full p-1">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default ThreeCardServicesSection;
