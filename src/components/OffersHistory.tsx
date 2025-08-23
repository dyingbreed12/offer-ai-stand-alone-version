'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { ConfirmationModal } from './ConfirmationModal';

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
      <div className="history-section">
        <div className="history-header">
          <div>
            <h2 className="history-title">Your Saved Offers</h2>
            <p className="history-description">
              Track and manage all your generated offers in one place.
            </p>
          </div>
          <button onClick={handleClearAll} className="clear-all-btn" type="button">
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
                    {offer.offerType === 'cash' ? '💵' : '🎨'}{' '}
                    {offer.offerType.charAt(0).toUpperCase() + offer.offerType.slice(1)} Offer
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
                <div className="offer-amount-display">
                  ${offer.offerAmount.toLocaleString()}
                </div>
                <div className="offer-meta">
                  ARV: ${offer.arv.toLocaleString()} | Repairs: $
                  {offer.repairs.toLocaleString()}
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
                You haven&apos;t generated any offers yet. Create your first professional offer to get started!
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

      {/* Confirmation modal */}
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
