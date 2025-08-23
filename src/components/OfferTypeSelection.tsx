'use client';

import { useAppContext } from '@/context/AppContext';

export const OfferTypeSelection = () => {
  const { state, setOfferType } = useAppContext();

  const handleOfferTypeClick = (type: 'cash' | 'creative') => {
    console.log('Offer type clicked:', type); // Debug log
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
            <button
              className={`offer-type-option ${state.offerType === 'cash' ? 'active' : ''}`}
              onClick={() => handleOfferTypeClick('cash')}
              type="button"
            >
              <div className="offer-type-icon">💵</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Cash Offer</div>
                <div className="offer-type-subtitle">Quick close, lower price</div>
              </div>
            </button>
            
            <button
              className={`offer-type-option ${state.offerType === 'creative' ? 'active' : ''}`}
              onClick={() => handleOfferTypeClick('creative')}
              type="button"
            >
              <div className="offer-type-icon">🎨</div>
              <div className="offer-type-content">
                <div className="offer-type-title">Creative Offer</div>
                <div className="offer-type-subtitle">Flexible terms, higher price</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
