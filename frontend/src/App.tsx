import { useState } from 'react';
import ModeSelector from './components/ModeSelector';
import LanguageSelector from './components/LanguageSelector';
import Chat from './components/Chat';
import BackButton from './components/BackButton'; // استيراد الكومبوننت
import './App.css';

function App() {
  const [step, setStep] = useState<'mode' | 'language' | 'chat'>('mode');
  const [mode, setMode] = useState<'learning' | 'assistant'>('learning');
  const [language, setLanguage] = useState<string>('');

  const handleSelectMode = (selectedMode: 'learning' | 'assistant') => {
    setMode(selectedMode);
    setStep('language');
  };

  const handleSelectLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setStep('chat');
  };
    const handleBack = () => {
    if (step === 'chat') {
      setStep('language');
    } else if (step === 'language') {
      setStep('mode');
    }
  };

  return (
    <div className="app">
            {/* زر العودة - يظهر فقط إذا لم نكن في الصفحة الأولى */}
      {step !== 'mode' && (
        <BackButton 
          onClick={handleBack}
          label={step === 'chat' ? 'Back to Language' : 'Back to Mode'}
          className="primary"
        />
      )}
      {step === 'mode' && <ModeSelector onSelectMode={handleSelectMode} />}
      {step === 'language' && <LanguageSelector mode={mode} onSelectLanguage={handleSelectLanguage} />}
      {step === 'chat' && <Chat mode={mode} language={language} userId="placeholder" />}
    </div>
  );
}

export default App;
