// src/components/OfferTypeSelection.tsx

"use client";

import { useState } from 'react';
import { useAppContext } from "@/context/AppContext";
import { DisabledOfferPrompt } from '../DisabledOfferPrompt/DisabledOfferPrompt';
import styles from './OfferTypeSelection.module.css';
import navStyles from '../Navigation/NavigationTabs.module.css';
export const OfferTypeSelection = () => {
  const { state, setOfferType } = useAppContext();
  const [showPrompt, setShowPrompt] = useState(false);

  const isCashActive = state.offerType === 'cash' || state.offerType === 'zestimate';
  const isCreativeActive = state.offerType === 'creative' || state.offerType === 'novation';

  const handleMainStrategyClick = (type: 'cash' | 'creative') => {
    if (type === 'cash') {
      setOfferType('cash');
    } else {
      setOfferType('creative');
    }
  };

  const handleDisabledOfferClick = () => {
    setShowPrompt(true);
  };

  return (
    <div className={styles.offerStrategySection}>
      <div className="section-header-centered">
        <h2 className="section-title">Choose Your Offer Strategy</h2>
        <p className="section-description">
          Select the offer type that best fits your investment strategy and market conditions.
        </p>
      </div>

      <div className={navStyles.navigationContainer}>
        <div className={navStyles.navTabsWrapper}>
          <button
            className={`${navStyles.navTab} ${isCashActive ? navStyles.active : ''}`}
            onClick={() => handleMainStrategyClick("cash")}
            type="button"
          >
            <span>Cash</span>
          </button>
          <button
            className={`${navStyles.navTab} ${isCreativeActive ? navStyles.active : ''}`}
            onClick={() => handleMainStrategyClick("creative")}
            type="button"
          >
            <span>Creative</span>
          </button>
        </div>
      </div>

      <div className={styles.offerTypeContainer}>
        {isCashActive ? (
          <div className={styles.offerTypeWrapper}>
            <button
              className={`${styles.offerTypeOption} ${state.offerType === "cash" ? styles.active : ''}`}
              onClick={() => setOfferType("cash")}
              type="button"
            >
              <div className={styles.offerTypeIcon}>💵</div>
              <div className={styles.offerTypeContent}>
                <div className={styles.offerTypeTitle}>Fix and Flip</div>
                <div className={styles.offerTypeSubtitle}>ARV and Repairs</div>
              </div>
            </button>
            <button
              className={`${styles.offerTypeOption} ${state.offerType === "zestimate" ? styles.active : ''}`}
              onClick={() => setOfferType("zestimate")}
              type="button"
            >
              <div className={styles.offerTypeIcon}>📊</div>
              <div className={styles.offerTypeContent}>
                <div className={styles.offerTypeTitle}>Zillow</div>
                <div className={styles.offerTypeSubtitle}>Zestimate minus a haircut</div>
              </div>
            </button>
            <button className={`${styles.offerTypeOption} ${styles.disabled}`} type="button" onClick={handleDisabledOfferClick}>
              <div className={`${styles.offerTypeIcon} ${styles.disabledIconAndText}`}>🌳</div>
              <div className={`${styles.offerTypeContent} ${styles.disabledIconAndText}`}>
                <div className={styles.offerTypeTitle}>Land</div>
                <div className={styles.offerTypeSubtitle}>New Construction</div>
              </div>
            </button>
            <button className={`${styles.offerTypeOption} ${styles.disabled}`} type="button" onClick={handleDisabledOfferClick}>
              <div className={`${styles.offerTypeIcon} ${styles.disabledIconAndText}`}>🏠</div>
              <div className={`${styles.offerTypeContent} ${styles.disabledIconAndText}`}>
                <div className={styles.offerTypeTitle}>Rental</div>
                <div className={styles.offerTypeSubtitle}>Cash Flow</div>
              </div>
            </button>
          </div>
        ) : (
          <div className={styles.offerTypeWrapper}>
            <button
              className={`${styles.offerTypeOption} ${state.offerType === "creative" ? styles.active : ''}`}
              onClick={() => setOfferType("creative")}
              type="button"
            >
              <div className={styles.offerTypeIcon}>🎨</div>
              <div className={styles.offerTypeContent}>
                <div className={styles.offerTypeTitle}>Seller Finance</div>
                <div className={styles.offerTypeSubtitle}>Buy Now, Pay Later</div>
              </div>
            </button>
            <button className={`${styles.offerTypeOption} ${styles.disabled}`} type="button" onClick={handleDisabledOfferClick}>
              <div className={`${styles.offerTypeIcon} ${styles.disabledIconAndText}`}>📝</div>
              <div className={`${styles.offerTypeContent} ${styles.disabledIconAndText}`}>
                <div className={styles.offerTypeTitle}>Novation</div>
                <div className={styles.offerTypeSubtitle}>Retail price, MLS exit</div>
              </div>
            </button>
            <button className={`${styles.offerTypeOption} ${styles.disabled}`} type="button" onClick={handleDisabledOfferClick}>
              <div className={`${styles.offerTypeIcon} ${styles.disabledIconAndText}`}>🛡️</div>
              <div className={`${styles.offerTypeContent} ${styles.disabledIconAndText}`}>
                <div className={styles.offerTypeTitle}>Subject To</div>
                <div className={styles.offerTypeSubtitle}>Mortgage Takeover</div>
              </div>
            </button>
          </div>
        )}
      </div>
      {showPrompt && <DisabledOfferPrompt onClose={() => setShowPrompt(false)} />}
    </div>
  );
};