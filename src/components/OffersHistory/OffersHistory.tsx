'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import styles from './OffersHistory.module.css';

interface OffersHistoryProps {
  showToast: (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string
  ) => void;
}

export const OffersHistory = ({ showToast }: OffersHistoryProps) => {
  const { state, clearAllOffers, deleteOffer, switchTab } = useAppContext();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
    if (state.savedOffers.length === 0) {
      showToast('info', 'No Offers', 'There are no saved offers to clear.');
      return;
    }
    setIsConfirmOpen(true);
  };

  const confirmClearAll = () => {
    clearAllOffers();
    showToast('warning', 'All Offers Deleted', 'All saved offers have been removed.');
    setIsConfirmOpen(false);
  };

  const handleDeleteOffer = (offerId: string) => {
    deleteOffer(offerId);
    showToast('warning', 'Offer Deleted', 'The selected offer has been removed.');
  };

  const handleSwitchToGenerator = () => {
    switchTab('generator');
  };

  if (state.currentTab !== 'history') return null;

  return (
    <div className="content-container">
      <div className={styles.historySection}>
        <div className={styles.historyHeader}>
          <div>
            <h2 className={styles.historyTitle}>Your Saved Offers</h2>
            <p className={styles.historyDescription}>
              Track and manage all your generated offers in one place.
            </p>
          </div>
          <button onClick={handleClearAll} className={styles.clearAllBtn} type="button">
            🗑️ Clear All
          </button>
        </div>

        <div className={styles.historyFilters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Type</label>
            <select
              className={styles.filterSelect}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Offer Types</option>
              <option value="cash">Fix and Flip Offers</option>
              <option value="creative">Seller Finance Offers</option>
              <option value="zestimate">Zillow Offers</option>
              <option value="novation">Novation Offers</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort by</label>
            <select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search Offers</label>
            <input
              type="text"
              placeholder="Search by address or notes..."
              className={styles.filterInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.offersGrid}>
          {filteredAndSortedOffers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.offerCardHeader}>
                <div>
                  <h3 className={styles.offerAddress}>{offer.address}</h3>
                  <div className={styles.offerStatus}>
                    {offer.offerType === 'cash'
                      ? '💵 Fix and Flip '
                      : offer.offerType === 'creative'
                      ? '🎨 Seller Finance '
                      : offer.offerType === 'novation'
                      ? '📝 Novation '
                      : '📊 Zillow '}
                    Offer
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className={styles.deleteBtn}
                  type="button"
                >
                  🗑️
                </button>
              </div>

              <div className={styles.offerCardBody}>
                <div className={styles.offerAmountDisplay}>
                  {offer.offerType === 'creative' ? `$${(offer.monthlyPayment ?? 0).toFixed(2)}` : `$${offer.offerAmount.toLocaleString()}`}
                </div>
                <div className={styles.offerMeta}>
                  {offer.offerType !== 'cash' ? (
                    `As Is Value: $${offer.asIsValue?.toLocaleString()}`
                  ) : (
                    <>
                      ARV: ${offer.arv.toLocaleString()} | Repairs: ${offer.repairs.toLocaleString()}
                    </>
                  )}
                </div>

                {offer.offerType === 'creative' && (
                  <div className={styles.offerMetaDetails}>
                    <div className={styles.offerMetaRow}>
                      <span>Downpayment:</span>
                      <span>${offer.downPayment?.toLocaleString()}</span>
                    </div>
                    <div className={styles.offerMetaRow}>
                      <span>Loan Length:</span>
                      <span>{offer.longLengthInMonths} months</span>
                    </div>
                    <div className={styles.offerMetaRow}>
                      <span>Price:</span>
                      <span>${offer.price?.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                <div className={styles.offerDate}>
                  Generated on {new Date(offer.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedOffers.length === 0 && (
          <div className={styles.emptyOffers}>
            <Image
              src="/images/saved_folder.png"
              alt="Empty folder representing no saved offers"
              width={60}
              height={60}
            />
            <h3 className={styles.emptyTitle}>No Offers Saved Yet</h3>
            <p className={styles.emptyDescription}>
              You haven&apos;t generated any offers yet. Create your first professional offer to get started!
            </p>
            <button
              className={styles.emptyActionBtn}
              onClick={handleSwitchToGenerator}
              type="button"
            >
              🤖 Generate First Offer
            </button>
          </div>
        )}
      </div>

      {isConfirmOpen && (
        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmClearAll}
          title="Confirm Clear All"
          message="Are you sure you want to delete all saved offers? This action cannot be undone."
          confirmText="Delete All"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};