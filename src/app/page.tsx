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
  manualDownPayment?: number;
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

  // ✅ Updated Validation function
  const validateInputs = useCallback(() => {
    if (state.searchMode === 'search') {
      return state.selectedProperty !== null;
    } else { // Manual mode
      const arv = parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value);
      
      // Validation for Creative, Novation, and Zestimate (only ARV required)
      if (['creative', 'novation', 'zestimate'].includes(state.offerType)) {
        return !isNaN(arv) && arv > 0;
      }
      
      // Validation for Cash Offer (ARV and Repairs required)
      const repairs = parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value);
      
      return !isNaN(arv) && arv > 0 && !isNaN(repairs) && repairs >= 0;
    }
  }, [state.searchMode, state.selectedProperty, state.offerType]);

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
      const manualDownPaymentEl = document.getElementById('manual-downpayment') as HTMLInputElement | null;
      const manualDownPayment = manualDownPaymentEl ? parseFloat(manualDownPaymentEl.value) : undefined;
      
      const repairsValue = state.offerType === 'creative' ? 0 : parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value) || 0;
      const addressValue = (document.getElementById('manual-address') as HTMLInputElement)?.value.trim() || '';

      return {
        address: addressValue,
        arv: parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value) || 0,
        repairs: repairsValue,
        notes: (document.getElementById('manual-notes') as HTMLInputElement)?.value.trim() || '',
        manualDownPayment: !isNaN(manualDownPayment!) ? manualDownPayment : undefined,
      };
    }
  }, [state.searchMode, state.selectedProperty, state.offerType]);

  // Cash Offer Calculation
  const calculateOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const { arv, repairs, manualDownPayment } = propertyData;

      let offerAmount = arv * 0.9;

      if (repairs < 30000) {
        offerAmount -= repairs + 30000;
      } else if (repairs > arv * 0.1) {
        offerAmount -= arv * 0.1 * 2 + (repairs - arv * 0.1) * 1.5;
      } else {
        offerAmount -= repairs * 2;
      }

      offerAmount -= 20000;

      // Ensure minimum > 0
      offerAmount = Math.max(offerAmount, 1000);

      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        offerType: state.offerType,
        downPayment: manualDownPayment ?? Math.round(offerAmount * 0.1),
      };
    },
    [state.offerType]
  );

    // Creative Offer Calculation
  const calculateCreativeOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const { arv } = propertyData;
      const asIsValue = arv ?? 0;
      const longLengthInMonths = 360;

      // ✅ UPDATED: Calculation for downPayment based on the new formula
      const downPayment = asIsValue * 1.1 * 0.05;
      const price = asIsValue * 1.1;
      const monthlyPayment = ((asIsValue - downPayment) * 1.1) / longLengthInMonths;

      const offerAmount = Math.round(monthlyPayment); // Final offer = monthly payment

      return {
        ...propertyData,
        offerAmount,
        arvPctUsed: 110,
        offerType: state.offerType,
        asIsValue,
        downPayment: Math.round(downPayment),
        price: Math.round(price),
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        longLengthInMonths,
      };
    },
    [state.offerType]
  );

  // New Novation Offer Calculation
  const calculateNovationOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const { arv } = propertyData;
      const offerAmount = 0.9 * arv - 40000;

      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        offerType: state.offerType,
      };
    },
    [state.offerType]
  );

  // New Zestimate Offer Calculation
  const calculateZestimateOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const { arv } = propertyData;
      const offerAmount = 0.65 * arv;

      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
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

    offerResultsEl?.classList.add('hidden');
    thinkingAnimationEl?.classList.remove('hidden');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const propertyData = getPropertyData();

    let partial: OfferPartial;

    console.log('state.offerType:', state.offerType);
    switch (state.offerType) {
      case 'creative':
        partial = calculateCreativeOffer(propertyData);
        break;
      case 'novation':
        partial = calculateNovationOffer(propertyData);
        break;
      case 'zestimate':
        partial = calculateZestimateOffer(propertyData);
        break;
      default:
        partial = calculateOffer(propertyData);
        break;
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
    calculateNovationOffer,
    calculateZestimateOffer,
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
        {<ThinkingAnimation />}
        {!state.isProcessing && state.currentOffer && <OfferResults showToast={showToast} />}
        <Footer />
    </div>
    )}

      <OffersHistory showToast={showToast} />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}