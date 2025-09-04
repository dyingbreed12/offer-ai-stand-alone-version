// src/components/PropertyInformation.tsx

'use client';

import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { Opportunity, Property, CustomField } from '@/lib/types';
import styles from './PropertyInformation.module.css';

// Custom Field IDs from Assigns CRM
const arvFieldId = 'wuSG63CwYz9EksTUtgH1';
const repairsFieldId = 'had1BxDw5o9zd9i63jrq';
const asIsValueFieldId = 'IT8geFyC4iOWzVyyAjvh';

export const PropertyInformation = () => {
  const { state, setSearchMode, setSelectedProperty } = useAppContext();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  // New state for As Is Value input
  const [manualAddress, setManualAddress] = useState('');
  const [manualArv, setManualArv] = useState<number | ''>('');
  const [manualRepairs, setManualRepairs] = useState<number | ''>('');
  const [manualAsIsValue, setManualAsIsValue] = useState<number | ''>('');
//  const [manualNotes, setManualNotes] = useState('');

  const handleSearchModeClick = (mode: 'search' | 'manual') => {
    setSearchMode(mode);
    if (mode === 'manual') {
      setSelectedProperty(null);
    }
  };

  const clearSelection = () => {
    setSelectedProperty(null);
    setQuery('');
    setResults([]);
  };

  useEffect(() => {
    if (state.searchMode === 'manual') {
      const isCreativeNovationZestimate = ['creative', 'novation', 'zestimate'].includes(
        state.offerType
      );

      if (isCreativeNovationZestimate) {
        if (manualAddress && manualAsIsValue !== '') {
          const property: Property = {
            id: 'manual-entry',
            name: manualAddress,
            address: manualAddress,
            arv: 0,
            repairs: 0,
            asIsValue: Number(manualAsIsValue),
          };
          setSelectedProperty(property);
        } else {
          setSelectedProperty(null);
        }
      } else {
        if (manualAddress && manualArv !== '' && manualRepairs !== '') {
          const property: Property = {
            id: 'manual-entry',
            name: manualAddress,
            address: manualAddress,
            arv: Number(manualArv),
            repairs: Number(manualRepairs),
          };
          setSelectedProperty(property);
        } else {
          setSelectedProperty(null);
        }
      }
    }
  }, [manualAddress, manualArv, manualRepairs, manualAsIsValue, state.searchMode, state.offerType, setSelectedProperty]);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/opportunities?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data.opportunities) ? data.opportunities : []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (opportunity: Opportunity) => {
    const arvField: CustomField | undefined = opportunity.customFields.find(
      (f) => f.id === arvFieldId
    );
    const repairsField: CustomField | undefined = opportunity.customFields.find(
      (f) => f.id === repairsFieldId
    );
    const asIsValueField: CustomField | undefined = opportunity.customFields.find(
      (f) => f.id === asIsValueFieldId
    );

    const property: Property = {
      id: opportunity.id,
      name: opportunity.name,
      address: opportunity.name,
      arv: arvField?.fieldValueNumber ?? 0,
      repairs: repairsField?.fieldValueNumber ?? 0,
      asIsValue: asIsValueField?.fieldValueNumber ?? undefined,
    };

    setSelectedProperty(property);
    setResults([]);
    setQuery(opportunity.name);
  };

  const isCreativeNovationZestimate = ['creative', 'novation', 'zestimate'].includes(
    state.offerType
  );

  return (
    <div className="content-container">
      <div className={styles.propertyInfoSection}>
        <div className="section-header-centered">
          <h2 className="section-title">Property Information</h2>
          <p className="section-description">
            Put the numbers in. Get your f*ing lowball offer.
          </p>
        </div>

        {/* Feature Toggle: Only show search/manual buttons if NEXT_PUBLIC_ENABLE_SEARCH_TOGGLE is true */}
        {process.env.NEXT_PUBLIC_ENABLE_SEARCH_TOGGLE === 'true' && (
          <div className={styles.searchModeToggle}>
            <button
              className={`${styles.modeToggleBtn} ${state.searchMode === 'search' ? styles.active : ''}`}
              onClick={() => handleSearchModeClick('search')}
              type="button"
            >
              <div className={styles.modeIcon}>🔍</div>
              <span>Search Deals</span>
            </button>
            <button
              className={`${styles.modeToggleBtn} ${state.searchMode === 'manual' ? styles.active : ''}`}
              onClick={() => handleSearchModeClick('manual')}
              type="button"
            >
              <div className={styles.modeIcon}>✋</div>
              <span>Manual Entry</span>
            </button>
          </div>
        )}

        {/* Search Mode Content */}
        {state.searchMode === 'search' && (
          <div className={styles.searchContent}>
            <div className={styles.searchInputGroup}>
              <label className="search-label" htmlFor="address-search">
                Search Address
              </label>
              <input
                type="text"
                id="address-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Start typing an address or property name..."
                className={styles.searchInput}
              />
            </div>
            {loading && <div className="text-sm mt-2">Searching...</div>}
            {!loading && !state.selectedProperty && results.length > 0 && (
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
              <div className={`${styles.selectedProperty} mt-3`}>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyIcon}>🏠</div>
                  <div className={styles.propertyDetails}>
                    <h3 className={styles.propertyAddress}>{state.selectedProperty.address}</h3>
                    <p className={styles.propertyMeta}>
                      {state.offerType === 'cash' ? (
                        <>
                          ARV: ${state.selectedProperty.arv?.toLocaleString() || '0'} | Repairs: $
                          {state.selectedProperty.repairs?.toLocaleString() || '0'}
                        </>
                      ) : (
                        `As Is Value: $${state.selectedProperty.asIsValue?.toLocaleString() || '0'}`
                      )}
                    </p>
                  </div>
                </div>
                <button className={styles.clearBtn} onClick={clearSelection} type="button">
                  ✕ Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* Manual Mode Content */}
        {state.searchMode === 'manual' && (
          <div className={styles.manualContent}>
            <div className={styles.manualFormGrid}>
              <div className={styles.formField}>
                <label htmlFor="manual-address" className={styles.fieldLabel}>
                  Property Address
                </label>
                <input
                  type="text"
                  id="manual-address"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="123 Main St, Anytown"
                  className={styles.fieldInput}
                />
              </div>
              {state.offerType === 'cash' && (
                <>
                  <div className={styles.formField}>
                    <label htmlFor="manual-arv" className={styles.fieldLabel}>
                      ARV (After Repair Value)
                    </label>
                    <div className={styles.inputWithPrefix}>
                      <span className={styles.inputPrefix}>$</span>
                      <input
                        type="number"
                        id="manual-arv"
                        value={manualArv}
                        onChange={(e) => setManualArv(e.target.value ? Number(e.target.value) : '')}
                        placeholder="250,000"
                        step={1000}
                        className={`${styles.fieldInput} ${styles.withPrefix}`}
                      />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="manual-repairs" className={styles.fieldLabel}>
                      Estimated Repair Costs
                    </label>
                    <div className={styles.inputWithPrefix}>
                      <span className={styles.inputPrefix}>$</span>
                      <input
                        type="number"
                        id="manual-repairs"
                        value={manualRepairs}
                        onChange={(e) => setManualRepairs(e.target.value ? Number(e.target.value) : '')}
                        placeholder="25,000"
                        step={1000}
                        className={`${styles.fieldInput} ${styles.withPrefix}`}
                      />
                    </div>
                  </div>
                </>
              )}
              {isCreativeNovationZestimate && (
                <div className={styles.formField}>
                  <label htmlFor="manual-asisvalue" className={styles.fieldLabel}>
                    As Is Value
                  </label>
                  <div className={styles.inputWithPrefix}>
                    <span className={styles.inputPrefix}>$</span>
                    <input
                      type="number"
                      id="manual-asisvalue"
                      value={manualAsIsValue}
                      onChange={(e) => setManualAsIsValue(e.target.value ? Number(e.target.value) : '')}
                      placeholder="250,000"
                      step={1000}
                      className={`${styles.fieldInput} ${styles.withPrefix}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};