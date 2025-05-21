import React, { useState } from "react";

const socialIcons = [
  {
    name: "Facebook",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.877v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17 22 12" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22.46 5.924c-.793.352-1.645.59-2.541.698a4.48 4.48 0 001.963-2.475 8.959 8.959 0 01-2.828 1.082 4.482 4.482 0 00-7.638 4.086C7.691 9.09 4.066 7.13 1.64 3.95c-.486.83-.764 1.797-.764 2.825 0 1.95.994 3.672 2.505 4.68-.924-.03-1.793-.283-2.553-.705v.07c0 2.724 1.94 4.997 4.516 5.51-.473.128-.972.197-1.486.197-.364 0-.717-.035-1.062-.1.718 2.238 2.8 3.87 5.267 3.915A8.97 8.97 0 012 19.54a12.66 12.66 0 006.29 1.84c7.547 0 11.675-6.155 11.675-11.495 0-.175-.004-.349-.012-.522A8.18 8.18 0 0024 4.59a8.6 8.6 0 01-2.54.697z" />
      </svg>
    ),
  },
  {
    name: "Google",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M21.805 10.023h-9.18v3.956h5.269c-.226 1.206-1.363 3.54-5.269 3.54-3.17 0-5.753-2.628-5.753-5.862s2.583-5.862 5.753-5.862c1.805 0 3.017.77 3.713 1.436l2.54-2.47C17.13 4.183 15.18 3.2 12.625 3.2 7.662 3.2 3.6 7.262 3.6 12.225c0 4.963 4.062 9.025 9.025 9.025 5.19 0 8.6-3.634 8.6-8.75 0-.59-.067-1.037-.15-1.477z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.75 1.75-1.75s1.75.78 1.75 1.75c0 .97-.784 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.98 3.56 4.56v4.77z" />
      </svg>
    ),
  },
];

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e2d3c] to-[#116466]">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 text-white px-8 py-12 relative">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">New here ?</h2>
            <p className="mb-6 text-base md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br /> Debitis, ex ratione. Aliquid!
            </p>
            <button
              onClick={() => setShowRegister(true)}
              className="border-2 border-white rounded-full px-8 py-2 font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              SIGN UP
            </button>
          </div>
          {/* Illustration */}
          <img
            src="https://undraw.co/api/illustrations/rocket.svg"
            alt="Rocket Illustration"
            className="w-40 md:w-48 mx-auto mt-12 mb-0"
            style={{ minHeight: 120 }}
          />
          <img
            src="https://undraw.co/api/illustrations/businessman.svg"
            alt="Person Illustration"
            className="w-24 md:w-28 absolute bottom-6 left-1/2 transform -translate-x-1/2"
            style={{ minHeight: 80 }}
          />
        </div>
        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12">
          {!showRegister ? (
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign in</h2>
              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
                >
                  LOGIN
                </button>
              </form>
              <div className="mt-6 mb-2 text-center text-gray-600 font-medium">Or Sign in with social platforms</div>
              <div className="flex justify-center gap-4 mt-2">
                {socialIcons.map((icon) => (
                  <button
                    key={icon.name}
                    className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-blue-50 transition"
                    aria-label={icon.name}
                  >
                    {icon.svg}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <RegisterForm onBack={() => setShowRegister(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

// RegisterForm component
function RegisterForm({ onBack }) {
  return (
    <div className="w-full max-w-sm animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign up</h2>
      <form className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
        >
          SIGN UP
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-blue-500 hover:underline font-medium transition"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}
