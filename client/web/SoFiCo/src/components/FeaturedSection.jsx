import React from "react";

function FeaturedSection(){
  return (
    <section className="w-full py-12 bg-white flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 gap-10">
        {/* Left: Content */}
        <div className="w-full md:w-1/2">
          {/* Badge */}
          <div className="flex items-center mb-4">
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="text-yellow-500 text-lg mr-1">▲</span>
              FEATURED
            </span>
          </div>
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            ALL THE FEATURES <br className="hidden md:block" /> IN ONE APP
          </h2>
          {/* List */}
          <ul className="mb-8 space-y-2 text-gray-600 text-base">
            <li>
              • Get 3% Cash Back On Everyday Purchases, 2% On Everything Else
            </li>
            <li>
              • Extra Spending Power When You Have Rewards Checking Through Upgrade
            </li>
          </ul>
          {/* Button */}
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition"
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
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-[#f6fcfb] rounded-2xl p-4 md:p-8 flex gap-4">
            {/* Mobile 1 */}
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
              alt="App Screenshot 1"
              className="w-40 h-80 object-cover rounded-xl shadow-lg"
            />
            {/* Mobile 2 */}
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
              alt="App Screenshot 2"
              className="w-40 h-80 object-cover rounded-xl shadow-lg hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
