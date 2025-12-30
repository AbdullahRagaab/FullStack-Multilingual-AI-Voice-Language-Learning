/* eslint-disable @typescript-eslint/no-explicit-any */
 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import styles from './Chat.module.css';


declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  mode: 'learning' | 'assistant';
  language: string;
  userId: string; // placeholder
}

const Chat: React.FC<ChatProps> = ({ mode, language, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string | null>(
    localStorage.getItem(`conversation_${userId}_${mode}_${language}`) || null
  );
  
  const getLangCode = (lang: string) => {
    const codes: { [key: string]: string } = {
      Arabic: 'ar-SA',
      English: 'en-US',
      German: 'de-DE',
      Italian: 'it-IT',
      Spanish: 'es-ES',
    };
    return codes[lang] || 'en-US';
};

const sendMessage = async (message: string) => {
  if (!message.trim()) return;
  const newMessage: Message = { role: 'user', content: message };
  setMessages(prev => [...prev, newMessage]);
  setInput('');

  try {
    const response = await axios.post('https://fullstack-multilingual-ai-voice-language.onrender.com/api/conversation/send', {
      userId,
      mode,
      language,
      message,
      conversationId, // ← هذا هو المفتاح!

    });
        // حفظ الـ conversationId إذا كان أول مرة
    if (!conversationId && response.data.conversationId) {
      setConversationId(response.data.conversationId);
      localStorage.setItem(`conversation_${userId}_${mode}_${language}`, response.data.conversationId);
    }
    const aiMessage: Message = { role: 'assistant', content: response.data.response };
    setMessages(prev => [...prev, aiMessage]);
    speak(aiMessage.content, language);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error('Error sending message');
  }
};

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = getLangCode(language);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };
      rec.onend = () => setIsRecording(false);
      setRecognition(rec);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);



  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLangCode(lang);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    } else {
      toast.error('Speech recognition not supported');
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  // return (
  //   <div className="chat">
  //     <Toaster />
  //     <div className="messages">
  //       {messages.map((msg, index) => (
  //         <div key={index} className={`message ${msg.role}`}>
  //           <p>{msg.content}</p>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="input-area">
  //       <input
  //         type="text"
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         placeholder="Type or speak..."
  //       />
  //       <button onClick={handleSend}>Send</button>
  //       <button onClick={startRecording} disabled={isRecording}>
  //         {isRecording ? 'Recording...' : 'Voice'}
  //       </button>
  //     </div>
  //   </div>
  // );



  return (
  <div className={styles.chat}>
    <Toaster />

    <div className={styles.messages}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            msg.role === 'user' ? styles.user : styles.assistant
          }`}
        >
          <div className={styles.bubble}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>

    <div className={styles.inputArea}>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className={styles.sendBtn} onClick={handleSend}>
        ➤
      </button>
      <button
        className={styles.voiceBtn}
        onClick={startRecording}
        disabled={isRecording}
      >
        🎤
      </button>
    </div>
  </div>
);


};

export default Chat;