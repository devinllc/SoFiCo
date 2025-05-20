import React, { useState } from 'react';
import logo from '../assets/image.png';
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Nav links for reuse
  const navLinks = (
    <>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `relative px-3 py-1 rounded-full font-medium transition-all duration-200
          ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
        }
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `relative px-3 py-1 rounded-full font-medium transition-all duration-200
          ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
        }
        onClick={() => setMenuOpen(false)}
      >
        About
      </NavLink>
      <NavLink
        to="/featured"
        className={({ isActive }) =>
          `relative px-3 py-1 rounded-full font-medium transition-all duration-200
          ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
        }
        onClick={() => setMenuOpen(false)}
      >
        Featured
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          `relative px-3 py-1 rounded-full font-medium transition-all duration-200
          ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
        }
        onClick={() => setMenuOpen(false)}
      >
        Services
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `ml-0 mt-4 px-5 py-2 rounded-full border border-white/40 font-semibold text-white transition-all duration-200
          bg-gradient-to-r from-green-400/90 to-green-500/80 shadow-md hover:from-green-300 hover:to-green-400 hover:text-[#0a3d4d]
          ${isActive ? "ring-2 ring-green-400" : ""}`
        }
        onClick={() => setMenuOpen(false)}
      >
        Sign In
      </NavLink>
    </>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full flex justify-center items-center pt-8 pb-4 bg-transparent relative z-20">
        <div className="hidden sm:flex backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-full items-center px-6 py-2 gap-6"
          style={{
            minWidth: 320,
            minHeight: 60,
            boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)'
          }}
        >
          {/* Logo */}
          <div className="flex items-center pr-4 border-r border-white/20">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          {/* Nav Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-full font-medium transition-all duration-200
                ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-full font-medium transition-all duration-200
                ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/featured"
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-full font-medium transition-all duration-200
                ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
              }
            >
              Featured
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-full font-medium transition-all duration-200
                ${isActive ? "bg-white/80 text-[#0a3d4d] shadow" : "text-white hover:bg-white/20 hover:text-[#d6ff4b]"}`
              }
            >
              Services
            </NavLink>
          </div>
          {/* Sign In Button */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `ml-4 px-5 py-2 rounded-full border border-white/40 font-semibold text-white transition-all duration-200
              bg-gradient-to-r from-green-400/90 to-green-500/80 shadow-md hover:from-green-300 hover:to-green-400 hover:text-[#0a3d4d]
              ${isActive ? "ring-2 ring-green-400" : ""}`
            }
          >
            Sign In
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex w-full items-center justify-between px-4">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <button
            className="z-40 flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-lg"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300 my-1"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
          </button>
        </div>

        {/* Mobile Left Drawer Overlay */}
        <div
          className={`fixed inset-0 z-50 transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden`}
        >
          {/* Overlay background */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
              menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>
          {/* Slide-in Menu */}
          <div
            className={`relative h-full w-4/5 max-w-xs bg-[#151b23] shadow-2xl flex flex-col pt-8 pb-10 px-4 transition-transform duration-500 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Cross Icon */}
            <button
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Nav Links */}
            <div className="flex flex-col gap-2 mt-10">{navLinks}</div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div className="pt-20">About Page</div>} />
        <Route path="/featured" element={<div className="pt-20">Featured Page</div>} />
        <Route path="/services" element={<div className="pt-20">Services Page</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
