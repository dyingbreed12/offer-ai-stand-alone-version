// src/components/OfferTypeSelection.tsx

"use client";

import { useState } from 'react';
import { useAppContext } from "@/context/AppContext";
import { DisabledOfferPrompt } from './DisabledOfferPrompt';

export const OfferTypeSelection = () => {
  const { state, setOfferType } = useAppContext();
  const [showPrompt, setShowPrompt] = useState(false);

  // Corrected logic to determine which main strategy is currently active
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
    <div className="offer-strategy-section">
      <div className="section-header-centered">
        <h2 className="section-title">Choose Your Offer Strategy</h2>
        <p className="section-description">
          Select the offer type that best fits your investment strategy and market conditions.
        </p>
      </div>
      <div className="navigation-container mb-8">
        <div className="nav-tabs-wrapper">
          <button
            className={`nav-tab ${isCashActive ? "active" : ""}`}
            onClick={() => handleMainStrategyClick("cash")}
            type="button"
          >
            <span>Cash Options</span>
          </button>
          <button
            className={`nav-tab ${isCreativeActive ? "active" : ""}`}
            onClick={() => handleMainStrategyClick("creative")}
            type="button"
          >
            <span>Creative Options</span>
          </button>
        </div>
      </div>
      <div className="offer-type-container">
        {isCashActive ? (
          <div className="offer-type-wrapper">
            {/* Fix and Flip */}
            <button
              className={`offer-type-option ${state.offerType === "cash" ? "active" : ""}`}
              onClick={() => setOfferType("cash")}
              type="button"
            >
              <div className="offer-type-icon">💵</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Fix and Flip</div>
                <div className="offer-type-subtitle">ARV and Repairs</div>
              </div>
            </button>

            {/* Zillow */}
            <button
              className={`offer-type-option ${state.offerType === "zestimate" ? "active" : ""}`}
              onClick={() => setOfferType("zestimate")}
              type="button"
            >
              <div className="offer-type-icon">📊</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Zillow</div>
                <div className="offer-type-subtitle">Zestimate minus a haircut</div>
              </div>
            </button>

            {/* Land (Disabled) */}
            <button className="offer-type-option disabled" type="button" onClick={handleDisabledOfferClick}>
              <div className="offer-type-icon disabled-icon-and-text">🌳</div>
              <div className="offer-type-content disabled-icon-and-text">
                <div className="offer-type-title">Land</div>
                <div className="offer-type-subtitle">New Construction</div>
              </div>
            </button>

            {/* Rental (Disabled) */}
            <button className="offer-type-option disabled" type="button" onClick={handleDisabledOfferClick}>
              <div className="offer-type-icon disabled-icon-and-text">🏠</div>
              <div className="offer-type-content disabled-icon-and-text">
                <div className="offer-type-title">Rental</div>
                <div className="offer-type-subtitle">Cash Flow</div>
              </div>
            </button>
          </div>
        ) : (
          <div className="offer-type-wrapper">
            {/* Seller Finance */}
            <button
              className={`offer-type-option ${state.offerType === "creative" ? "active" : ""}`}
              onClick={() => setOfferType("creative")}
              type="button"
            >
              <div className="offer-type-icon">🎨</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Seller Finance</div>
                <div className="offer-type-subtitle">Buy Now, Pay Later</div>
              </div>
            </button>

            {/* Novation (Disabled) */}
            <button className="offer-type-option disabled" type="button" onClick={handleDisabledOfferClick}>
              <div className="offer-type-icon disabled-icon-and-text">📝</div>
              <div className="offer-type-content disabled-icon-and-text">
                <div className="offer-type-title">Novation</div>
                <div className="offer-type-subtitle">Retail price, MLS exit</div>
              </div>
            </button>

            {/* Subject To (Disabled) */}
            <button className="offer-type-option disabled" type="button" onClick={handleDisabledOfferClick}>
              <div className="offer-type-icon disabled-icon-and-text">🛡️</div>
              <div className="offer-type-content disabled-icon-and-text">
                <div className="offer-type-title">Subject To</div>
                <div className="offer-type-subtitle">Mortgage Takeover</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {showPrompt && <DisabledOfferPrompt onClose={() => setShowPrompt(false)} />}
    </div>
  );
};