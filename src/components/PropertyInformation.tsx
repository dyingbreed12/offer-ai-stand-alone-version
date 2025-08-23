'use client';

import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';

export const PropertyInformation = () => {
  const { state, setSearchMode, setSelectedProperty } = useAppContext();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchModeClick = (mode: 'search' | 'manual') => {
    setSearchMode(mode);
  };

  const clearSelection = () => {
    setSelectedProperty(null);
    setQuery('');
    setResults([]);
  };

  // Fetch from API when query changes
  useEffect(() => {
    if (query.length < 3) return; // wait until at least 3 chars
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/opportunities?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.opportunities || []);
      } catch (err) {
        console.error('Search error:', err);
      }
      setLoading(false);
    };
    const delay = setTimeout(fetchData, 400); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (opportunity: any) => {
    // Map GHL opportunity into our context property format
    const arvField = opportunity.customFields.find((f: any) => f.id === 'wuSG63CwYz9EksTUtgH1');
    const repairsField = opportunity.customFields.find((f: any) => f.id === 'had1BxDw5o9zd9i63jrq');

  setSelectedProperty({
    id: opportunity.id,
    name: opportunity.name, // ✅ Add this
    address: opportunity.name, // or use another field if you have a dedicated address field
    arv: arvField?.fieldValueNumber || 0,
    repairs: repairsField?.fieldValueNumber || 0,
  });
    setResults([]);
    setQuery(opportunity.name);
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Start typing an address or property name..."
                className="search-input"
              />
            </div>

            {loading && <div className="text-sm mt-2">Searching...</div>}

            {results.length > 0 && (
              <ul className="border mt-2 rounded-lg bg-white shadow">
                {results.map((op) => (
                  <li
                    key={op.id}
                    onClick={() => handleSelect(op)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {op.name}
                  </li>
                ))}
              </ul>
            )}

            {state.selectedProperty && (
              <div className="selected-property mt-3">
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

        {/* Manual Mode Content (unchanged) */}
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
