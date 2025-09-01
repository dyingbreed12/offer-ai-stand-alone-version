// src/lib/types.ts

export type OfferType = 'cash' | 'creative' | 'novation' | 'zestimate';
export type SearchMode = 'search' | 'manual';
export type OfferStatus = 'active' | 'pending' | 'archived' | 'new';

export interface Property {
  id: string;
  name: string;
  address: string;
  arv: number;
  repairs: number;
  status?: string;
  // Add asIsValue to the Property interface
  asIsValue?: number;
}

// 🔥 Extended Offer to support both cash + creative
export interface Offer {
  id: string;
  address: string;
  arv: number;
  repairs: number;
  notes?: string;
  offerAmount: number;
  offerType: OfferType;
  createdAt: string;
  status: OfferStatus;

  // Optional fields only used for Creative offers
  asIsValue?: number;
  downPayment?: number;
  price?: number;
  longLengthInMonths?: number;
  monthlyPayment?: number;
}

export interface AppState {
  offerType: OfferType;
  searchMode: SearchMode;
  selectedProperty: Property | null;
  isProcessing: boolean;
  currentTab: 'generator' | 'history';
  currentOffer: Offer | null;
  savedOffers: Offer[];
}

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Functions that will be provided by the context
  switchTab: (tabName: 'generator' | 'history') => void;
  setOfferType: (type: OfferType) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSelectedProperty: (property: Property | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setCurrentOffer: (offer: Offer | null) => void;
  saveOffer: (offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>) => Offer;
  getSavedOffers: () => Offer[];
  deleteOffer: (offerId: string) => void;
  clearAllOffers: () => void;
  updateOfferCount: () => void;
}

export type AppAction =
  | { type: 'SET_OFFER_TYPE'; payload: OfferType }
  | { type: 'SET_SEARCH_MODE'; payload: SearchMode }
  | { type: 'SET_SELECTED_PROPERTY'; payload: Property | null }
  | { type: 'SET_IS_PROCESSING'; payload: boolean }
  | { type: 'SET_CURRENT_TAB'; payload: 'generator' | 'history' }
  | { type: 'SET_CURRENT_OFFER'; payload: Offer | null }
  | { type: 'ADD_SAVED_OFFER'; payload: Offer }
  | { type: 'SET_SAVED_OFFERS'; payload: Offer[] }
  | { type: 'DELETE_SAVED_OFFER'; payload: string }
  | { type: 'CLEAR_ALL_OFFERS' };

export interface CustomField {
  id: string;
  fieldValue?: string;
  fieldValueNumber?: number;
}

export interface Opportunity {
  id: string;
  name: string;
  customFields: CustomField[];
}