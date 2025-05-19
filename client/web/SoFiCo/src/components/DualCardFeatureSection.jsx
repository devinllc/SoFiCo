import React from "react";

const DualCardFeatureSection = () => {
  return (
    <section className="w-full py-12 bg-[#f7f7f8] flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Left Card */}
        <div className="bg-white rounded-3xl shadow p-8 flex flex-col">
          {/* Icon */}
          <div className="w-10 h-10 bg-[#e8f8ec] flex items-center justify-center rounded-full mb-4">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#1bbf00"/>
              <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Heading */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Create A Card That Is Unique And Customized
          </h3>
          {/* Description */}
          <p className="text-gray-500 mb-6">
            We offer a comprehensive range of innovative financial services tailored to meet your needs. Our services include high-yield savings accounts.
          </p>
          {/* Custom Card/Graph */}
          <div className="bg-[#f7fafc] rounded-2xl p-4 flex flex-col items-start">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="font-semibold text-gray-800">WELCOME, <span className="font-bold">TOM !</span></span>
              <span className="text-red-500 text-lg">🔔</span>
            </div>
            {/* Graph */}
            <div className="w-full h-32 bg-[#0b3e3b] rounded-xl flex items-end justify-center mt-2 p-2">
              {/* Simple SVG Line Chart */}
              <svg viewBox="0 0 180 70" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  points="0,60 20,40 40,50 60,20 80,30 100,10 120,25 140,35 160,25 180,40"
                />
                <circle cx="160" cy="25" r="8" fill="#8fff00" />
                <text x="150" y="20" fill="#8fff00" fontSize="12" fontWeight="bold">$409</text>
              </svg>
            </div>
            {/* Timeline */}
            <div className="flex justify-between w-full text-xs text-gray-400 mt-2">
              <span>10D</span>
              <span>5D</span>
              <span>1M</span>
              <span>3M</span>
              <span>6M</span>
              <span>1Y</span>
            </div>
          </div>
        </div>
        {/* Right Card */}
        <div className="bg-[#09182a] rounded-3xl shadow p-8 flex flex-col">
          {/* Icon */}
          <div className="w-10 h-10 bg-[#0e2e1c] flex items-center justify-center rounded-full mb-4">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#1bbf00"/>
              <path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Heading */}
          <h3 className="text-2xl font-bold text-white mb-2">
            Personalized Insights And Financial Goals
          </h3>
          {/* Description */}
          <p className="text-gray-300 mb-6">
            Savings accounts that offer competitive interest rates and flexible deposit options. Invest wisely with our personalized services including high-yield savings.
          </p>
          {/* Custom Card/Stats */}
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">WELCOME, <span className="font-bold">TOM !</span></span>
              <span className="text-red-500 text-lg">🔔</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {/* Balance */}
              <div className="bg-[#f7fafc] rounded-xl p-4 flex flex-col min-w-[120px]">
                <span className="text-xs text-gray-400 mb-1">BALANCE</span>
                <span className="text-xl font-bold text-gray-900">$13,553.00</span>
                <span className="text-xs text-green-600 font-semibold mt-1">+8.50%</span>
                <span className="text-xs text-gray-500">Token Bonus</span>
              </div>
              {/* Total Balance */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col min-w-[120px]">
                <span className="text-xs text-gray-400 mb-1">Total balance</span>
                <span className="text-lg font-bold text-gray-900">$9,647.00</span>
                <span className="text-xs text-green-600 mt-1 flex items-center">
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" className="mr-1"><circle cx="12" cy="12" r="10" fill="#1bbf00"/></svg>
                  Add Number
                </span>
              </div>
            </div>
            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Progress */}
              <div className="bg-[#e8f8ec] rounded-xl p-4 flex flex-col items-center min-w-[90px]">
                <span className="font-bold text-lg text-[#1bbf00]">31%</span>
                <span className="text-xs text-gray-500">Progress</span>
              </div>
              {/* Bonus */}
              <div className="bg-[#f5fbdc] rounded-xl p-4 flex flex-col items-center min-w-[90px]">
                <span className="font-bold text-lg text-[#b3c400]">$22.42</span>
                <span className="text-xs text-gray-500">Bonus received</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCardFeatureSection;
