import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, MessageCircle, Mic, MicOff, Send } from 'lucide-react';

export default function VoiceAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m your Shiksha AI Assistant. Try saying:\n\n\u2022 "Show me medical universities in Russia"\n\u2022 "Universities in Georgia"\n\u2022 "Affordable universities under $5,000"\n\u2022 "Language courses in Uzbekistan"\n\u2022 "Engineering programs in Azerbaijan"' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) || voices.find(v => v.lang.startsWith('en'));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const processCommand = useCallback(async (input) => {
    const lower = input.toLowerCase().trim();
    let response = '';

    // Navigation commands
    if (lower.includes('go to') || lower.includes('open') || lower.includes('show me')) {
      if (lower.includes('test')) { navigate('/tests'); return 'Navigating to Mock Tests!'; }
      if (lower.includes('material') || lower.includes('study')) { navigate('/materials'); return 'Navigating to Study Materials!'; }
      if (lower.includes('payment') || lower.includes('pay')) { navigate('/payments'); return 'Navigating to Payments!'; }
      if (lower.includes('document')) { navigate('/documents'); return 'Navigating to Documents!'; }
      if (lower.includes('flight')) { navigate('/flights'); return 'Navigating to Flights!'; }
      if (lower.includes('visa')) { navigate('/visa'); return 'Navigating to Visa Portal!'; }
      if (lower.includes('home')) { navigate('/'); return 'Navigating to Home!'; }
    }

    // University search via API
    try {
      const params = new URLSearchParams();
      const countryKeywords = {
        'united states': 'United States', 'usa': 'United States', 'america': 'United States',
        'united kingdom': 'United Kingdom', 'uk': 'United Kingdom', 'england': 'United Kingdom',
        'canada': 'Canada', 'australia': 'Australia', 'singapore': 'Singapore',
        'switzerland': 'Switzerland', 'japan': 'Japan', 'germany': 'Germany',
        'russia': 'Russia', 'ukraine': 'Ukraine', 'georgia': 'Georgia',
        'azerbaijan': 'Azerbaijan', 'uzbekistan': 'Uzbekistan', 'kyrgyzstan': 'Kyrgyzstan',
        'tajikistan': 'Tajikistan'
      };
      for (const [keyword, country] of Object.entries(countryKeywords)) {
        if (lower.includes(keyword)) { params.set('country', country); break; }
      }
      const courseKeywords = ['computer science', 'business', 'engineering', 'medicine', 'medical', 'law', 'physics', 'mathematics', 'data science', 'ai', 'robotics', 'finance', 'arts', 'architecture', 'dentistry', 'pharmacy', 'pediatrics', 'nursing', 'language', 'russian language', 'translation', 'it', 'economics', 'surgery', 'public health'];
      for (const course of courseKeywords) {
        if (lower.includes(course)) {
          // Map 'medical' to 'Medicine'
          const mappedCourse = course === 'medical' ? 'Medicine' : course;
          params.set('course', mappedCourse);
          break;
        }
      }
      const rankMatch = lower.match(/top\s*(\d+)/);
      if (rankMatch) params.set('rankingMax', rankMatch[1]);
      const budgetMatch = lower.match(/(?:under|below|less\s*than|within)\s*\$?([\d,]+)/i);
      if (budgetMatch) params.set('expenditureMax', budgetMatch[1].replace(',', ''));
      if (lower.includes('affordable') || lower.includes('cheap')) params.set('expenditureMax', '25000');
      if (lower.includes('language course') || lower.includes('language program')) params.set('course', 'Language');

      if (params.toString()) {
        const res = await fetch(`/api/universities?${params}`);
        const data = await res.json();
        if (data.data.length > 0) {
          response = `Found ${data.data.length} universit${data.data.length === 1 ? 'y' : 'ies'}:\n\n`;
          response += data.data.slice(0, 5).map((u, i) => `${i + 1}. ${u.name}\n   ${u.countryCode} #${u.worldRanking} | \u2b50${u.rating} | ~$${u.annualExpenditure.toLocaleString()}/yr`).join('\n\n');
          if (data.data.length > 5) response += `\n\n...and ${data.data.length - 5} more.`;
          navigate('/universities?' + params.toString());
          response += '\n\nNavigated to filtered results!';
        } else {
          response = 'No universities found matching your criteria. Try different filters!';
        }
      } else if (lower.includes('hello') || lower.includes('hi')) {
        response = 'Hello! How can I help you find the right university? Tell me your preferred country, course, or budget.';
      } else {
        response = 'Try asking about universities by country, course, ranking, or budget. Examples:\n\n\u2022 "Medical universities in Russia"\n\u2022 "Language courses in Tajikistan"\n\u2022 "Engineering in Georgia"\n\u2022 "Under $5,000 in Kyrgyzstan"\n\nYou can also say "Go to tests" or "Open visa" to navigate.';
      }
    } catch {
      response = 'I had trouble connecting to the server. Please try again!';
    }
    return response;
  }, [navigate]);

  const handleUserMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: text.trim() }]);
    setIsProcessing(true);
    const response = await processCommand(text);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    speak(response.substring(0, 150));
    setIsProcessing(false);
  }, [processCommand, speak]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Voice not supported. Please type your question below.' }]);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let finalTranscript = '';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const t = Array.from(event.results).map(r => r[0].transcript).join('');
      finalTranscript = t;
      setTranscript(t);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript) { handleUserMessage(finalTranscript); setTranscript(''); }
    };
    recognition.onerror = () => { setIsListening(false); setTranscript(''); };
    recognitionRef.current = recognition;
    recognition.start();
  }, [handleUserMessage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
  }, []);

  return (
    <>
      <motion.button
        onClick={() => { setIsOpen(o => !o); }}
        className="fixed bottom-6 right-6 z-150 w-14 h-14 bg-linear-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : (
          <div className="relative">
            <Sparkles className="w-6 h-6 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          </div>
        )}
        {!isOpen && <span className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full pulse-ring" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed bottom-24 right-6 z-150 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl shadow-black/15 border border-gray-200/80 overflow-hidden flex flex-col"
          >
            <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Shiksha AI</h3>
                  <p className="text-white/70 text-xs">Voice-powered search</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] whitespace-pre-line leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-linear-to-r from-orange-500 to-red-500 text-white rounded-tr-md'
                      : 'bg-gray-100 text-gray-700 rounded-tl-md'
                  }`}>{msg.text}</div>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              {transcript && isListening && (
                <div className="flex justify-end">
                  <div className="bg-orange-50 text-orange-600 px-3.5 py-2.5 rounded-2xl rounded-tr-md text-[13px] italic">{transcript}...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {isListening && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center justify-center gap-1.5">
                <div className="flex items-end gap-0.5 h-5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 bg-red-500 rounded-full voice-wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="text-xs font-medium text-red-600 ml-2">Listening...</span>
              </div>
            )}

            <div className="p-3 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <form onSubmit={(e) => { e.preventDefault(); handleUserMessage(textInput); setTextInput(''); }} className="flex-1 flex items-center gap-2">
                  <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Ask anything..." className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200" />
                  <button type="submit" disabled={!textInput.trim()} className="p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 active:scale-[0.95] transition-all duration-200 disabled:opacity-30" aria-label="Send">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2.5 rounded-xl transition-all duration-200 active:scale-[0.95] ${
                    isListening ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                  }`}
                  aria-label={isListening ? 'Stop' : 'Speak'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
