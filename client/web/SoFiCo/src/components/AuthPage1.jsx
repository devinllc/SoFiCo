import React, { useState } from "react";
import axios from "axios";

export default function AuthPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://so-fi-co.vercel.app/auth/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Login successful:", response.data);
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = { firstName, lastName, email, password, phone };
      console.log(newUser);
      const response = await axios.post(
        "https://scftest-inky.vercel.app/user/create",
        newUser,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      setShowRegister(false); // Switch to login view
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#0e2d3c] to-[#116466] p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 text-white px-8 py-12 relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{showRegister ? "Join Our Community" : "Welcome Back!"}</h2>
            <p className="mb-8">{showRegister ? "Start your journey with us." : "Sign in to continue."}</p>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="border-2 border-white rounded-full px-8 py-3 font-semibold hover:bg-white hover:text-blue-600"
            >
              {showRegister ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 bg-white">
          <div className={`w-full max-w-sm`}>
            {!showRegister ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign in</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "SIGN IN"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h2>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-full bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "CREATE ACCOUNT"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
