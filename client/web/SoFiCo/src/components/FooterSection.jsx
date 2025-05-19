import React from "react";
import logo from '../assets/Sofico.svg'

const FooterSection = () => {
  return (
    <footer className="w-full bg-white pt-10 pb-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
        {/* Logo */}
        <div className="flex items-center mb-2">
          {/* Replace with your logo */}
          <div className="mb-5 w-30 h-8"><img src={logo} className='object-fit object-contain' /></div>
        </div>
        {/* App Store Buttons */}
        <div className="flex gap-3 mb-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>
        </div>
        {/* Main Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-gray-700 font-medium text-sm">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Help</a>
          <a href="#">Support</a>
        </div>
        {/* Social Icons & Feedback */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex gap-3 mb-2">
            <a href="#" className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2">
              {/* Twitter */}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.16 4.16 0 0 0 1.82-2.3 8.17 8.17 0 0 1-2.6.99A4.13 4.13 0 0 0 16.11 4c-2.27 0-4.1 1.84-4.1 4.11 0 .32.04.64.1.94C8 8.91 5.14 7.38 3.07 5.08c-.35.6-.55 1.29-.55 2.03 0 1.4.71 2.63 1.8 3.36-.66-.02-1.29-.2-1.83-.5v.05c0 1.96 1.39 3.6 3.23 3.97-.34.09-.7.14-1.07.14-.26 0-.52-.03-.77-.07.52 1.63 2.04 2.82 3.84 2.85A8.31 8.31 0 0 1 2 19.54c-.37 0-.74-.02-1.1-.07A11.77 11.77 0 0 0 7.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.44 8.44 0 0 0 24 4.59a8.27 8.27 0 0 1-2.54.7z" />
              </svg>
            </a>
            <a href="#" className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2">
              {/* Facebook */}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0" />
              </svg>
            </a>
            <a href="#" className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2">
              {/* Instagram */}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.976.974 1.247 2.243 1.308 3.608.058 1.267.069 1.647.069 4.851s-.011 3.584-.069 4.85c-.061 1.366-.332 2.634-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.267.058-1.647.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.976-.974-1.247-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.851c.061-1.366.332-2.634 1.308-3.608C4.517 2.567 5.785 2.295 7.151 2.233 8.417 2.175 8.797 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.775.128 4.602.395 3.545 1.453 2.488 2.51 2.221 3.683 2.163 4.948 2.105 6.227 2.093 6.636 2.093 12c0 5.364.012 5.773.07 7.052.058 1.266.325 2.438 1.382 3.495 1.057 1.057 2.229 1.324 3.495 1.382 1.279.058 1.688.07 7.052.07s5.773-.012 7.052-.07c1.266-.058 2.438-.325 3.495-1.382 1.057-1.057 1.324-2.229 1.382-3.495.058-1.279.07-1.688.07-7.052s-.012-5.773-.07-7.052c-.058-1.266-.325-2.438-1.382-3.495C19.438.395 18.266.128 17.052.07 15.773.012 15.364 0 12 0z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
            <a href="#" className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2">
              {/* LinkedIn */}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.601 0 4.266 2.369 4.266 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452z" />
              </svg>
            </a>
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Send Your Feedback :</span>
            <span className="ml-1">support@sofico.com</span>
          </div>
        </div>
        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mb-2">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms & Condition</a>
          <span>|</span>
          <a href="#" className="hover:underline">Cookie Notice</a>
          <span>|</span>
          <a href="#" className="hover:underline">Copyright Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Data Policy</a>
        </div>
        <div className="text-xs text-gray-400">
          © 2025 Social Finace Corporation (SoFiCo). All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
