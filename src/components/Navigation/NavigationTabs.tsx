// src/components/NavigationTabs.tsx

'use client';

import { useAppContext } from '@/context/AppContext';
import styles from './NavigationTabs.module.css';

export const NavigationTabs = () => {
  const { state, switchTab } = useAppContext();
  const offerCount = state.savedOffers.length;

  const handleTabClick = (tab: 'generator' | 'history') => {
    console.log('Tab clicked:', tab);
    switchTab(tab);
  };

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navTabsWrapper}>
        <button
          className={`${styles.navTab} ${state.currentTab === 'generator' ? styles.active : ''}`}
          onClick={() => handleTabClick('generator')}
          type="button"
        >
          <div className={styles.navTabIcon}>🤖</div>
          <span>Generate Offer</span>
        </button>
        <button
          className={`${styles.navTab} ${state.currentTab === 'history' ? styles.active : ''}`}
          onClick={() => handleTabClick('history')}
          type="button"
        >
          <div className={styles.navTabIcon}>📋</div>
          <span>View Offers ({offerCount})</span>
        </button>
      </div>
    </div>
  );
};