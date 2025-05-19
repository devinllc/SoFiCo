import './App.css'

// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e2d3c] to-[#116466]">
      <Navbar />
      <Hero />
      <Partners />
    </div>
  );
}

export default App;
