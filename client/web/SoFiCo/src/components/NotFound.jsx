import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-[#0e2d3c] to-[#116466] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-9xl font-extrabold mb-6 select-none">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg md:text-xl mb-8 max-w-md text-center text-gray-300">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-yellow-500 hover:bg-yellow-600 transition rounded px-6 py-3 font-semibold text-[#0e2d3c]"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
