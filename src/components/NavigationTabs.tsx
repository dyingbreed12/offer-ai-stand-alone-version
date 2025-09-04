// src/components/NavigationTabs.tsx

'use client';

import { useAppContext } from '@/context/AppContext';

export const NavigationTabs = () => {
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
