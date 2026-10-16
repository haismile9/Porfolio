'use client';

import { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { db } from '@/lib/firebase';

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

// Username colours, dark enough to read on the light classic background
const stringToColor = (str: string) => {
  const colors = ['#B42318', '#B54708', '#027A48', '#175CD3', '#6941C6', '#C11574', '#0E7090', '#4F48B8'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const WELCOME_TEXT =
  'Welcome to the haismile.dev chat! Messages are public. Type "/help" for commands, "/cv" to download my CV, or just say hi.';

export function ChatBox({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  // Seed the welcome message in the initial state so it isn't added twice in StrictMode
  const [localMessages, setLocalMessages] = useState<Message[]>(() => [
    { id: 'local-welcome', username: 'system', text: WELCOME_TEXT, createdAt: Date.now(), isSystem: true },
  ]);
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
    const cmdList = ['/help', '/whoami', '/contact', '/clear', '/sudo rm -rf /', '/cv', '/resume', '/cat resume.md', '/download cv', '/blog', '/articles'];
    const isCommand = cmdList.includes(input.toLowerCase()) || input.toLowerCase().startsWith('/name');

    if (isCommand) {
      // Echo the command locally
      addLocalMessage(input, false, true);

      const cmd = input.toLowerCase();
      if (cmd === '/clear') {
        setClearTimestamp(Date.now());
        setLocalMessages([]);
      } else if (cmd === '/help') {
        addLocalMessage(`Available commands:\n  /help       - Show this help message\n  /cv         - Download Resume/CV (PDF)\n  /blog       - Open the blog\n  /whoami     - Print current user information\n  /contact    - Show contact information\n  /clear      - Clear the chat window\n  /name <username> - Change your username`, true);
      } else if (cmd === '/blog' || cmd === '/articles') {
        addLocalMessage('Opening the blog...', true);
        window.location.href = '/blog';
      } else if (cmd === '/cv' || cmd === '/resume' || cmd === '/cat resume.md' || cmd === '/download cv') {
        addLocalMessage(`Downloading Smile's CV (.pdf)...\nFile path: /CV/FullStack.pdf`, true);
        const link = document.createElement('a');
        link.href = '/CV/FullStack.pdf';
        link.download = 'Nguyen-Hong-Hai-CV.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (cmd === '/whoami') {
        addLocalMessage(`You are logged in as: ${username}\nYou are a special guest exploring my portfolio!`, true);
      } else if (cmd === '/contact') {
        addLocalMessage(`Contact Information:\n  Email    : smilenotdev@gmail.com\n  GitHub   : @haismile9\n  LinkedIn : /in/smile9`, true);
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
      addLocalMessage(`Please wait ${countdown}s before sending another message.`, true);
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
      addLocalMessage('Error connecting to chat server.', true);
    }
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full flex-col bg-paper font-serif text-ink">
      {/* Title bar, matching the site navigation */}
      <div className="flex items-center justify-between bg-classic-accent px-3 py-1.5 font-fira text-[13px] text-white select-none">
        <span>~/chat</span>
        <button onClick={onClose} className="hover:underline" title="Close chat">
          close ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-1 py-3 text-base leading-relaxed">
        {allMessages.map((msg, index) => {
          const prevMsg = index > 0 ? allMessages[index - 1] : null;
          const showDateSeparator = !prevMsg || formatDate(prevMsg.createdAt) !== formatDate(msg.createdAt);

          return (
            <div key={msg.id}>
              {showDateSeparator && (
                <p className="mt-4 mb-2 border-b border-paper-border pb-1 font-fira text-xs text-ink-muted select-none">
                  {formatDate(msg.createdAt)}
                </p>
              )}

              {msg.isSystem ? (
                <p className="my-1.5 flex gap-3">
                  <time className="w-11 shrink-0 pt-0.5 font-fira text-xs text-ink-muted select-none">{formatTime(msg.createdAt)}</time>
                  <span className={`flex-1 whitespace-pre-wrap text-ink-muted ${msg.text.includes('\n  ') ? 'font-fira text-[13px]' : 'italic'}`}>
                    {msg.text}
                  </span>
                </p>
              ) : (
                <p className="my-1.5 flex gap-3">
                  <time className="w-11 shrink-0 pt-0.5 font-fira text-xs text-ink-muted select-none">{formatTime(msg.createdAt)}</time>
                  <span className="flex-1 whitespace-pre-wrap break-words">
                    <span
                      className="font-bold"
                      style={{ color: msg.username === username ? '#027A48' : stringToColor(msg.username) }}
                    >
                      {msg.username}
                    </span>
                    <span className="text-ink-muted">: </span>
                    <span className={msg.isEcho ? 'font-fira text-[13px]' : ''}>{msg.text}</span>
                  </span>
                </p>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-paper-border pt-3">
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message or /help"
          aria-label={`Message as ${username}`}
          className="min-w-0 flex-1 border border-paper-border bg-white px-3 py-1.5 text-base placeholder:text-ink-muted/70 focus:outline-none focus:border-classic-accent"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        <button
          type="submit"
          className="shrink-0 bg-classic-accent px-3 py-1.5 font-fira text-[13px] text-white hover:opacity-90"
        >
          send
        </button>
      </form>
    </div>
  );
}
