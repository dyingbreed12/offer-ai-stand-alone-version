// src/context/AppContext.tsx

'use client';

import React, { createContext, useReducer, useContext, useEffect, useState, useCallback } from 'react';
import { AppState, AppAction, AppContextType, Offer, OfferType } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { v4 as uuidv4 } from 'uuid'; // ✅ for guaranteed unique IDs

// Initial state
const initialState: AppState = {
  offerType: 'cash',
  searchMode: 'search',
  selectedProperty: null,
  isProcessing: false,
  currentTab: 'generator',
  currentOffer: null,
  savedOffers: [],
};

// Reducer function
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
      // ❌ Do not persist here
      return { ...state, currentOffer: action.payload };
    case 'ADD_SAVED_OFFER': {
      const newOffers = [action.payload, ...state.savedOffers];
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(newOffers));
      return { ...state, savedOffers: newOffers };
    }
    case 'SET_SAVED_OFFERS':
      return { ...state, savedOffers: action.payload };
    case 'DELETE_SAVED_OFFER': {
      const filteredOffers = state.savedOffers.filter(o => o.id !== action.payload);
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(filteredOffers));
      return { ...state, savedOffers: filteredOffers };
    }
    case 'CLEAR_ALL_OFFERS':
      localStorage.removeItem(STORAGE_KEYS.OFFERS);
      return { ...state, savedOffers: [] };
    default:
      return state;
  }
};

// Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (storedOffers) {
        dispatch({ type: 'SET_SAVED_OFFERS', payload: JSON.parse(storedOffers) });
      }
    } catch (error) {
      console.error("Failed to load offers from localStorage:", error);
      dispatch({ type: 'SET_SAVED_OFFERS', payload: [] });
    }
  }, []);

  // Actions
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

  // ✅ Always return an Offer (never null)
  const saveOffer = useCallback((offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>): Offer => {
    const newOffer: Offer = {
      id: uuidv4(), // unique ID instead of Date.now()
      ...offerData,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    dispatch({ type: 'ADD_SAVED_OFFER', payload: newOffer });
    return newOffer;
  }, []);

  const getSavedOffers = useCallback((): Offer[] => {
    return state.savedOffers;
  }, [state.savedOffers]);

  const deleteOffer = useCallback((offerId: string) => {
    dispatch({ type: 'DELETE_SAVED_OFFER', payload: offerId });
  }, []);

  const clearAllOffers = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_OFFERS' });
  }, []);

  const updateOfferCount = useCallback(() => {
    // Count is derived from state.savedOffers.length
  }, []);

  const contextValue: AppContextType = {
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
    updateOfferCount,
  };

  if (!isClient) return null;

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
