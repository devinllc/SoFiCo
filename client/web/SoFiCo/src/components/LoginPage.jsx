import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 w-full bg-[#0084ff] flex flex-col justify-between py-8 px-8">
        {/* Logo */}
        {/* Illustration */}
        <div className="flex flex-1 items-center justify-center">
          {/* SVG illustration (replace with your own if needed) */}
          <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <ellipse cx="95" cy="74" rx="6" ry="10" fill="#22223b" />
          </svg>
        </div>
        <div /> {/* To push illustration to center vertically */}
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center py-12 px-6 bg-white">
        <div className="w-full max-w-md">
          {/* Back */}
          <button onClick={()=> navigate(-1)} className="cursor-pointer flex items-center text-gray-500 mb-8 hover:text-blue-600">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Login</h2>
          <p className="text-gray-500 mb-6 text-sm">
            If you are already a member you can login with your email address and password.
          </p>
          {/* Form */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 accent-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0084ff] hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Register Account
            </button>
          </form>
          {/* Sign up link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Dont have an account ?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
