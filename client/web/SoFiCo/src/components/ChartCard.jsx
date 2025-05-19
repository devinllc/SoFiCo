import React from 'react'

const ChartCard = () => {
  return (
    <div className="bg-[#0d474c] rounded-xl p-6 w-full max-w-xs text-white">
      <div className="mb-4">
        <div className="text-lg font-semibold">Saving Month</div>
        <div className="text-2xl font-bold">$1852,00</div>
        <div className="text-sm text-gray-200">
          Increase of <span className="font-bold text-white">12%</span> from last month
        </div>
      </div>
      {/* Chart */}
      <div className="w-full mt-4">
        <svg viewBox="0 0 220 100" className="w-full h-32">
          {/* Y axis lines */}
          <line x1="30" y1="20" x2="210" y2="20" stroke="#2e6f74" strokeWidth="1"/>
          <line x1="30" y1="50" x2="210" y2="50" stroke="#2e6f74" strokeWidth="1"/>
          <line x1="30" y1="80" x2="210" y2="80" stroke="#2e6f74" strokeWidth="1"/>
          {/* Bars */}
          <rect x="45" y="60" width="20" height="20" rx="4" fill="#e6f6f8"/>
          <rect x="80" y="50" width="20" height="30" rx="4" fill="#e6f6f8"/>
          <rect x="115" y="35" width="20" height="45" rx="4" fill="#e6f6f8"/>
          {/* Highlighted bar for June */}
          <rect x="150" y="20" width="20" height="60" rx="4" fill="#14e6c7"/>
          {/* Value bubble */}
          <rect x="140" y="5" width="44" height="22" rx="6" fill="#fff"/>
          <text x="162" y="20" textAnchor="middle" fill="#0d474c" fontSize="12" fontWeight="bold">$20,000</text>
          {/* X axis labels */}
          <text x="55" y="95" textAnchor="middle" fill="#fff" fontSize="12">April</text>
          <text x="90" y="95" textAnchor="middle" fill="#fff" fontSize="12">May</text>
          <text x="125" y="95" textAnchor="middle" fill="#fff" fontSize="12">June</text>
          <text x="160" y="95" textAnchor="middle" fill="#fff" fontSize="12">July</text>
        </svg>
      </div>
    </div>
  );
};

export default ChartCard