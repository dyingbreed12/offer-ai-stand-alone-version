'use client';

export const Footer = () => {
  const calculatorTags = [
    'Fix and Flip',
    'Land',
    'Rental',
    'Subject To',
    'Seller Finance Novations',
    'Repair Estimators',
    'Offer Generators',
    'Assignment Fee Analyzer',
    'Deal Evaluator',
    'Something',
  ];

  return (
    <div className="footer-section">
      <div className="footer-content">
        <h4 className="footer-title">
          Want the World’s Best Real Estate Wholesaling Calculators?
        </h4>

        <div className="footer-description">
          <p>
            Lowball AI is just the start. At WholesaleCalculators.com, you’ll get the ultimate suite of calculators built to help you lock up more contracts and rip bigger spreads.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-8 mt-12">
            <div className="footer-tags-container">
              {calculatorTags.map((tag) => (
                <span key={tag} className="footer-tag">
                  {tag}
                </span>
              ))}
            </div>
        </div>

        <a 
          href="https://wholesalecalculators.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="main-wholesale-btn"
        >
          Wholesale Calculators →
        </a>
      </div>
    </div>
  );
};