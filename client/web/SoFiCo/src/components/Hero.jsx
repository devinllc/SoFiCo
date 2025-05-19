import react from 'react'

export default function Hero() {
    return (
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-br from-[#0e2d3c] to-[#116466] min-h-[80vh]">
        <div className="max-w-xl">
          <span className="bg-gray-800 text-xs rounded-full px-3 py-1 mb-4 inline-block text-green-300 font-semibold">🔥 100% TRUSTED PLATFORM</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            FINANCE WITH<br />
            SECURITY AND<br />
            <span className="text-lime-400">FLEXIBILITY</span>
          </h1>
          <p className="text-gray-200 mb-8">
            No-Fee Checking Account With Cash Back Rewards.<br />
            Enjoy Fee-Free Banking And Earn Cash Back On Your Everyday Purchases.
          </p>
          <button className="bg-green-400 text-gray-900 font-semibold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-green-300 transition">
            Open Account <span className="material-icons">arrow_forward</span>
          </button>
        </div>
        <div className="mt-12 md:mt-0 relative">
          {/* Replace with your image */}
          <img src="https://www.pymnts.com/wp-content/uploads/2020/11/VisaCommercialPayVisual.png18.png" alt="App Screenshot" className="w-72 drop-shadow-2xl" />
          <img src="https://www.upgrade.com/img/cards/upgrade-card-large.png" alt="Upgrade Card" className="absolute -bottom-8 left-10 w-40 rotate-[-15deg] drop-shadow-xl" />
        </div>
      </section>
    );
  }
  