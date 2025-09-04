// src/app/page.tsx

'use client';

import { useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Offer } from '@/lib/types';

// Components
import { HeroSection } from '@/components/Hero/HeroSection';
import { NavigationTabs } from '@/components/Navigation/NavigationTabs';
import { OfferTypeSelection } from '@/components/OfferTypeSelection/OfferTypeSelection';
import { PropertyInformation } from '@/components/PropertyInformation/PropertyInformation';
import { GenerateButton } from '@/components/GenerateButton/GenerateButton';
import { ThinkingAnimation } from '@/components/ThinkingAnimation/ThinkingAnimation';
import { OfferResults } from '@/components/OfferResults/OfferResults';
import { Footer } from '@/components/Footer/Footer';
import { OffersHistory } from '@/components/OffersHistory/OffersHistory';
import { ToastContainer } from '@/components/ToastContainer/ToastContainer';

// Shared interface for property input
interface PropertyData {
  address: string;
  arv: number;
  repairs: number;
  notes?: string;
  asIsValue?: number;
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

  const validateInputs = useCallback(() => {
    if (state.searchMode === 'search') {
      return state.selectedProperty !== null;
    } else {
      const arv = parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value);
      const asIsValue = parseFloat((document.getElementById('manual-asisvalue') as HTMLInputElement)?.value);

      if (['creative', 'novation', 'zestimate'].includes(state.offerType)) {
        return !isNaN(asIsValue) && asIsValue > 0;
      }

      const repairs = parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value);

      return !isNaN(arv) && arv > 0 && !isNaN(repairs) && repairs >= 0;
    }
  }, [state.searchMode, state.selectedProperty, state.offerType]);

  const getPropertyData = useCallback((): PropertyData => {
    if (state.searchMode === 'search' && state.selectedProperty) {
      const selectedProp = state.selectedProperty;
      return {
        address: selectedProp.address,
        arv: selectedProp.arv || 0,
        repairs: selectedProp.repairs || 0,
        notes: selectedProp.name || '',
        asIsValue: selectedProp.asIsValue || 0,
      };
    } else {
      const manualDownPaymentEl = document.getElementById('manual-downpayment') as HTMLInputElement | null;
      const manualDownPayment = manualDownPaymentEl ? parseFloat(manualDownPaymentEl.value) : undefined;
      const addressValue = (document.getElementById('manual-address') as HTMLInputElement)?.value.trim() || '';

      if (['creative', 'novation', 'zestimate'].includes(state.offerType)) {
        return {
          address: addressValue,
          arv: 0,
          repairs: 0,
          notes: (document.getElementById('manual-notes') as HTMLInputElement)?.value.trim() || '',
          asIsValue: parseFloat((document.getElementById('manual-asisvalue') as HTMLInputElement)?.value) || 0,
          manualDownPayment: !isNaN(manualDownPayment!) ? manualDownPayment : undefined,
        };
      } else {
        return {
          address: addressValue,
          arv: parseFloat((document.getElementById('manual-arv') as HTMLInputElement)?.value) || 0,
          repairs: parseFloat((document.getElementById('manual-repairs') as HTMLInputElement)?.value) || 0,
          notes: (document.getElementById('manual-notes') as HTMLInputElement)?.value.trim() || '',
          manualDownPayment: !isNaN(manualDownPayment!) ? manualDownPayment : undefined,
        };
      }
    }
  }, [state.searchMode, state.selectedProperty, state.offerType]);

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
      offerAmount -= 30000;
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

  const calculateCreativeOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const asIsValue = propertyData.asIsValue ?? 0;
      const longLengthInMonths = 360;
      const downPayment = asIsValue * 1.1 * 0.05;
      const price = asIsValue * 1.1;
      const monthlyPayment = ((asIsValue - downPayment) * 1.1) / longLengthInMonths;
      const offerAmount = Math.round(monthlyPayment);
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

  const calculateNovationOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const asIsValue = propertyData.asIsValue ?? 0;
      const offerAmount = 0.9 * asIsValue - 40000;
      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        offerType: state.offerType,
        asIsValue,
      };
    },
    [state.offerType]
  );

  const calculateZestimateOffer = useCallback(
    (propertyData: PropertyData): OfferPartial => {
      const asIsValue = propertyData.asIsValue ?? 0;
      const offerAmount = 0.65 * asIsValue;
      return {
        ...propertyData,
        offerAmount: Math.round(offerAmount),
        offerType: state.offerType,
        asIsValue,
      };
    },
    [state.offerType]
  );

  const updateLowballOffer = useCallback(async (offerAmount: number) => {
    if (!state.selectedProperty || !state.selectedProperty.id || state.selectedProperty.id === 'manual-entry') {
      console.warn('No valid opportunity selected to update.');
      return;
    }
    const opportunityId = state.selectedProperty.id;
    const maxRetries = 3;
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const response = await fetch('/api/opportunities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            opportunityId: opportunityId,
            customFieldId: 'l2yfsdwszG1RPku6ROXk',
            field_value: offerAmount,
          }),
        });
        if (response.ok) {
          console.log('Successfully updated custom field for opportunity:', opportunityId);
          return;
        } else {
          const errorData = await response.json();
          console.error(`Attempt ${retries + 1} failed:`, response.status, errorData);
          retries++;
          await new Promise(res => setTimeout(res, 1000 * retries));
        }
      } catch (error) {
        console.error(`API call error on attempt ${retries + 1}:`, error);
        retries++;
        await new Promise(res => setTimeout(res, 1000 * retries));
      }
    }
    console.error(`Failed to update custom field after ${maxRetries} attempts.`);
    showToast('error', 'Update Failed', `Could not update the CRM after ${maxRetries} attempts.`);
  }, [state.selectedProperty, showToast]);

  const processOffer = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const propertyData = getPropertyData();
    let partial: OfferPartial;
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
    if (state.selectedProperty && state.selectedProperty.id && state.selectedProperty.id !== 'manual-entry') {
      await updateLowballOffer(partial.offerAmount);
    }
    const previewOffer: Offer = {
      id: `preview-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...partial,
    };
    setCurrentOffer(previewOffer);
    setIsProcessing(false);
  }, [
    state.offerType,
    state.selectedProperty,
    getPropertyData,
    calculateCreativeOffer,
    calculateNovationOffer,
    calculateZestimateOffer,
    calculateOffer,
    updateLowballOffer,
    setCurrentOffer,
    setIsProcessing,
  ]);

  const generateOffer = useCallback(() => {
    if (!validateInputs() || state.isProcessing) {
      console.log('Validation failed or already processing');
      return;
    }
    setIsProcessing(true);
    processOffer();
  }, [validateInputs, state.isProcessing, setIsProcessing, processOffer]);

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
          {state.isProcessing ? <ThinkingAnimation /> : state.currentOffer && <OfferResults showToast={showToast} />}
          <Footer />
        </div>
      )}
      {state.currentTab === 'history' && <OffersHistory showToast={showToast} />}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};