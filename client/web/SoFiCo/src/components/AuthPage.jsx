import React, { useState } from "react";

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Add your login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", registerData);
    // Add your register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e2d3c] to-[#116466] p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-500 hover:scale-[1.02]">
        {/* Left Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 text-white px-8 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">
              {showRegister ? "Join Our Community" : "Welcome Back!"}
            </h2>
            <p className="mb-8 text-lg opacity-90">
              {showRegister 
                ? "Start your journey with us and discover amazing opportunities."
                : "Sign in to continue your journey with us."}
            </p>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="border-2 border-white rounded-full px-8 py-3 font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {showRegister ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent"></div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 bg-white">
          <div className={`w-full max-w-sm transition-all duration-500 transform ${showRegister ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'}`}>
            {!showRegister ? (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign in</h2>
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    SIGN IN
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                    Forgot your password?
                  </a>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Account</h2>
                <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={registerData.lastName}
                      onChange={handleRegisterChange}
                      className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 font-medium transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    CREATE ACCOUNT
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
