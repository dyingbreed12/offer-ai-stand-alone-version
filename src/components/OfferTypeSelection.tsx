"use client";

import { useAppContext } from "@/context/AppContext";

export const OfferTypeSelection = () => {
  const { state, setOfferType } = useAppContext();

  const handleOfferTypeClick = (type: "cash" | "creative" | "novation" | "zestimate") => {
    setOfferType(type);
  };

  return (
    <div className="content-container">
      <div className="offer-strategy-section">
        <div className="section-header-centered">
          <h2 className="section-title">Choose Your Offer Strategy</h2>
          <p className="section-description">
            Select the offer type that best fits your investment strategy and market conditions.
          </p>
        </div>

        <div className="offer-type-container">
          <div className="offer-type-wrapper">
            {/* Cash */}
            <button
              className={`offer-type-option ${state.offerType === "cash" ? "active" : ""}`}
              onClick={() => handleOfferTypeClick("cash")}
              type="button"
            >
              <div className="offer-type-icon">💵</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Fix and Flip</div>
                <div className="offer-type-subtitle">ARV and Repairs</div>
              </div>
            </button>

            {/* Zestimate */}
            <button
              className={`offer-type-option ${state.offerType === "zestimate" ? "active" : ""}`}
              onClick={() => handleOfferTypeClick("zestimate")}
              type="button"
            >
              <div className="offer-type-icon">📊</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Zillow</div>
                <div className="offer-type-subtitle">Zestimate minus a haircut</div>
              </div>
            </button>

            {/* Creative */}
            <button
              className={`offer-type-option ${state.offerType === "creative" ? "active" : ""}`}
              onClick={() => handleOfferTypeClick("creative")}
              type="button"
            >
              <div className="offer-type-icon">🎨</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Seller Finance</div>
                <div className="offer-type-subtitle">Buy Now, Pay Later</div>
              </div>
            </button>

            {/* Novation */}
            <button
              className={`offer-type-option ${state.offerType === "novation" ? "active" : ""}`}
              onClick={() => handleOfferTypeClick("novation")}
              type="button"
            >
              <div className="offer-type-icon">📝</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Novation</div>
                <div className="offer-type-subtitle">Retail price, MLS exit</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
