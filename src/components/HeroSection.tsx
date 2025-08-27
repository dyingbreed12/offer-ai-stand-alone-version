'use client';

import Image from 'next/image';

export const HeroSection = () => (
  <div className="hero-section">
    <div className="max-w-6xl mx-auto text-center">
      {/* Icon and title in same line with hero-title-container */}
      <div className="hero-title-container">
        <div className="ai-icon">
          <Image
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9bce747-0e1f-4207-8edb-2e054758db55.png"
            alt="AI robot icon with blue gradient background"
            width={40}
            height={40}
          />
        </div>
        <h1 className="hero-title">Low Ball AI</h1>
      </div>
      
      {/* Description */}
      <div className="hero-description">
        <p>Generate compelling Cash or Creative offers with our AI-powered calculator.</p>
        <p>Seamlessly integrate with your HighLevel CRM or input property details</p>
        <p>manually for instant, professional offer calculations.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number blue">2s</div>
          <div className="stat-label">Average calculation time</div>
        </div>
        <div className="stat-card">
          <div className="stat-number purple">100%</div>
          <div className="stat-label">Accurate market analysis</div>
        </div>
        <div className="stat-card">
          <div className="stat-number green">∞</div>
          <div className="stat-label">Unlimited offers</div>
        </div>
      </div>
    </div>
  </div>
);
