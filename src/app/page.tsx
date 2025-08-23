// src/app/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Offer } from '@/lib/types';

// Components
import { HeroSection } from '@/components/HeroSection';
import { NavigationTabs } from '@/components/NavigationTabs';
import { OfferTypeSelection } from '@/components/OfferTypeSelection';
import { PropertyInformation } from '@/components/PropertyInformation';
import { GenerateButton } from '@/components/GenerateButton';
import { ThinkingAnimation } from '@/components/ThinkingAnimation';
import { OfferResults } from '@/components/OfferResults';
import { Footer } from '@/components/Footer';
import { OffersHistory } from '@/components/OffersHistory';
import { ToastContainer } from '@/components/ToastContainer';

// Shared interface for property input
interface PropertyData {
  address: string;
  arv: number;
  repairs: number;
  notes?: string;
}

// For creative calculation return type
interface CreativeOfferExtras {
  arvPctUsed: number;
  asIsValue: number;
  downPayment: number;
  price: number;
  monthlyPayment: number;
  longLengthInMonths: number;
}

type OfferPartial = Omit<Offer, 'id' | 'createdAt' | 'status'> & Partial<CreativeOfferExtras>;

export default function Home() {
  const { state, setIsProcessing, setCurrentOffer } = useAppContext();

  const [toasts, setToasts] = useState<
    Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }>
  >([]);

  const showToast = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Validation function
  const validateInputs = useCallback(() => {
    if (state.searchMode === 'search') {
      return state.selectedProperty !== null;
    } else {
      const address = (document.getElementById('manual-address') as HTMLInputElement)?.value.trim();
      const arv = parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value);
      const repairs = parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value);

      return address && !isNaN(arv) && arv > 0 && !isNaN(repairs) && repairs >= 0;
    }
  }, [state.searchMode, state.selectedProperty]);

  // Get property data
  const getPropertyData = useCallback((): PropertyData => {
    if (state.searchMode === 'search' && state.selectedProperty) {
      return {
        address: state.selectedProperty.address,
        arv: state.selectedProperty.arv || 0,
        repairs: state.selectedProperty.repairs || 0,
        notes: state.selectedProperty.name || '',
      };
    } else {
      return {
        address: (document.getElementById('manual-address') as HTMLInputElement)?.value.trim() || '',
        arv: parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value) || 0,
        repairs: parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value) || 0,
        notes: (document.getElementById('manual-notes') as HTMLInputElement)?.value.trim() || '',
      };
    }
  }, [state.searchMode, state.selectedProperty]);

  // Cash Offer Calculation
  const calculateOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const { arv, repairs } = propertyData;

      let offerAmount = arv * 0.9;

      if (repairs < 30000) {
        offerAmount -= (repairs + 30000);
      } else if (repairs > arv * 0.1) {
        offerAmount -= ((arv * 0.1) * 2 + (repairs - arv * 0.1) * 1.5);
      } else {
        offerAmount -= (repairs * 2);
      }

      offerAmount -= 20000;

      // Ensure minimum > 0
      offerAmount = Math.max(offerAmount, 1000);

      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        offerType: state.offerType,
      };
    },
    [state.offerType]
  );

  // Creative Offer Calculation
  const calculateCreativeOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const asIsValue = propertyData.arv ?? 0; 
      const longLengthInMonths = 360;

      const downpayment = asIsValue * 1.1 * 0.1;
      const price = asIsValue;
      const monthlyPayment = ((asIsValue - downpayment) * 1.1) / longLengthInMonths;

      const offerAmount = Math.round(price);

      return {
        ...propertyData,
        offerAmount,
        arvPctUsed: 110,
        offerType: state.offerType,
        asIsValue,
        downPayment: Math.round(downpayment),
        price: Math.round(price),
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        longLengthInMonths,
      };
    },
    [state.offerType]
  );

  // Generate offer (preview only — do NOT save here)
  const generateOffer = useCallback(async () => {
    if (!validateInputs() || state.isProcessing) {
      console.log('Validation failed or already processing');
      return;
    }

    setIsProcessing(true);

    const offerResultsEl = document.getElementById('offer-results');
    const thinkingAnimationEl = document.getElementById('thinking-animation');

    offerResultsEl?.classList.add('hidden');
    thinkingAnimationEl?.classList.remove('hidden');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const propertyData = getPropertyData();

    let partial: OfferPartial;
    if (state.offerType === 'creative') {
      partial = calculateCreativeOffer(propertyData);
    } else {
      partial = calculateOffer(propertyData);
    }

    const previewOffer: Offer = {
      id: `preview-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...partial,
    };

    setCurrentOffer(previewOffer);

    thinkingAnimationEl?.classList.add('hidden');
    offerResultsEl?.classList.remove('hidden');

    setIsProcessing(false);
  }, [
    validateInputs,
    state.isProcessing,
    setIsProcessing,
    getPropertyData,
    calculateOffer,
    calculateCreativeOffer,
    setCurrentOffer,
    state.offerType,
  ]);

  const isButtonDisabled = !validateInputs() || state.isProcessing;

  return (
    <div className="app-container">
      <HeroSection />
      <NavigationTabs />

      {state.currentTab === 'generator' && (
        <div className="generator-content">
          <OfferTypeSelection />
          <PropertyInformation />
          <GenerateButton onClick={generateOffer} disabled={isButtonDisabled} />
          <ThinkingAnimation />
          <OfferResults showToast={showToast} />
          <Footer />
        </div>
      )}

      <OffersHistory showToast={showToast} />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
