import React from "react";

const TrustworthinessSection = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#0c223a] via-[#0d2a3e] to-[#0c223a] flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-4 gap-10">
        {/* Left: Phone + Card Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Phone Image */}
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=320&q=80"
            alt="Phone"
            className="w-60 md:w-72 rounded-xl shadow-2xl"
          />
          {/* Card Image - Overlapping */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=320&q=80"
            alt="Card"
            className="w-44 absolute left-16 bottom-[-30px] md:left-24 md:bottom-[-40px] rounded-xl shadow-xl"
            style={{ zIndex: 2 }}
          />
        </div>
        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          {/* Badge */}
          <span className="flex items-center bg-[#163d5e] text-green-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <span className="text-yellow-400 text-lg mr-1">▲</span>
            TRUSTWORTHINESS
          </span>
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            WE VALUE YOUR TRUST <br /> AND SECURITY
          </h2>
          {/* Subheading */}
          <p className="text-gray-200 text-base md:text-lg mb-8 max-w-lg">
            Our Mission Is To Make Finance More Accessible, Transparent, And Secure For Everyone. With Cutting.
          </p>
          {/* Button */}
          <a
            href="#"
            className="inline-flex items-center px-7 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition"
          >
            Get Started
            <span className="ml-2 bg-white bg-opacity-20 rounded-full p-1">
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustworthinessSection;
