'use client';

export const HeroSection = () => (
  <div className="hero-section">
    <div className="max-w-6xl mx-auto text-center">
      {/* Icon and title in same line with hero-title-container */}
      <div className="hero-title-container">
        <h1 className="hero-title">Lowball AI</h1>
      </div>

      <div className="hero-subtitle-container">

        <p style={{ marginBottom: '2em' }} className="hero-sub-title">Brought to you by HowToWholesale.com and WholesaleSoftwares.com</p>      
        
        <h2 className="h2-hero-title" >Lowball AI spits out filthy lowball offers in seconds</h2>
      </div>

      {/* Description */}
      <div className="hero-description">
        <p>Cash or creative, it doesn’t matter. Stop overthinking and start insulting sellers</p>
        <p>(politely, of course), and walk away with spreads big enough</p>
        <p>to make your high school haters choke on their 9-to-5.</p>
      </div>
    </div>
  </div>
);
