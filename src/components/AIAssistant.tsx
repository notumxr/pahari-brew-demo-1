import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Coffee, 
  RotateCcw, 
  ExternalLink, 
  Calendar, 
  Utensils, 
  MapPin, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { ChatMessage, getApprovedAssistantResponse } from '../services/assistantKnowledge';

interface AIAssistantProps {
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AIAssistant({ setCurrentPage, isOpen, setIsOpen }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Hi, I’m the Pahari Brew Guide. I can help you learn about our café, menu, opening hours, location, and reservation-request process.',
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    'What are your opening hours?',
    'Where are you located?',
    'What is the Himalayan Mist Latte?',
    'How do I request a table?',
    'Do you offer dairy alternatives?',
    'Do you have roastery workshops?',
    'Is this a real café?'
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call server endpoint
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text || "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: data.quickAction
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Using client-side approved knowledge responder fallback:', err);
      // Seamless approved knowledge fallback
      const fallbackResult = getApprovedAssistantResponse(textToSend);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: fallbackResult.quickAction
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action?: ChatMessage['quickAction']) => {
    if (!action) return;
    if (action.action === 'navigate-booking') {
      setCurrentPage('booking');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.action === 'navigate-menu') {
      setCurrentPage('menu');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.action === 'navigate-gallery') {
      setCurrentPage('gallery');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.action === 'open-map') {
      window.open('https://maps.google.com/?q=Mall+Road+Shimla', '_blank', 'noopener,noreferrer');
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Hi, I’m the Pahari Brew Guide. I can help you learn about our café, menu, opening hours, location, and reservation-request process.',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Assistant Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 group border border-white/20 transition-all cursor-pointer active:scale-95"
          id="assistant-open-btn"
          aria-label="Ask Pahari Brew Guide"
        >
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[color:var(--color-gold-accent)] group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-sans text-[10px] uppercase tracking-wider text-white/75 font-semibold">AI Assistant</span>
            <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              Ask Pahari Brew Guide
            </span>
          </div>
        </motion.button>
      )}

      {/* Assistant Modal / Sliding Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-auto justify-center pointer-events-none">
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="pointer-events-auto w-full sm:w-[420px] max-w-[100vw] h-[85vh] sm:h-[620px] bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)] rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col overflow-hidden text-left"
              id="assistant-chat-window"
            >
              {/* Header */}
              <div className="bg-[color:var(--color-primary-green)] text-white p-4.5 flex justify-between items-center relative z-10 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-[color:var(--color-gold-accent)] border border-white/20">
                    <Coffee className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base leading-tight flex items-center gap-2 text-white">
                      Pahari Brew Guide
                      <span className="bg-[color:var(--color-gold-accent)] text-[color:var(--color-deep-moss)] text-[9px] uppercase font-sans font-bold px-1.5 py-0.5 rounded">
                        AI Guide
                      </span>
                    </h3>
                    <p className="font-sans text-[11px] text-white/80 leading-none mt-1">
                      Fictional Café Portfolio Demo
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-white/80">
                  <button
                    onClick={resetChat}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Reset conversation"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Close assistant"
                    aria-label="Close assistant"
                    id="assistant-close-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="bg-[color:var(--color-warm-cream)] border-b border-[color:var(--color-border-subtle)] px-4 py-2 text-[10px] text-[color:var(--color-sage-subtle)] flex items-center justify-between">
                <span>Portfolio Demonstration • No real bookings created</span>
                <span className="font-semibold text-[color:var(--color-primary-green)]">Shimla Concept</span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[color:var(--color-warm-cream)]/40 text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3.5 leading-relaxed font-sans text-xs md:text-sm ${
                        msg.sender === 'user'
                          ? 'bg-[color:var(--color-primary-green)] text-white rounded-br-none shadow-sm'
                          : 'bg-white text-[color:var(--color-deep-moss)] border border-[color:var(--color-border-subtle)] rounded-bl-none shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Quick Action Pill in Assistant Message */}
                    {msg.sender === 'assistant' && msg.quickAction && (
                      <button
                        onClick={() => handleQuickAction(msg.quickAction)}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-primary-green)] border border-[color:var(--color-border-subtle)] rounded-full text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                      >
                        {msg.quickAction.action === 'navigate-booking' && <Calendar className="w-3.5 h-3.5 text-[color:var(--color-gold-muted)]" />}
                        {msg.quickAction.action === 'navigate-menu' && <Utensils className="w-3.5 h-3.5 text-[color:var(--color-gold-muted)]" />}
                        {msg.quickAction.action === 'open-map' && <MapPin className="w-3.5 h-3.5 text-[color:var(--color-gold-muted)]" />}
                        <span>{msg.quickAction.label}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>
                    )}

                    <span className="text-[9px] text-[color:var(--color-sage-subtle)] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[color:var(--color-sage-subtle)] bg-white border border-[color:var(--color-border-subtle)] p-3 rounded-lg rounded-bl-none w-28">
                    <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary-green)] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary-green)] animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary-green)] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Section */}
              <div className="p-2.5 bg-white border-t border-[color:var(--color-border-subtle)]">
                <span className="font-sans text-[10px] uppercase tracking-wider text-[color:var(--color-sage-subtle)] font-bold block mb-1.5 px-1.5">
                  Suggested Questions
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="shrink-0 text-left bg-[color:var(--color-warm-cream)] hover:bg-gray-100 text-[color:var(--color-deep-moss)] text-[11px] font-sans px-3 py-1.5 rounded-full border border-[color:var(--color-border-subtle)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="p-3 bg-white border-t border-[color:var(--color-border-subtle)] flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about hours, menu, roastery, reservations..."
                  className="flex-1 bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] px-3.5 py-2.5 rounded-sm font-sans text-xs sm:text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-gold-accent)] text-[color:var(--color-deep-moss)]"
                  disabled={isLoading}
                  id="assistant-chat-input"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[color:var(--color-primary-green)] hover:bg-[color:var(--color-primary-green-hover)] text-white p-2.5 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  aria-label="Send message"
                  id="assistant-chat-send-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom Fictional Disclaimer Footer */}
              <div className="bg-[color:var(--color-card-bg)] border-t border-[color:var(--color-border-subtle)]/70 py-1.5 px-3 text-center">
                <p className="font-sans text-[9px] text-[color:var(--color-sage-subtle)] leading-tight">
                  Portfolio demo • Details, claims &amp; reservation systems are placeholders.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
