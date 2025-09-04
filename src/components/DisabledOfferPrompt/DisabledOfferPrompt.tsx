// src/components/DisabledOfferPrompt.tsx

import React from 'react';
import styles from './DisabledOfferPrompt.module.css';

interface DisabledOfferPromptProps {
  onClose: () => void;
}

export const DisabledOfferPrompt: React.FC<DisabledOfferPromptProps> = ({ onClose }) => {
  return (
    <div className={styles.disabledOfferPromptOverlay} onClick={onClose}>
      <div className={styles.disabledOfferPromptCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.disabledOfferPromptClose} onClick={onClose}>&times;</button>
        <div className={styles.disabledOfferPromptContent}>
          <h3 className={styles.promptTitle}>Want more advanced calculators?</h3>
          <p className={styles.promptMessage}>
            Sign up at WholesaleCalculators.com
            <span role="img" aria-label="finger pointing right">👉</span>
          </p>
          <p className={styles.promptTagline}>
            The world&apos;s best real estate wholesaling calculators
          </p>
          <a
            href="https://wholesalecalculators.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.promptButton}
          >
            Wholesale Calculators
          </a>
        </div>
      </div>
    </div>
  );
};