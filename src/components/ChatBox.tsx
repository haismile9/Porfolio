'use client';

import { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  username: string;
  text: string;
  createdAt: number;
}

const BAD_WORDS = [
  'địt', 'dit', 'dkm', 'đkm', 'vcl', 'đcm', 'dcm', 'vl', 'đm', 'dm', 
  'cặc', 'cac', 'lồn', 'lon', 'cứt', 'cut', 'đĩ', 'di', 'đụ', 'du', 'đụ mẹ', 'dmẹ', 'đmẹ', 'dmm', 'đmm', 'đm mày', 'dm mày', 
  'fuck', 'fuk', 'fck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'sex', 'porn', 'nude', 'slut'
];

const filterBadWords = (text: string) => {
  let filtered = text;
  BAD_WORDS.forEach(word => {
    // case-insensitive replacement
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '***');
  });
  return filtered;
};

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('Anonymous');
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load or generate username
  useEffect(() => {
    const savedName = localStorage.getItem('chat_username');
    if (savedName) {
      setUsername(savedName);
    } else {
      const newName = `Anonymous${Math.floor(100000 + Math.random() * 900000)}`;
      setUsername(newName);
      localStorage.setItem('chat_username', newName);
    }
  }, []);

  // Fetch messages from Firebase
  useEffect(() => {
    if (!db) return; // If firebase isn't configured yet
    const messagesRef = ref(db, 'messages');
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          username: value.username,
          text: value.text,
          createdAt: value.createdAt || Date.now(),
        }));
        
        // Sort by time
        messageList.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    // Handle command to change username
    if (inputText.startsWith('/name ')) {
      const newName = inputText.replace('/name ', '').trim();
      if (newName) {
        setUsername(newName);
        localStorage.setItem('chat_username', newName);
        setInputText('');
        return;
      }
    }

    // Check cooldown
    if (countdown > 0) return;

    // Send message to Firebase
    try {
      const filteredText = filterBadWords(inputText);
      const messagesRef = ref(db, 'messages');
      push(messagesRef, {
        username,
        text: filteredText,
        createdAt: serverTimestamp(),
      });
      setInputText('');
      setLastMessageTime(Date.now());
      setCountdown(5);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error connecting to chat. Make sure Firebase is configured in .env.local');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col h-full bg-dark-surface rounded-lg border border-dark-border overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-dark-border text-center">
        <h2 className="text-white font-bold">Welcome to the chat!</h2>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwnMessage = msg.username === username;
          
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                <span className={`${isOwnMessage ? 'text-accent-blue' : 'text-accent-green'} font-medium text-sm`}>
                  {msg.username}
                </span>
              </div>
              <div className={`flex items-end gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                <div 
                  className={`text-text-secondary px-4 py-2 rounded-lg border border-dark-border break-words max-w-[80%] ${
                    isOwnMessage 
                      ? 'bg-dark-surface rounded-tr-none' 
                      : 'bg-dark-bg rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-text-secondary opacity-50 mb-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-dark-border bg-dark-bg flex flex-col gap-2">
        <div className="text-center">
          <p className="text-text-secondary text-xs">Type /name yourname to change username</p>
          <p className="text-text-secondary text-xs opacity-50">You are currently using the username: {username}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-text-primary placeholder-text-secondary outline-none focus:border-accent-orange transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || countdown > 0}
            className="bg-dark-border text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {countdown <= 0 && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
            {countdown > 0 ? `Wait ${countdown}s` : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
