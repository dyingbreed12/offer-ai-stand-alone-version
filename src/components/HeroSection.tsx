'use client';

import Image from 'next/image';

export const HeroSection = () => (
  <div className="hero-section">
    <div className="max-w-6xl mx-auto text-center">
      {/* Icon and title in same line with hero-title-container */}
      <div className="hero-title-container">
        <div className="offer-type-icon">💵</div>
        <h1 className="hero-title">Lowball AI</h1>
      </div>
      
      {/* Description */}
      <div className="hero-description">
        <p>Lowball AI spits out instant, degenerate lowball offers, cash or creative, so you can rip huge </p>
        <p>fees without overthinking. Seamlessly integrates with Assigns CRM</p>
        <p> or plug in property details manually for fast, lowball offers.</p>
      </div>
    </div>
  </div>
);
