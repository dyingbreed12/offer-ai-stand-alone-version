'use client';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const GenerateButton = ({ onClick, disabled }: GenerateButtonProps) => {
  const handleClick = () => {
    console.log('Generate button clicked'); // Debug log
    onClick();
  };

  return (
    <div className="generate-button-container">
      <button
        className={`generate-ai-btn ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        <div className="btn-icon">🤖</div>
        <span>Generate AI Offer</span>
      </button>
    </div>
  );
};
