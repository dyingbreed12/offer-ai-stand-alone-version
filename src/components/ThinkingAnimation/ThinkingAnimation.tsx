// src/components/ThinkingAnimation.tsx

'use client';

import Image from 'next/image';
import styles from './ThinkingAnimation.module.css';

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
      <div id="thinking-animation" className={styles.thinkingSection}>
        <div className={styles.robotContainer}>
          <div className={styles.robotHead}>
            <div className={styles.robotEyes}>
              <div className={styles.robotEye}></div>
              <div className={styles.robotEye}></div>
            </div>
            <div className={styles.robotBrain}>
              <Image
                src="/images/brain_animated.png"
                alt="Spinning brain icon representing AI processing"
                width={20}
                height={20}
              />
            </div>
          </div>
          <h3 className={styles.thinkingTitle}>Lowball AI is Analyzing Your Property...</h3>
          <p className={styles.thinkingDescription}>
            {randomMessage}
          </p>
          <div className={styles.thinkingDots}>
            <div className={styles.thinkingDot}></div>
            <div className={styles.thinkingDot}></div>
            <div className={styles.thinkingDot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};