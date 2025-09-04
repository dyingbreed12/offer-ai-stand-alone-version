// src/components/LocalTooltip.tsx

import React from 'react';

interface LocalTooltipProps {
  title: string;
  message: string;
}

export const LocalTooltip: React.FC<LocalTooltipProps> = ({ title, message }) => {
  return (
    <div className="local-tooltip">
      <div className="local-tooltip-card">
        <h4 className="tooltip-title">{title}</h4>
        <p className="tooltip-message">{message}</p>
        <p className="tooltip-tagline">
          The world&apos;s best real estate wholesaling calculators
        </p>
        <a
          href="https://wholesalecalculators.com"
          target="_blank"
          rel="noopener noreferrer"
          className="prompt-button"
        >
          Wholesale Calculators
        </a>
      </div>
    </div>
  );
};