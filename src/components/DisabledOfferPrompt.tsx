// src/components/DisabledOfferPrompt.tsx

import React from 'react';

interface DisabledOfferPromptProps {
  onClose: () => void;
}

export const DisabledOfferPrompt: React.FC<DisabledOfferPromptProps> = ({ onClose }) => {
  return (
    <div className="disabled-offer-prompt-overlay" onClick={onClose}>
      <div className="disabled-offer-prompt-card" onClick={(e) => e.stopPropagation()}>
        <button className="disabled-offer-prompt-close" onClick={onClose}>&times;</button>
        <div className="disabled-offer-prompt-content">
          <h3 className="prompt-title">Want more advanced calculators?</h3>
          <p className="prompt-message">
            Sign up at WholesaleCalculators.com
            <span role="img" aria-label="finger pointing right">👉</span>
          </p>
          <p className="prompt-tagline">
            The world&apos;s best real estate wholesaling calculators
          </p>
          <a
            href="https://wholesalecalculators.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="prompt-button"
          >
            Wholesale Calculators
          </a>
        </div>
      </div>
    </div>
  );
};