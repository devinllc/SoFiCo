import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#0e2d3c] to-[#116466]">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6"></div>
        <span className="text-xl font-semibold text-white tracking-wide">Loading...</span>
      </div>
    </div>
  );
}
