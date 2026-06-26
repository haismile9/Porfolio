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
  isSystem?: boolean;
  isEcho?: boolean;
}

const BAD_WORDS = [
  'địt', 'dit', 'dkm', 'đkm', 'vcl', 'đcm', 'dcm', 'vl', 'đm', 'dm', 
  'cặc', 'cac', 'lồn', 'lon', 'cứt', 'cut', 'đĩ', 'di', 'đụ', 'du', 'đụ mẹ', 'dmẹ', 'đmẹ', 'dmm', 'đmm', 'đm mày', 'dm mày', 
  'fuck', 'fuk', 'fck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'sex', 'porn', 'nude', 'slut'
];

const filterBadWords = (text: string) => {
  let filtered = text;
  BAD_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '***');
  });
  return filtered;
};

const stringToColor = (str: string) => {
  const colors = [
    '#ff5f56', // red
    '#ffbd2e', // yellow
    '#27c93f', // green
    '#58a6ff', // blue
    '#d2a8ff', // purple
    '#ff7b72', // coral
    '#79c0ff', // light blue
    '#a5d6ff', // pale blue
    '#ffa657', // orange
    '#f0883e',
    '#8957e5',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('guest');
  const [countdown, setCountdown] = useState<number>(0);
  const [clearTimestamp, setClearTimestamp] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load or generate username
  useEffect(() => {
    const savedName = localStorage.getItem('chat_username');
    if (savedName) {
      setUsername(savedName);
    } else {
      const newName = `guest${Math.floor(1000 + Math.random() * 9000)}`;
      setUsername(newName);
      localStorage.setItem('chat_username', newName);
    }
    
    // Welcome message
    addLocalMessage('Welcome to haismile.dev terminal!\nType "/help" to see available commands or just chat globally.', true);
  }, []);

  // Fetch messages from Firebase
  useEffect(() => {
    if (!db) return;
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
        
        messageList.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Combine and filter messages
  const allMessages = [...messages, ...localMessages]
    .filter(m => m.createdAt >= clearTimestamp)
    .sort((a, b) => a.createdAt - b.createdAt);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [allMessages]);

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

  const addLocalMessage = (text: string, isSystem: boolean, isEcho: boolean = false) => {
    setLocalMessages(prev => [...prev, {
      id: `local-${Date.now()}-${Math.random()}`,
      username: isSystem ? 'system' : username,
      text,
      createdAt: Date.now(),
      isSystem,
      isEcho
    }]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = inputText.trim();
    if (!input) return;

    setInputText('');

    // Check if it's a known command
    const cmdList = ['/help', '/whoami', '/contact', '/clear', '/sudo rm -rf /'];
    const isCommand = cmdList.includes(input.toLowerCase()) || input.toLowerCase().startsWith('/name');

    if (isCommand) {
      // Echo the command locally
      addLocalMessage(input, false, true);
      
      const cmd = input.toLowerCase();
      if (cmd === '/clear') {
        setClearTimestamp(Date.now());
        setLocalMessages([]);
      } else if (cmd === '/help') {
        addLocalMessage(`Available commands:\n  /help       - Show this help message\n  /whoami     - Print current user information\n  /contact    - Show contact information\n  /clear      - Clear the terminal screen\n  /name <username> - Change your username`, true);
      } else if (cmd === '/whoami') {
        addLocalMessage(`You are logged in as: ${username}\nYou are a special guest exploring my portfolio!`, true);
      } else if (cmd === '/contact') {
        addLocalMessage(`Contact Information:\n  Email    : nguyenhai@haismile.dev\n  GitHub   : @haismile9\n  LinkedIn : /in/haismile9`, true);
      } else if (cmd === '/sudo rm -rf /') {
        addLocalMessage("Nice try! But I don't give sudo privileges to strangers. 😉", true);
      } else if (cmd.startsWith('/name ')) {
        const newName = cmd.replace('/name ', '').trim();
        if (newName) {
          setUsername(newName);
          localStorage.setItem('chat_username', newName);
          addLocalMessage(`Username changed to: ${newName}`, true);
        }
      }
      return;
    }

    // Normal global chat message
    if (countdown > 0) {
      addLocalMessage(`System: Please wait ${countdown}s before sending another message.`, true);
      return;
    }

    try {
      const filteredText = filterBadWords(input);
      const messagesRef = ref(db, 'messages');
      push(messagesRef, {
        username,
        text: filteredText,
        createdAt: serverTimestamp(),
      });
      setCountdown(3); // 3 seconds cooldown
    } catch (error) {
      console.error('Error sending message:', error);
      addLocalMessage('System: Error connecting to chat server.', true);
    }
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#0d1117] rounded-lg border border-dark-border overflow-hidden font-mono text-sm shadow-xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-dark-border select-none">
        <div className="flex items-center gap-2">
          <span className="text-text-secondary text-xs">TERMINAL</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-1.5 scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
        {allMessages.map((msg, index) => {
          const prevMsg = index > 0 ? allMessages[index - 1] : null;
          const showDateSeparator = !prevMsg || formatDate(prevMsg.createdAt) !== formatDate(msg.createdAt);
          const timeStr = formatTime(msg.createdAt);
          const dateStr = formatDate(msg.createdAt);

          return (
            <div key={msg.id}>
              {showDateSeparator && (
                <div className="flex items-center justify-center my-4 opacity-50 select-none">
                  <div className="h-px bg-dark-border flex-1"></div>
                  <span className="px-4 text-xs font-medium text-text-secondary">{dateStr}</span>
                  <div className="h-px bg-dark-border flex-1"></div>
                </div>
              )}
              
              {msg.isSystem ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 whitespace-pre-wrap py-1"
                >
                  <span className="text-text-secondary/40 shrink-0 select-none">[{timeStr}]</span>
                  <span className="text-text-secondary flex-1">{msg.text}</span>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 whitespace-pre-wrap py-1 leading-relaxed"
                >
                  <span className="text-text-secondary/40 shrink-0 select-none">[{timeStr}]</span>
                  <span 
                    className="shrink-0 font-medium" 
                    style={{ color: msg.username === username ? '#27c93f' : stringToColor(msg.username) }}
                  >
                    {msg.username}<span className="hidden sm:inline">@haismile.dev:~</span>$
                  </span>
                  <span className="text-text-primary break-words flex-1">
                    {msg.text}
                  </span>
                </motion.div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 px-4 pb-4 pt-2">
        <span className="text-accent-green font-medium shrink-0">
          {username}<span className="hidden sm:inline">@haismile.dev:~</span>$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-text-primary focus:ring-0 p-0"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
