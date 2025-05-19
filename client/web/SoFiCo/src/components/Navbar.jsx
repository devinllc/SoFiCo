import React from 'react'
import logo from '../assets/image.png';


export default function Navbar() {
    return (
      <nav className="flex justify-between items-center py-6 px-8 bg-transparent">
        <div className="w-25 h-8"><img src={logo} className='object-fit object-contain' /></div>
        <ul className="flex space-x-8 text-white font-medium">
          <li>Home</li>
          <li>About</li>
          <li>Featured</li>
          <li>Services</li>
        </ul>
        <button className="border border-white rounded-lg px-6 py-2 text-white hover:bg-green-400 hover:text-gray-900 transition">Sign In</button>
      </nav>
    );
}
  