import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Compass } from 'lucide-react';
import heroBg from '../assets/images/hero_luxury_sedan_1794242557000.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Hero Automotive Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Luxury executive vehicle under architectural lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[75%_center] lg:object-[80%_center] xl:object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Contrast Scrims - Deep on left for text, clear on right for vehicle */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 via-45% to-black/25 sm:to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-4xl lg:max-w-5xl space-y-8">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
            <span>Your Car. Our Driver. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0B83E] via-[#D9A52A] to-[#B5841D]">
              Your Journey.
            </span>
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg text-[#D4D4D4] leading-relaxed max-w-xl font-normal">
            Enjoy the comfort and familiarity of your own automobile while our disciplined, background-verified acting drivers take the wheel. From daily city gridlock to scenic weekend highway tours and high-profile corporate delegates.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/booking-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-[#D9A52A] hover:bg-[#F0B83E] rounded-md transition-all shadow-[0_4px_20px_rgba(217,165,42,0.35)] hover:shadow-[0_6px_24px_rgba(240,184,62,0.5)] transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4 text-black" />
              <span>Book a Driver</span>
            </Link>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#171717]/80 hover:bg-[#262626] border border-[#333333] hover:border-[#D9A52A]/60 rounded-md transition-all backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#D9A52A]" />
              <span>Explore Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
