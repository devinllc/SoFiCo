import react from 'react'
import heroImage from '../assets/hero.png';
import { MdArrowOutward } from "react-icons/md";

export default function Hero() {
    return (
      <section className="flex flex-col md:flex-row items-center justify-center gap-60 bg-gradient-to-br from-[#0e2d3c] to-[#116466] min-h-[85vh]">
        <div className="max-w-xl">
          <span className="bg-gray-800 text-xs rounded-full px-3 py-1 mb-4 inline-block text-green-300 font-semibold">🔥 100% TRUSTED PLATFORM</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            FINANCE WITH<br />
            FRIENDS, INVEST<br />
            <span className="text-lime-400">WITH INTENSION</span>
          </h1>
          <p className="text-gray-200 mb-8">
            No-Fee Checking Account With Cash Back Rewards.<br />
            Enjoy Fee-Free Banking And Earn Cash Back On Your Everyday Purchases.
          </p>
          <button className="bg-green-400 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-green-300 transition">
            GET STARTED <span className="material-icons text-lg"><MdArrowOutward /></span>
          </button>
        </div>
        <div className="mt-12 md:mt-0 relative">
          {/* Replace with your image */}
          <img src={heroImage} alt="App Screenshot" className="w-80 drop-shadow-2xl" />
        </div>
      </section>
    );
  }
  