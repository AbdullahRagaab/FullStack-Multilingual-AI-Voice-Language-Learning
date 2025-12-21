// import React, { useState } from 'react';

// interface LanguageSelectorProps {
//   mode: 'learning' | 'assistant';
//   onSelectLanguage: (language: string) => void;
// }

// const LanguageSelector: React.FC<LanguageSelectorProps> = ({ mode, onSelectLanguage }) => {
//   const [customLanguage, setCustomLanguage] = useState('');

//   const languages = ['Arabic', 'English', 'German', 'Italian', 'Spanish'];

//   return (
//     <div className="language-selector">
//       <h2>Select Language</h2>
//       {mode === 'assistant' ? (
//         <div>
//           {languages.map(lang => (
//             <button key={lang} onClick={() => onSelectLanguage(lang)}>{lang}</button>
//           ))}
//         </div>
//       ) : (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter target language"
//             value={customLanguage}
//             onChange={(e) => setCustomLanguage(e.target.value)}
//           />
//           <button onClick={() => onSelectLanguage(customLanguage)}>Start</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageSelector;














import React, { useState, useEffect } from 'react';
import styles from './LanguageSelector.module.css';
// import BackButton from './BackButton';


interface LanguageSelectorProps {
  mode: 'learning' | 'assistant';
  onSelectLanguage: (language: string) => void;
  onBack?: () => void; // دالة للعودة للخلف
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  mode, 
  onSelectLanguage, 
  // onBack 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [autoStartTimer, setAutoStartTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // اللغات المحددة فقط
  const languages = [
    { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'German', code: 'de', flag: '🇩🇪' },
    { name: 'Italian', code: 'it', flag: '🇮🇹' },
    { name: 'Spanish', code: 'es', flag: '🇪🇸' },
  ];

  // عند اختيار لغة، ابدأ المحادثة تلقائياً بعد 1 ثانية
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    
    // إلغاء أي timer سابق
    if (autoStartTimer) {
      clearTimeout(autoStartTimer);
    }
    
    // بدء timer جديد للبدء التلقائي
    const timer = setTimeout(() => {
      onSelectLanguage(language);
    }, 1000); // 1 ثانية تأخير
    
    setAutoStartTimer(timer);
  };

  // تنظيف timer عند فك تركيب المكون
  useEffect(() => {
    return () => {
      if (autoStartTimer) {
        clearTimeout(autoStartTimer);
      }
    };
  }, [autoStartTimer]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const getModeDescription = () => {
  //   return mode === 'learning' 
  //     ? 'Structured language learning with AI guidance and personalized lessons'
  //     : 'Natural conversation practice with cultural insights and real-time feedback';
  // };

  return (
    <div className={styles.container}>
    {/* زر العودة الداخلي (اختياري)
    {onBack && (
      <BackButton 
        onClick={() => {
          // إلغاء timer إذا كان موجوداً
          if (autoStartTimer) {
            clearTimeout(autoStartTimer);
          }
          onBack();
        }}
        // label="Back"
        className="secondary small"
      />
    )} */}

      <div className={styles.content}>
        {/* Mode Indicator */}
        <div className={styles.modeIndicator}>
          <span className={styles.modeIcon}>
            {mode === 'learning' ? '🎓' : '🤖'}
          </span>
          <span>{mode === 'learning' ? 'Learning Mode' : 'Assistant Mode'}</span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          Choose Your Language
        </h1>
        
        {/* Subtitle */}
        <p className={styles.subtitle}>
          Click on any language to start {mode === 'learning' ? 'learning' : 'chatting'} immediately
        </p>

        {/* Language Grid - 5 لغات فقط */}
        <div className={styles.languageGrid}>
          {languages.map(lang => (
            <div
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.name)}
              className={`${styles.languageCard} ${selectedLanguage === lang.name ? styles.selected : ''}`}
            >
              <div className={styles.flagContainer} data-flag={lang.flag}>
                {lang.flag}
              </div>
              <div>
                <h3 className={styles.languageName}>{lang.name}</h3>
                <p className={styles.languageCode}>{lang.code.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show selected language info */}
        {selectedLanguage && (
          <div className={styles.selectedInfo}>
            <div className={styles.selectedInfoContent}>
              <div className={styles.selectedFlag}>
                {languages.find(l => l.name === selectedLanguage)?.flag}
              </div>
              <div className={styles.selectedText}>
                Starting in <span>1 second</span>...
              </div>
            </div>
          </div>
        )}

        {/* Mode Description */}
        <div className={styles.modeDescription}>
          <div className={styles.modeDescriptionTitle}>
            <span>{mode === 'learning' ? '🎯' : '💬'}</span>
            <span>Quick Start Guide</span>
          </div>
          <p className={styles.modeDescriptionText}>
            Just click on any language above to begin. No need for extra buttons!
            {selectedLanguage && (
              <><br /><strong>Selected: {selectedLanguage}</strong> - Starting automatically...</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;