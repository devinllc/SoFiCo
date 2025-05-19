import './App.css'

// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About'
import FeaturedSection from './components/FeaturedSection'
import TrustworthinessSection from './components/TrustworthinessSection'
import DualCardFeatureSection  from './components/DualCardFeatureSection'
import ThreeCardServicesSection from './components/ThreeCardServicesSection'
import GetStartedSection from './components/GetStartedSection'
import FooterSection from './components/FooterSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e2d3c] to-[#116466]">
      <Navbar />
      <Hero />
      <About />
      <FeaturedSection />
      <TrustworthinessSection />
      <DualCardFeatureSection />
      <ThreeCardServicesSection />
      <GetStartedSection />
      <FooterSection />
      
    </div>
  );
}

export default App;
