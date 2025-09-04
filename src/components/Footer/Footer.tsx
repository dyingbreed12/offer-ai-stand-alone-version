// src/components/Footer/Footer.tsx

'use client';

import styles from './Footer.module.css';

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
    <div className={styles.footerSection}>
      <div className={styles.footerContent}>
        <h4 className={styles.footerTitle}>
          Want the World’s Best Real Estate Wholesaling Calculators?
        </h4>

        <div className={styles.footerDescription}>
          <p>
            Lowball AI is just the start. At WholesaleCalculators.com, you’ll get the ultimate suite of calculators built to help you lock up more contracts and rip bigger spreads.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-8 mt-12">
            <div className={styles.footerTagsContainer}>
              {calculatorTags.map((tag) => (
                <span key={tag} className={styles.footerTag}>
                  {tag}
                </span>
              ))}
            </div>
        </div>

        <a 
          href="https://wholesalecalculators.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mainWholesaleBtn}
        >
          Wholesale Calculators →
        </a>
      </div>
    </div>
  );
};