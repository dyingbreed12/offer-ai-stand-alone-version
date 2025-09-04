// src/components/HeroSection.tsx

'use client';

import styles from './HeroSection.module.css';

export const HeroSection = () => (
  <div className={styles.heroSection}>
    <div className="max-w-6xl mx-auto text-center">
      {/* Icon and title in same line with hero-title-container */}
      <div className={styles.heroTitleContainer}>
        <h1 className={styles.heroTitle}>Lowball AI</h1>
      </div>

      <div className={styles.heroDescription}>
        <p style={{ marginBottom: '2em' }}>Brought to you by HowToWholesale.com and WholesaleSoftwares.com</p>
        <h2>Lowball AI spits out filthy lowball offers in seconds</h2>
      </div>

      {/* Description */}
      <div className={styles.heroDescription}>
        <p>Cash or creative, it doesn’t matter. Stop overthinking and start insulting sellers</p>
        <p>(politely, of course), and walk away with spreads big enough</p>
        <p>to make your high school haters choke on their 9-to-5.</p>
      </div>
    </div>
  </div>
);