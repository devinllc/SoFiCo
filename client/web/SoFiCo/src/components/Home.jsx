import React from 'react'
import Hero from './Hero';
import About from './About'
import FeaturedSection from './FeaturedSection'
import TrustworthinessSection from './TrustworthinessSection'
import ThreeCardServicesSection from './ThreeCardServicesSection'
import GetStartedSection from './GetStartedSection'
import FooterSection from './FooterSection'

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedSection />
      <TrustworthinessSection />
      <ThreeCardServicesSection />
      <GetStartedSection />
      <FooterSection />
    </div>
  )
}

export default Home