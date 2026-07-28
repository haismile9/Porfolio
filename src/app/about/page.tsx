'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileItem[];
  content?: string;
}

const fileTree: FileItem[] = [
  {
    name: 'personal-info',
    type: 'folder',
    children: [
      {
        name: 'bio.json',
        type: 'file',
        content: `{
  "name": "Hong Hai",
  "role": "Full-stack Developer",
  "location": "Ho Chi Minh City, Vietnam",
  "bio": "I build things for the web — and sometimes for the fun of it.",
  "motivation": "I started coding because I wanted to understand how things work under the hood. That curiosity turned into a career.",
  "contact": "nguyenhai@haismile.dev"
}`
      },
      {
        name: 'experience.json',
        type: 'file',
        content: `[
  {
    "company": "Hoang Phuc Thanh Immigration & Trade Co., Ltd",
    "role": "Full-stack Developer",
    "period": "Sep 2025 – Present",
    "project": "Real-time Medical Device Management System",
    "responsibilities": [
      "Architected core backend with Node.js (Express.js)",
      "Implemented real-time alerting via Socket.io",
      "Built interactive dashboard with React.js",
      "Optimized PostgreSQL queries → ~40% faster response time",
      "Managed Ubuntu servers, Nginx, Docker Compose"
    ]
  },
  {
    "company": "Hoang Phuc Thanh Immigration & Trade Co., Ltd",
    "role": "Intern Front-end Developer",
    "period": "Jun 2025 – Sep 2025",
    "project": "CRM System",
    "responsibilities": [
      "Built responsive UI with React.js & Tailwind CSS",
      "Integrated RESTful APIs → improved efficiency by 20%"
    ]
  }
]`
      },
      {
        name: 'education.json',
        type: 'file',
        content: `{
  "institution": "Van Lang Sai Gon College",
  "period": "2023 – 2025",
  "major": "Information Technology",
  "gpa": "3.17 / 4.0",
  "awards": [
    "🥉 3rd Prize - Altair Engineering Challenge 2025",
    "⭐ Outstanding Student Award (2023 – 2024)"
  ]
}`
      },
      {
        name: 'interests.json',
        type: 'file',
        content: `{
  "sports": ["Gym 💪", "Football ⚽"],
  "music": ["Playing Guitar 🎸", "Rap Music 🎧"],
  "philosophy": "Build things that matter. Keep it simple. Smile while doing it. 😊"
}`
      },
      {
        name: 'resume.json',
        type: 'file',
        content: `{
  "title": "Nguyen Hong Hai - Resume / CV",
  "download": "Click the [Download CV (.pdf)] button on the top right of this editor tab bar or use /cv in Terminal",
  "file": "/CV/Nguyen-Hong-Hai-TopCV.vn-050426.145519 (1).pdf",
  "format": "PDF Document",
  "status": "Ready for download 📥"
}`
      }
    ]
  },
  {
    name: 'tech-stack',
    type: 'folder',
    children: [
      {
        name: 'frontend.json',
        type: 'file',
        content: `{
  "title": "Frontend Technologies",
  "languages": [
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3"
  ],
  "frameworks": [
    "React.js",
    "Next.js",
    "Vite"
  ],
  "styling": [
    "Tailwind CSS",
    "Framer Motion"
  ]
}`
      },
      {
        name: 'backend.json',
        type: 'file',
        content: `{
  "title": "Backend Technologies",
  "languages": [
    "Node.js"
  ],
  "frameworks": [
    "Express.js",
    "NestJS"
  ],
  "databases": [
    "PostgreSQL",
    "MySQL",
    "MS SQL Server",
    "Redis"
  ],
  "orm": [
    "Prisma"
  ]
}`
      },
      {
        name: 'others.json',
        type: 'file',
        content: `{
  "title": "DevOps & Tools",
  "api": [
    "RESTful API",
    "Swagger",
    "Postman",
    "Socket.io"
  ],
  "devops": [
    "Docker",
    "Docker Compose",
    "CI/CD",
    "Nginx"
  ],
  "infrastructure": [
    "Linux (Ubuntu)",
    "Windows Server",
    "MinIO S3"
  ],
  "versionControl": [
    "Git",
    "GitHub"
  ]
}`
      }
    ]
  }
];

