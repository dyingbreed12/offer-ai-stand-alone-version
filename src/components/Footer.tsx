'use client';

// A complete, styled footer component for the Lowball AI application.
export const Footer = () => (
  // Main container with dark background, rounded corners, and centered content.
  <div className="bg-gray-800 rounded-xl p-8 max-w-xl mx-auto my-12 shadow-xl">
    <div className="footer-section">
      <div className="footer-content text-center">
        {/* Title of the footer section */}
        <h4 className="footer-title text-3xl font-bold text-white mb-8">
          Want the World’s Best Real Estate Wholesaling Calculators?
        </h4>
        {/* Description section, now with centered content and more spacing */}
        <div className="footer-description flex flex-col items-center justify-center">
          <p className="text-gray-300 mb-4">
            Lowball AI is just the start. At WholesaleCalculators.com, you’ll get the ultimate suite of calculators built
          </p>
          <p className="text-gray-300 mb-4">
            to help you lock up more contracts and rip bigger spreads.
          </p>

          <br></br>
          <p className="text-gray-300 font-semibold mb-4">
            Fix and Flip, Land, Rental, Subject To, Seller Finance Novations
          </p>
          <br></br>
          <p className="text-gray-300 font-semibold mb-4">
            Repair Estimators, Offer Generators, Assignment Fee Analyzer, Deal Evaluator
          </p>
          <br></br>
          <p className="text-gray-300 font-semibold mb-8">
            ... and much more
          </p>
          <br></br>
          <button
            className="action-btn wholesale-calc bg-lime-400 py-4 px-10 rounded-full font-bold text-lg text-black hover:bg-lime-300 transition-colors duration-200"
            type="button"
          >
            Wholesale Calculators
          </button>
        </div>
      </div>
    </div>
  </div>
);
