import React from "react";

function About() {
  return (
    <section id="#about" className="w-full py-8 bg-white flex flex-col items-center min-h-screen">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 gap-6">
        {/* Left: Content */}
        <div className="w-full md:w-1/2">
          {/* Badge */}
          <div className="flex items-center mb-3">
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="text-yellow-500 text-lg mr-1">🔥</span>
              ABOUT
            </span>
          </div>
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Empowering Communities.<br className="hidden md:block" /> Simplifying Finance.
          </h2>
          {/* List */}
          <ul className="mb-6 space-y-2 text-gray-600 text-base">
            <li>• One-stop platform for users, agents, and admins.</li>
            <li>• Seamless onboarding and real-time notifications.</li>
            <li>• Earn up to 3% cashback on purchases.</li>
            <li>• Secure dashboards with instant approvals.</li>
            <li>• Scalable microservices architecture.</li>
          </ul>
          {/* Button */}
          <a
            href="#"
            className="inline-flex items-center px-5 py-2.5 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition text-sm"
          >
            Get Started
            <span className="ml-2 bg-white bg-opacity-20 rounded-full p-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
          <div className="bg-[#f6fcfb] rounded-2xl p-3 md:p-6 flex gap-3">
            {/* Mobile 1 */}
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
              alt="App Screenshot 1"
              className="w-24 h-48 object-cover rounded-xl shadow-lg"
            />
            {/* Mobile 2 */}
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80"
              alt="App Screenshot 2"
              className="w-24 h-48 object-cover rounded-xl shadow-lg hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
