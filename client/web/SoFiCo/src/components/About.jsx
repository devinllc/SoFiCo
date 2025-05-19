import React from "react";
import AboutContent from './AboutContent'
import ChartCard from './ChartCard'

const About = () => {
  return (
    <section className="w-full py-12 bg-white flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center justify-between px-4">
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-full md:w-1/2 flex justify-center">
          <ChartCard />
        </div>
        <div className="w-full md:w-1/2">
          <AboutContent />
        </div>
      </div>
    </section>
  );
};

export default About;