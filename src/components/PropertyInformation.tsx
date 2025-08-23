'use client';

import { useAppContext } from '@/context/AppContext';

export const PropertyInformation = () => {
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
