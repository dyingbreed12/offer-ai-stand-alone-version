// src/context/AppContext.tsx

'use client';

import React, { createContext, useReducer, useContext, useEffect, useState, useCallback } from 'react';
import { AppState, AppAction, AppContextType, Offer, OfferType } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';

// Initial state for the application
const initialState: AppState = {
  offerType: 'cash',
  searchMode: 'search',
  selectedProperty: null,
  isProcessing: false,
  currentTab: 'generator',
  currentOffer: null,
  savedOffers: [], // This will be loaded from localStorage
};

// Reducer function to manage state transitions
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_OFFER_TYPE':
      return { ...state, offerType: action.payload };
    case 'SET_SEARCH_MODE':
      return { ...state, searchMode: action.payload };
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedProperty: action.payload };
    case 'SET_IS_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_CURRENT_TAB':
      return { ...state, currentTab: action.payload };
    case 'SET_CURRENT_OFFER':
      return { ...state, currentOffer: action.payload };
    case 'ADD_SAVED_OFFER':
      // Add new offer to the beginning of the array
      const newOffers = [action.payload, ...state.savedOffers];
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(newOffers));
      return { ...state, savedOffers: newOffers };
    case 'SET_SAVED_OFFERS':
      return { ...state, savedOffers: action.payload };
    case 'DELETE_SAVED_OFFER':
      const filteredOffers = state.savedOffers.filter(offer => offer.id !== action.payload);
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(filteredOffers));
      return { ...state, savedOffers: filteredOffers };
    case 'CLEAR_ALL_OFFERS':
      localStorage.removeItem(STORAGE_KEYS.OFFERS);
      return { ...state, savedOffers: [] };
    default:
      return state;
  }
};

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isClient, setIsClient] = useState(false); // To handle localStorage on client-side only

  // Load saved offers from localStorage on initial client-side render
  useEffect(() => {
    setIsClient(true);
    try {
      const storedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (storedOffers) {
        dispatch({ type: 'SET_SAVED_OFFERS', payload: JSON.parse(storedOffers) });
      }
    } catch (error) {
      console.error("Failed to load offers from localStorage:", error);
      // Fallback to empty array if parsing fails
      dispatch({ type: 'SET_SAVED_OFFERS', payload: [] });
    }
  }, []);

  // Action dispatchers
  const switchTab = useCallback((tabName: 'generator' | 'history') => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: tabName });
  }, []);

  const setOfferType = useCallback((type: OfferType) => {
    dispatch({ type: 'SET_OFFER_TYPE', payload: type });
  }, []);

  const setSearchMode = useCallback((mode: 'search' | 'manual') => {
    dispatch({ type: 'SET_SEARCH_MODE', payload: mode });
  }, []);

  const setSelectedProperty = useCallback((property: AppState['selectedProperty']) => {
    dispatch({ type: 'SET_SELECTED_PROPERTY', payload: property });
  }, []);

  const setIsProcessing = useCallback((processing: boolean) => {
    dispatch({ type: 'SET_IS_PROCESSING', payload: processing });
  }, []);

  const setCurrentOffer = useCallback((offer: AppState['currentOffer']) => {
    dispatch({ type: 'SET_CURRENT_OFFER', payload: offer });
  }, []);

  const saveOffer = useCallback((offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>): Offer => {
    const newOffer: Offer = {
      id: Date.now().toString(),
      ...offerData,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    dispatch({ type: 'ADD_SAVED_OFFER', payload: newOffer });
    return newOffer;
  }, []);

  const getSavedOffers = useCallback((): Offer[] => {
    // This function is primarily for components to read the current state.
    // The actual loading from localStorage is handled by the useEffect above.
    return state.savedOffers;
  }, [state.savedOffers]);

  const deleteOffer = useCallback((offerId: string) => {
    dispatch({ type: 'DELETE_SAVED_OFFER', payload: offerId });
  }, []);

  const clearAllOffers = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_OFFERS' });
  }, []);

  const updateOfferCount = useCallback(() => {
    // This function is now implicitly handled by `state.savedOffers.length`
    // in components that need the count. No direct dispatch needed here.
  }, []);


  const contextValue = {
    state,
    dispatch,
    switchTab,
    setOfferType,
    setSearchMode,
    setSelectedProperty,
    setIsProcessing,
    setCurrentOffer,
    saveOffer,
    getSavedOffers,
    deleteOffer,
    clearAllOffers,
    updateOfferCount, // Kept for compatibility, but its logic is now implicit
  };

  // Only render children if on client-side to avoid localStorage issues during SSR
  if (!isClient) {
    return null;
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
