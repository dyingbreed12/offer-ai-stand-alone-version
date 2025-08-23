'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';

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
  const getPropertyData = useCallback(() => {
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

  // Offer calculation
  const calculateOffer = useCallback(
    (propertyData: any) => {
      const { arv, repairs } = propertyData;

      let offerAmount;
      let arvPctUsed;
      let holdingCosts;
      let closingCosts;
      let holdingPctUsed;
      let closingPctUsed;

      if (state.offerType === 'cash') {
        arvPctUsed = 0.7;
        holdingPctUsed = 0.02;
        closingPctUsed = 0.03;
      } else {
        arvPctUsed = 0.8;
        holdingPctUsed = 0.015;
        closingPctUsed = 0.025;
      }

      holdingCosts = arv * holdingPctUsed;
      closingCosts = arv * closingPctUsed;
      offerAmount = arv * arvPctUsed - repairs - holdingCosts - closingCosts;
      offerAmount = Math.max(offerAmount, 1000);

      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        arvPctUsed: Math.round(arvPctUsed * 100),
        holdingCosts: Math.round(holdingCosts),
        closingCosts: Math.round(closingCosts),
        holdingPctUsed: Math.round(holdingPctUsed * 100),
        closingPctUsed: Math.round(closingPctUsed * 100),
        offerType: state.offerType,
      };
    },
    [state.offerType]
  );

  // Generate offer
  const generateOffer = useCallback(async () => {
    if (!validateInputs() || state.isProcessing) {
      console.log('Validation failed or already processing');
      return;
    }

    setIsProcessing(true);

    const offerResultsEl = document.getElementById('offer-results');
    const thinkingAnimationEl = document.getElementById('thinking-animation');

    if (offerResultsEl) offerResultsEl.classList.add('hidden');
    if (thinkingAnimationEl) thinkingAnimationEl.classList.remove('hidden');

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const propertyData = getPropertyData();
    const offerData = calculateOffer(propertyData);

    setCurrentOffer(offerData);

    if (thinkingAnimationEl) thinkingAnimationEl.classList.add('hidden');
    if (offerResultsEl) offerResultsEl.classList.remove('hidden');

    setIsProcessing(false);
  }, [validateInputs, state.isProcessing, setIsProcessing, getPropertyData, calculateOffer, setCurrentOffer]);

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
