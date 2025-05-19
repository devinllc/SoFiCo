import React from 'react'

const AboutContent = () => (
  <div className="flex flex-col gap-4">
    {/* Tag */}
    <div className="flex items-center gap-2">
      <span className="bg-[#f3f4f6] px-3 py-1 rounded-full text-xs font-semibold flex items-center">
        <span className="text-yellow-500 text-lg mr-1">🔥</span> ABOUT US
      </span>
    </div>
    {/* Heading */}
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-2 mb-4">
      ALL YOUR MONEY <br /> NEEDS IN ONE APP
    </h2>
    {/* Features List */}
    <div className="flex flex-col gap-4 mt-2">
      {/* Expenses Tracker */}
      <div className="bg-[#ebf9e5] border-l-4 border-[#1bbf00] rounded-xl p-4">
        <div className="font-bold text-lg mb-1">Group Saving Pools</div>
        <div className="text-gray-700 text-sm">
          Save together seamlessly for shared financial goals.
        </div>
      </div>
      {/* Crypto Connection */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="font-bold text-lg mb-1 text-gray-900">Peer-to-Peer Loans
</div>
        <div className="text-gray-700 text-sm">
          Trust-based micro-lending among verified users.
        </div>
      </div>
      {/* Automated Invoicing */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="font-bold text-lg mb-1 text-gray-900">Social Investing</div>
        <div className="text-gray-700 text-sm">
          Invest with friends in ethical portfolios.
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="font-bold text-lg mb-1 text-gray-900">Accountability Circles
</div>
        <div className="text-gray-700 text-sm">
          Gamified progress tracking with social nudges.
        </div>
      </div>


    </div>
  </div>
);

export default AboutContent