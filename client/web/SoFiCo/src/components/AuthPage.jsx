// AuthPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { type: "spring", duration: 0.7 } },
  exit: { opacity: 0, x: -60, transition: { type: "spring", duration: 0.5 } },
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#1a1d23]">
      <div className="bg-[#23272f] rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-white tracking-wide">SoFiCo</span>
        </div>
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-white text-2xl font-semibold mb-6">Login</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded bg-[#181c24] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-[#181c24] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold mt-2"
                >
                  Login
                </button>
              </form>
              <div className="text-gray-400 text-sm text-center mt-4">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-400 hover:underline transition"
                >
                  Sign up
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-white text-2xl font-semibold mb-6">Sign Up</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded bg-[#181c24] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded bg-[#181c24] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-[#181c24] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold mt-2"
                >
                  Sign Up
                </button>
              </form>
              <div className="text-gray-400 text-sm text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-400 hover:underline transition"
                >
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
