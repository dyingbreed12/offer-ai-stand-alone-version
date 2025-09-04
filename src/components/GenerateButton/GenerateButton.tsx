// src/components/Generate Button/GenerateButton.tsx

'use client';

import propertyInformationStyles from '../PropertyInformation/PropertyInformation.module.css';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const GenerateButton = ({ onClick, disabled }: GenerateButtonProps) => {
  const handleClick = () => {
    console.log('Generate button clicked');
    onClick();
  };

  return (
    <div className={propertyInformationStyles.generateButtonContainer}>
      <button
        className={`${propertyInformationStyles.generateAiBtn} ${disabled ? propertyInformationStyles.disabled : ''}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        <div className={propertyInformationStyles.btnIcon}>🤖</div>
        <span>Generate AI Offer</span>
      </button>
    </div>
  );
};