export default function AboutPage() {
  const [openTabs, setOpenTabs] = useState<string[]>(['bio.json', 'others.json']);
  const [selectedFile, setSelectedFile] = useState<string>('others.json');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['personal-info', 'tech-stack']);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderName)
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const selectFile = (fileName: string) => {
    setSelectedFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
  };

  const closeTab = (tabName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== tabName);
    setOpenTabs(newTabs);
    if (selectedFile === tabName) {
      setSelectedFile(newTabs[newTabs.length - 1] || '');
    }
  };

  const getCurrentContent = (): string => {
    const findContent = (items: FileItem[]): string | undefined => {
      for (const item of items) {
        if (item.name === selectedFile && item.content) return item.content;
        if (item.children) {
          const found = findContent(item.children);
          if (found) return found;
        }
      }
    };
    return findContent(fileTree) || '';
  };

  const getIconForFile = (name: string) => {
    switch (name) {
      case 'bio.json':
        return '/images/icon-personal-info.svg';
      case 'resume.json':
        return '/images/icon-personal-info.svg';
      case 'experience.json':
        return '/images/icon-professional-info.svg';
      case 'education.json':
        return '/images/icon-markdown.svg';
      case 'interests.json':
        return '/images/icon-hobbies.svg';
      case 'frontend.json':
        return '/images/icon-react.svg';
      case 'backend.json':
        return '/images/icon-markdown.svg'; // Or another icon if available
      case 'others.json':
        return '/images/icon-markdown.svg';
      default:
        if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.json')) return '/images/icon-hobbies.svg';
        return '/images/icon-markdown.svg';
    }
  };

  const getFolderColor = (name: string) => {
    if (name === 'personal-info') return 'text-accent-primary';
    if (name === 'tech-stack') return 'text-accent-orange';
    return 'text-accent-orange';
  };

  const renderTree = (items: FileItem[], depth = 0) => (
    <>
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * i }}
        >
          {item.type === 'folder' ? (
            <>
              <button
                onClick={() => toggleFolder(item.name)}
                className="w-full flex items-center gap-2 py-1.5 text-sm hover:bg-white/5 transition-colors text-left"
                style={{ paddingLeft: `${12 + depth * 16}px` }}
              >
                <motion.span
                  animate={{ rotate: expandedFolders.includes(item.name) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xs ${getFolderColor(item.name)}`}
                >
                  ▶
                </motion.span>
                <Image
                  src="/images/icon-folder.svg"
                  alt="folder"
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span className={`font-fira font-medium ${getFolderColor(item.name)}`}>
                  {item.name}
                </span>
              </button>
              <AnimatePresence>
                {expandedFolders.includes(item.name) && item.children && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    {renderTree(item.children, depth + 1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.button
              onClick={() => selectFile(item.name)}
              whileHover={{ x: 3 }}
              className={`w-full flex items-center gap-2 py-1.5 text-sm transition-colors text-left ${
                selectedFile === item.name
                  ? 'bg-white/10 text-white'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
              style={{ paddingLeft: `${28 + depth * 16}px` }}
            >
              <Image
                src={item.icon || getIconForFile(item.name)}
                alt={item.name}
                width={14}
                height={14}
                className="shrink-0"
              />
              <span className="font-fira truncate">{item.name}</span>
            </motion.button>
          )}
        </motion.div>
      ))}
    </>
  );

  const content = getCurrentContent();
  const lines = content.split('\n');

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-dark-primary min-w-0">
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-w-0">

        {/* Desktop Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex w-64 bg-dark-secondary border-r border-dark-border shrink-0 h-full flex-col"
        >
          <div className="flex-1 overflow-y-auto py-2">
            {renderTree(fileTree)}
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:hidden flex flex-col w-full bg-dark-secondary shrink-0 border-b border-dark-border"
        >
          <div className="py-2">
            {renderTree(fileTree)}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          {/* Tabs - Slides down from top matching _projects and _blog header bar */}
          {openTabs.length > 0 && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center justify-between border-b border-dark-border bg-dark-secondary overflow-x-auto shrink-0"
            >
              <div className="flex items-center">
                {openTabs.map(tab => (
                  <div
                    key={tab}
                    className={`flex items-center gap-2 px-4 py-2 border-r border-dark-border cursor-pointer shrink-0 transition-colors ${
                      selectedFile === tab
                        ? 'bg-dark-primary text-white'
                        : 'text-text-secondary hover:text-white'
                    }`}
                    onClick={() => setSelectedFile(tab)}
                  >
                    <Image src={getIconForFile(tab)} alt={tab} width={14} height={14} />
                    <span className="text-sm font-fira">{tab}</span>
                    <button
                      className="text-text-secondary hover:text-white ml-1 leading-none text-base"
                      onClick={(e) => closeTab(tab, e)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {selectedFile === 'resume.json' && (
                <a
                  href="/CV/Nguyen-Hong-Hai-TopCV.vn-050426.145519%20(1).pdf"
                  download="Nguyen-Hong-Hai-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent-orange/10 hover:bg-accent-orange/20 border-l border-dark-border text-accent-orange text-xs font-fira transition-colors shrink-0 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Download CV (.pdf)</span>
                  <span className="sm:hidden">CV</span>
                </a>
              )}
            </motion.div>
          )}

          {/* Content - Smooth slide up matching _projects and _blog cards */}
          <motion.div
            key={selectedFile || 'no-file'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden"
          >
            {openTabs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-dark-primary p-6 gap-4">
                <Image src="/images/smile_logo/OIP-Photoroom.png" alt="Logo" width={100} height={100} className="opacity-10" />
                <h2 className="text-xl font-fira text-text-secondary">No file is open</h2>
                <p className="text-text-secondary opacity-50 text-sm text-center">
                  Select a file from the explorer to view its contents.
                </p>
              </div>
            ) : (
              <div className="flex-1 bg-dark-primary overflow-hidden">
                {/* Desktop: with line numbers */}
                <div className="hidden lg:flex h-full overflow-y-auto overflow-x-hidden">
                  <div className="text-text-secondary text-right select-none text-sm leading-7 px-4 py-6 shrink-0 min-w-[3rem] border-r border-dark-border/40 font-mono">
                    {lines.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="text-text-secondary font-mono text-sm leading-7 px-6 py-6 whitespace-pre-wrap flex-1 min-w-0 break-words">
                    {content}
                  </div>
                </div>

                {/* Mobile: clean content */}
                <div className="flex lg:hidden h-full overflow-y-auto p-4">
                  <div className="text-text-secondary font-mono text-sm leading-6 whitespace-pre-wrap flex-1 min-w-0">
                    {content}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
