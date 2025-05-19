import React from 'react'

export default function Navbar() {
    return (
      <nav className="flex justify-between items-center py-6 px-8 bg-transparent">
        <div className="text-2xl font-bold text-green-400">Upgrade</div>
        <ul className="flex space-x-8 text-white font-medium">
          <li>Personal Loan</li>
          <li>One Card</li>
          <li>Savings</li>
          <li>Checking</li>
          <li>Help</li>
        </ul>
        <button className="border border-white rounded-lg px-6 py-2 text-white hover:bg-green-400 hover:text-gray-900 transition">Sign In</button>
      </nav>
    );
}
  