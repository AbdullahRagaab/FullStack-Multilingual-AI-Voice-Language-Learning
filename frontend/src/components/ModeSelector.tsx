// import React from 'react';

// interface ModeSelectorProps {
//   onSelectMode: (mode: 'learning' | 'assistant') => void;
// }

// const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
//   return (
//     <div className="mode-selector">
//       <h2>Select Mode</h2>
//       <button onClick={() => onSelectMode('learning')}>Learning Mode</button>
//       <button onClick={() => onSelectMode('assistant')}>Assistant Mode</button>
//     </div>
//   );
// };

// export default ModeSelector;











import React from 'react';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
  onSelectMode: (mode: 'learning' | 'assistant') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className={styles.container}>
      {/* العنوان الرئيسي */}
      <h1 className={styles.title}>
        PolyVoice AI
      </h1>
      
      {/* العنوان الفرعي */}
      <p className={styles.subtitle}>
        Choose your AI learning experience. Master languages through intelligent conversation and personalized guidance.
      </p>
      
      {/* أزرار الاختيار */}
      <div className={styles.buttonsContainer}>
        {/* زر Learning Mode */}
        <button
          onClick={() => onSelectMode('learning')}
          className={`${styles.button} ${styles.learningButton}`}
        >
          <div className={styles.buttonContent}>
            <div className={styles.iconContainer}>
              <span>🎓</span>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.buttonTitle}>Learning Mode</div>
              <div className={styles.buttonDescription}>
                Structured lessons with grammar and vocabulary
              </div>
            </div>
          </div>
          <span className={styles.arrow}>→</span>
        </button>
        
        {/* زر Assistant Mode */}
        <button
          onClick={() => onSelectMode('assistant')}
          className={`${styles.button} ${styles.assistantButton}`}
        >
          <div className={styles.buttonContent}>
            <div className={styles.iconContainer}>
              <span>🤖</span>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.buttonTitle}>Assistant Mode</div>
              <div className={styles.buttonDescription}>
                Natural conversation practice and cultural insights
              </div>
            </div>
          </div>
          <span className={styles.arrow}>→</span>
        </button>
      </div>
      
      {/* المميزات */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🗣️</span>
          <div className={styles.featureText}>Voice Recognition</div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🌍</span>
          <div className={styles.featureText}>Multiple Languages</div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>📊</span>
          <div className={styles.featureText}>Progress Tracking</div>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>⚡</span>
          <div className={styles.featureText}>Real-time Feedback</div>
        </div>
      </div>
      
      {/* التذييل */}
      <div className={styles.footer}>
        <p>Switch modes anytime • Your conversations are saved automatically</p>
      </div>
    </div>
  );
};

export default ModeSelector;








