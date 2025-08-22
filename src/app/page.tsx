'use client';

import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState, useCallback } from 'react';

// Toast Notification Component
const Toast = ({ type, title, message, onClose }: {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }: {
  toasts: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }>;
  removeToast: (id: string) => void;
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete All", cancelText = "Cancel" }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">🗑️</div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className="modal-btn primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};


// Hero Section Component - FIXED ICON PLACEMENT
const HeroSection = () => (
  <div className="hero-section">
    <div className="max-w-6xl mx-auto text-center">
      {/* FIXED: Icon and title in same line with hero-title-container */}
      <div className="hero-title-container">
        <div className="ai-icon">
          <Image
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9bce747-0e1f-4207-8edb-2e054758db55.png"
            alt="AI robot icon with blue gradient background"
            width={40}
            height={40}
          />
        </div>
        <h1 className="hero-title">Offer AI Bot</h1>
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

// Navigation Tabs Component - FIXED FUNCTIONS
const NavigationTabs = () => {
  const { state, switchTab } = useAppContext();
  const offerCount = state.savedOffers.length;

  const handleTabClick = (tab: 'generator' | 'history') => {
    console.log('Tab clicked:', tab); // Debug log
    switchTab(tab);
  };

  return (
    <div className="navigation-container">
      <div className="nav-tabs-wrapper">
        <button
          className={`nav-tab ${state.currentTab === 'generator' ? 'active' : ''}`}
          onClick={() => handleTabClick('generator')}
          type="button"
        >
          <div className="nav-tab-icon">🤖</div>
          <span>Generate Offer</span>
        </button>
        <button
          className={`nav-tab ${state.currentTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabClick('history')}
          type="button"
        >
          <div className="nav-tab-icon">📋</div>
          <span>View Offers ({offerCount})</span>
        </button>
      </div>
    </div>
  );
};

// Offer Type Selection Component - FIXED FUNCTIONS
const OfferTypeSelection = () => {
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

// Property Information Component - FIXED FUNCTIONS
const PropertyInformation = () => {
  const { state, setSearchMode, setSelectedProperty } = useAppContext();

  const handleSearchModeClick = (mode: 'search' | 'manual') => {
    console.log('Search mode clicked:', mode); // Debug log
    setSearchMode(mode);
  };

  const clearSelection = () => {
    console.log('Clear selection clicked'); // Debug log
    setSelectedProperty(null);
    const addressInput = document.getElementById('address-search') as HTMLInputElement;
    if (addressInput) addressInput.value = '';
  };

  return (
    <div className="content-container">
      <div className="property-info-section">
        <div className="section-header-left">
          <h2 className="section-title">Property Information</h2>
          <p className="section-description">
            Search your HighLevel CRM opportunities or enter property details manually for
            accurate offer calculations.
          </p>
        </div>

        {/* Search Mode Toggle */}
        <div className="search-mode-toggle">
          <button
            className={`mode-toggle-btn ${state.searchMode === 'search' ? 'active' : ''}`}
            onClick={() => handleSearchModeClick('search')}
            type="button"
          >
            <div className="mode-icon">🔍</div>
            <span>Search GHL Opportunities</span>
          </button>
          <button
            className={`mode-toggle-btn ${state.searchMode === 'manual' ? 'active' : ''}`}
            onClick={() => handleSearchModeClick('manual')}
            type="button"
          >
            <div className="mode-icon">✋</div>
            <span>Manual Entry</span>
          </button>
        </div>

        {/* Search Mode Content */}
        {state.searchMode === 'search' && (
          <div className="search-content">
            <div className="search-input-group">
              <label className="search-label">Search Address or Property Name</label>
              <input
                type="text"
                id="address-search"
                placeholder="Start typing an address or property name..."
                className="search-input"
              />
            </div>

            {state.selectedProperty && (
              <div className="selected-property">
                <div className="property-info">
                  <div className="property-icon">🏠</div>
                  <div className="property-details">
                    <h3 className="property-address">{state.selectedProperty.address}</h3>
                    <p className="property-meta">
                      ARV: ${state.selectedProperty.arv?.toLocaleString() || '0'} | Repairs: $
                      {state.selectedProperty.repairs?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
                <button className="clear-btn" onClick={clearSelection} type="button">
                  ✕ Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* Manual Mode Content */}
        {state.searchMode === 'manual' && (
          <div className="manual-content">
            <div className="manual-form-grid">
              <div className="form-field">
                <label htmlFor="manual-address" className="field-label">Property Address</label>
                <input
                  type="text"
                  id="manual-address"
                  placeholder="123 Main St, City, State 12345"
                  className="field-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="manual-arv" className="field-label">ARV (After Repair Value)</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="manual-arv"
                    placeholder="250,000"
                    className="field-input with-prefix"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="manual-repairs" className="field-label">Estimated Repair Costs</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="manual-repairs"
                    placeholder="25,000"
                    className="field-input with-prefix"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="manual-notes" className="field-label">Additional Notes (Optional)</label>
                <input
                  type="text"
                  id="manual-notes"
                  placeholder="Property condition, special considerations..."
                  className="field-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Generate Button Component - FIXED FUNCTIONS
const GenerateButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => {
  const handleClick = () => {
    console.log('Generate button clicked'); // Debug log
    onClick();
  };

  return (
    <div className="generate-button-container">
      <button
        className={`generate-ai-btn ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        <div className="btn-icon">🤖</div>
        <span>Generate AI Offer</span>
      </button>
    </div>
  );
};

// Thinking Animation Component
const ThinkingAnimation = () => (
  <div className="content-container">
    <div id="thinking-animation" className="hidden thinking-section">
      <div className="robot-container">
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="robot-eye"></div>
            <div className="robot-eye"></div>
          </div>
          <div className="robot-brain">
            <Image
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7551613-df7a-41e8-9e64-4857fcf2e5ff.png"
              alt="Spinning brain icon representing AI processing"
              width={20}
              height={20}
            />
          </div>
        </div>
        <h3 className="thinking-title">AI is Analyzing Your Property...</h3>
        <p className="thinking-description">
          Our advanced algorithms are processing market data, comparable sales, and repair estimates to calculate your
          optimal offer.
        </p>
        <div className="thinking-dots">
          <div className="thinking-dot"></div>
          <div className="thinking-dot"></div>
          <div className="thinking-dot"></div>
        </div>
      </div>
    </div>
  </div>
);

// Offer Results Component
// Offer Results Component - REDESIGNED to match expected layout
const OfferResults = () => {
  const { state, saveOffer, setCurrentOffer } = useAppContext();

  if (!state.currentOffer) return null;

  const offer = state.currentOffer;

  const handleSaveOffer = () => {
    console.log('Save offer clicked');
    if (state.currentOffer) {
      saveOffer(state.currentOffer);
      alert('Offer saved successfully!');
    }
  };

  const handleGenerateNew = () => {
    console.log('Generate new clicked');
    setCurrentOffer(null);
  };

  const handleDownloadOffer = () => {
    if (!state.currentOffer) return;

    const offerData = state.currentOffer;

    const offerSheet = `
PROFESSIONAL REAL ESTATE OFFER SHEET
Generated by Offer AI Bot

PROPERTY INFORMATION
==========================================
Property Address: ${offerData.address}
Offer Type: ${offerData.offerType === 'cash' ? 'Cash Offer' : 'Creative Offer'}
Generated on: ${new Date().toLocaleDateString()}

FINANCIAL BREAKDOWN
==========================================
ARV (After Repair Value): $${offerData.arv.toLocaleString()}
Estimated Repairs: $${offerData.repairs.toLocaleString()}
ARV Percentage Used: ${offerData.arvPctUsed}%

COST ANALYSIS
==========================================
Holding Costs (${offerData.holdingPctUsed}%): $${offerData.holdingCosts.toLocaleString()}
Closing Costs (${offerData.closingPctUsed}%): $${offerData.closingCosts.toLocaleString()}
Total Additional Costs: $${(offerData.holdingCosts + offerData.closingCosts).toLocaleString()}

FINAL OFFER CALCULATION
==========================================
Base Amount (${offerData.arvPctUsed}% of ARV): $${Math.round(offerData.arv * (offerData.arvPctUsed / 100)).toLocaleString()}
Less: Repairs: -$${offerData.repairs.toLocaleString()}
Less: Holding Costs: -$${offerData.holdingCosts.toLocaleString()}
Less: Closing Costs: -$${offerData.closingCosts.toLocaleString()}

FINAL OFFER: $${offerData.offerAmount.toLocaleString()}

ADDITIONAL NOTES
==========================================
${offerData.notes || 'No additional notes provided.'}

This offer was generated using professional real estate investment calculations and market analysis.
            `.trim();

    const blob = new Blob([offerSheet], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `offer-${offerData.address.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('Offer downloaded!');
  };

  const handleShareOffer = () => {
    if (!state.currentOffer) return;

    const offerData = state.currentOffer;
    const shareText = `🏠 Professional Real Estate Offer Generated!\n\nProperty: ${
      offerData.address
    }\nOffer Amount: $${offerData.offerAmount.toLocaleString()}\nOffer Type: ${
      offerData.offerType === 'cash' ? 'Cash' : 'Creative'
    }\n\nGenerated by Offer AI Bot - Advanced Real Estate Investment Calculator`;

    if (navigator.share) {
      navigator.share({
        title: 'Real Estate Investment Offer',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Offer details copied to clipboard!');
      });
    }
  };

  return (
    <div className="content-container">
      <div id="offer-results" className="offer-results-section">
        <div className="offer-results-content">
          {/* Title with target icon */}
          <h2 className="offer-results-title">
            <span className="target-icon">🎯</span>
            Your Recommended Offer
          </h2>
          
          {/* Large offer amount */}
          <div className="offer-amount">
            ${offer.offerAmount.toLocaleString()}
          </div>
          
          {/* Offer type display */}
          <div className="offer-type-display">
            <span className="offer-type-icon">
              {offer.offerType === 'cash' ? '💵' : '🎨'}
            </span>
            {offer.offerType === 'cash' ? 'Cash Offer' : 'Creative Offer'}
          </div>

          {/* Breakdown section - REDESIGNED to match expected layout */}
          <div className="offer-breakdown">
            <h3 className="breakdown-title">Detailed Calculation Breakdown</h3>
            
            {/* First row: Property ARV and Holding Costs */}
            <div className="breakdown-row">
              <div className="breakdown-item">
                <span className="breakdown-label">Property ARV:</span>
                <span className="breakdown-value">${offer.arv.toLocaleString()}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Holding Costs:</span>
                <span className="breakdown-value">${offer.holdingCosts.toLocaleString()}</span>
              </div>
            </div>

            {/* Second row: Repair Costs and Closing Costs */}
            <div className="breakdown-row">
              <div className="breakdown-item">
                <span className="breakdown-label">Repair Costs:</span>
                <span className="breakdown-value">${offer.repairs.toLocaleString()}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Closing Costs:</span>
                <span className="breakdown-value">${offer.closingCosts.toLocaleString()}</span>
              </div>
            </div>

            {/* Third row: ARV Percentage and Final Offer */}
            <div className="breakdown-row">
              <div className="breakdown-item">
                <span className="breakdown-label">ARV Percentage:</span>
                <span className="breakdown-value">{offer.arvPctUsed}%</span>
              </div>
              {/* Empty space for layout consistency */}
              <div></div>
            </div>

            {/* Final offer section */}
            <div className="final-offer-section">
              <div className="final-offer-item">
                <span className="final-offer-label">Final Offer:</span>
                <span className="final-offer-value">${offer.offerAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action buttons - REDESIGNED to match expected design */}
          <div className="offer-actions">
            <button className="action-btn save" onClick={handleSaveOffer} type="button">
              <span className="btn-icon">💾</span>
              Save Offer
            </button>
            <button className="action-btn generate" onClick={handleGenerateNew} type="button">
              <span className="btn-icon">🔄</span>
              Generate New
            </button>
            <button className="action-btn download hidden" onClick={handleDownloadOffer} type="button">
              <span className="btn-icon">📥</span>
              Download PDF
            </button>
            <button className="action-btn share hidden" onClick={handleShareOffer} type="button">
              <span className="btn-icon">🔗</span>
              Share Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Footer Component
const Footer = () => (
  <div className="content-container">
    <div className="footer-section">
      <div className="footer-content">
        <h4 className="footer-title">Offer AI Bot v1.0</h4>
        <div className="footer-description">
          <p>Embeddable in HighLevel CRM | Production-ready | Future-proof architecture</p>
          <p>Built with Next.js, Tailwind CSS v3, and HighLevel API v2</p>
        </div>
        <div className="footer-features">
          <div className="feature-item">
            <span className="feature-icon green">✅</span>
            <span>Real-time GHL integration</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon orange">⚡</span>
            <span>Lightning-fast calculations</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon purple">🔒</span>
            <span>Enterprise security</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Offers History Component
const OffersHistory = () => {
  const { state, clearAllOffers, deleteOffer, switchTab } = useAppContext();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedOffers = state.savedOffers
    .filter((offer) => {
      const matchesType = filterType === 'all' || offer.offerType === filterType;
      const matchesSearch =
        !searchQuery ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (offer.notes && offer.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'amount-high':
          return b.offerAmount - a.offerAmount;
        case 'amount-low':
          return a.offerAmount - b.offerAmount;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleClearAll = () => {
    console.log('Clear all clicked'); // Debug log
    if (confirm('Are you sure you want to delete all saved offers? This action cannot be undone.')) {
      clearAllOffers();
    }
  };

  const handleDeleteOffer = (offerId: string) => {
    console.log('Delete offer clicked:', offerId); // Debug log
    deleteOffer(offerId);
  };

  const handleSwitchToGenerator = () => {
    console.log('Switch to generator clicked'); // Debug log
    switchTab('generator');
  };

  if (state.currentTab !== 'history') return null;

  return (
    <div className="content-container">
      <div className="history-section">
        <div className="history-header">
          <div>
            <h2 className="history-title">Your Saved Offers</h2>
            <p className="history-description">Track and manage all your generated offers in one place.</p>
          </div>
          <button
            onClick={handleClearAll}
            className="clear-all-btn"
            type="button"
          >
            🗑️ Clear All
          </button>
        </div>

        <div className="history-filters">
          <div className="filter-group">
            <label className="filter-label">Filter by Type</label>
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Offer Types</option>
              <option value="cash">Cash Offers</option>
              <option value="creative">Creative Offers</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Sort by</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Search Offers</label>
            <input
              type="text"
              placeholder="Search by address or notes..."
              className="filter-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="offers-grid">
          {filteredAndSortedOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-card-header">
                <div>
                  <h3 className="offer-address">{offer.address}</h3>
                  <div className="offer-status">
                    {offer.offerType === 'cash' ? '💵' : '🎨'} {offer.offerType.charAt(0).toUpperCase() + offer.offerType.slice(1)} Offer
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="delete-btn"
                  type="button"
                >
                  🗑️
                </button>
              </div>

              <div className="offer-card-body">
                <div className="offer-amount-display">${offer.offerAmount.toLocaleString()}</div>
                <div className="offer-meta">
                  ARV: ${offer.arv.toLocaleString()} | Repairs: ${offer.repairs.toLocaleString()}
                </div>
                <div className="offer-date">
                  Generated on {new Date(offer.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedOffers.length === 0 && (
          <div className="empty-offers">
            <Image
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1cf5ed54-f5b0-4d43-badd-955aaeda8cd2.png"
              alt="Empty folder representing no saved offers"
              width={60}
              height={60}
            />
            <h3 className="empty-title">No Offers Saved Yet</h3>
            <p className="empty-description">
              You haven't generated any offers yet. Create your first professional offer to get started!
            </p>
            <button
              className="empty-action-btn"
              onClick={handleSwitchToGenerator}
              type="button"
            >
              🤖 Generate First Offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Page Component - FIXED FUNCTIONS
export default function Home() {
  const { state, setIsProcessing, setCurrentOffer } = useAppContext();

  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }>>([]);

  const showToast = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);


  // Validation function
  const validateInputs = useCallback(() => {
    if (state.searchMode === 'search') {
      return state.selectedProperty !== null;
    } else {
      const address = (document.getElementById('manual-address') as HTMLInputElement)?.value.trim();
      const arv = parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value);
      const repairs = parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value);

      return address && !isNaN(arv) && arv > 0 && !isNaN(repairs) && repairs >= 0;
    }
  }, [state.searchMode, state.selectedProperty]);

  // Get property data function
  const getPropertyData = useCallback(() => {
    if (state.searchMode === 'search' && state.selectedProperty) {
      return {
        address: state.selectedProperty.address,
        arv: state.selectedProperty.arv || 0,
        repairs: state.selectedProperty.repairs || 0,
        notes: state.selectedProperty.name || '',
      };
    } else {
      return {
        address: (document.getElementById('manual-address') as HTMLInputElement)?.value.trim() || '',
        arv: parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value) || 0,
        repairs: parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value) || 0,
        notes: (document.getElementById('manual-notes') as HTMLInputElement)?.value.trim() || '',
      };
    }
  }, [state.searchMode, state.selectedProperty]);

  // Calculate offer function
  const calculateOffer = useCallback((propertyData: any) => {
    const { arv, repairs } = propertyData;

    let offerAmount;
    let arvPctUsed;
    let holdingCosts;
    let closingCosts;
    let holdingPctUsed;
    let closingPctUsed;

    if (state.offerType === 'cash') {
      arvPctUsed = 0.7;
      holdingPctUsed = 0.02;
      closingPctUsed = 0.03;

      holdingCosts = arv * holdingPctUsed;
      closingCosts = arv * closingPctUsed;

      offerAmount = arv * arvPctUsed - repairs - holdingCosts - closingCosts;
    } else {
      arvPctUsed = 0.8;
      holdingPctUsed = 0.015;
      closingPctUsed = 0.025;

      holdingCosts = arv * holdingPctUsed;
      closingCosts = arv * closingPctUsed;

      offerAmount = arv * arvPctUsed - repairs - holdingCosts - closingCosts;
    }

    offerAmount = Math.max(offerAmount, 1000);

    return {
      ...propertyData,
      offerAmount: Math.round(offerAmount),
      arvPctUsed: Math.round(arvPctUsed * 100),
      holdingCosts: Math.round(holdingCosts),
      closingCosts: Math.round(closingCosts),
      holdingPctUsed: Math.round(holdingPctUsed * 100),
      closingPctUsed: Math.round(closingPctUsed * 100),
      offerType: state.offerType,
    };
  }, [state.offerType]);

  // Generate offer function - FIXED
  const generateOffer = useCallback(async () => {
    console.log('generateOffer called'); // Debug log
    console.log('Validation result:', validateInputs()); // Debug log
    console.log('Is processing:', state.isProcessing); // Debug log

    if (!validateInputs() || state.isProcessing) {
      console.log('Validation failed or already processing'); // Debug log
      return;
    }

    setIsProcessing(true);

    // Show/hide elements
    const offerResultsEl = document.getElementById('offer-results');
    const thinkingAnimationEl = document.getElementById('thinking-animation');
    
    if (offerResultsEl) {
      offerResultsEl.classList.add('hidden');
      console.log('Hiding offer results'); // Debug log
    }
    if (thinkingAnimationEl) {
      thinkingAnimationEl.classList.remove('hidden');
      console.log('Showing thinking animation'); // Debug log
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Calculate offer
    const propertyData = getPropertyData();
    console.log('Property data:', propertyData); // Debug log
    
    const offerData = calculateOffer(propertyData);
    console.log('Calculated offer:', offerData); // Debug log

    setCurrentOffer(offerData);

    // Hide/show elements
    if (thinkingAnimationEl) {
      thinkingAnimationEl.classList.add('hidden');
      console.log('Hiding thinking animation'); // Debug log
    }
    if (offerResultsEl) {
      offerResultsEl.classList.remove('hidden');
      console.log('Showing offer results'); // Debug log
    }

    setIsProcessing(false);
  }, [validateInputs, state.isProcessing, setIsProcessing, getPropertyData, calculateOffer, setCurrentOffer]);

  // Check if button should be disabled
  const isButtonDisabled = !validateInputs() || state.isProcessing;

  return (
    <div className="app-container">
      <HeroSection />
      <NavigationTabs />

      {state.currentTab === 'generator' && (
        <div className="generator-content">
          <OfferTypeSelection />
          <PropertyInformation />
          <GenerateButton 
            onClick={generateOffer}
            disabled={isButtonDisabled}
          />
          <ThinkingAnimation />
          <OfferResults />
          <Footer />
        </div>
      )}

      <OffersHistory />
    </div>
  );
}

