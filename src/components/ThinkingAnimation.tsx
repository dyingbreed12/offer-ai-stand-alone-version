// src/components/ThinkingAnimation.tsx

'use client';

import Image from 'next/image';

export const ThinkingAnimation = () => {
  const messages = [
    'Cooking up your disrespect…',
    'Loading seller tears…',
    'Mathing like a dropout…',
    'Insulting the seller in my head…',
    'Loading lowball mode…',
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="content-container">
      <div id="thinking-animation" className="thinking-section">
        <div className="robot-container">
          <div className="robot-head">
            <div className="robot-eyes">
              <div className="robot-eye"></div>
              <div className="robot-eye"></div>
            </div>
            <div className="robot-brain">
              <Image
                src="/images/brain_animated.png"
                alt="Spinning brain icon representing AI processing"
                width={20}
                height={20}
              />
            </div>
          </div>
          <h3 className="thinking-title">Lowball AI is Analyzing Your Property...</h3>
          <p className="thinking-description">
            {randomMessage}
          </p>
          <div className="thinking-dots">
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};