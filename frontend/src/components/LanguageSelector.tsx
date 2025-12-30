import React, { useState, useEffect } from 'react';
import styles from './LanguageSelector.module.css';


interface LanguageSelectorProps {
  mode: 'learning' | 'assistant';
  onSelectLanguage: (language: string) => void;
  onBack?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  mode, 
  onSelectLanguage, 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [autoStartTimer, setAutoStartTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const languages = [
    { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'German', code: 'de', flag: '🇩🇪' },
    { name: 'Italian', code: 'it', flag: '🇮🇹' },
    { name: 'Spanish', code: 'es', flag: '🇪🇸' },
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    
    if (autoStartTimer) {
      clearTimeout(autoStartTimer);
    }
    
    const timer = setTimeout(() => {
      onSelectLanguage(language);
    }, 1000); 
    
    setAutoStartTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (autoStartTimer) {
        clearTimeout(autoStartTimer);
      }
    };
  }, [autoStartTimer]);

  return (
    <div className={styles.container}>


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
            Just click on any language above to begin.
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