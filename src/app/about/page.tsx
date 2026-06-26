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
    name: 'honghai',
    type: 'folder',
    children: [
      {
        name: 'experience.ts',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * EXPERIENCE & PROJECTS
 *
 * ══════════════════════════════════════════════
 *  WORK EXPERIENCE
 * ══════════════════════════════════════════════
 *
 * [1] Full-stack Developer          Sep 2025 – Present
 *     Hoang Phuc Thanh Immigration & Trade Co., Ltd
 *     Project : Real-time Medical Device Management System
 *     Team    : 4 members
 *
 *     A system for hospitals to monitor medical device
 *     status and lifecycles in real-time.
 *
 *     • Architected core backend with Node.js (Express.js)
 *       — device data, lifecycle tracking, maintenance scheduling.
 *     • Implemented real-time alerting via Socket.io for
 *       instant notifications on device failures.
 *     • Built interactive dashboard with React.js and
 *       dynamic charts for device performance visualization.
 *     • Optimized PostgreSQL queries → ~40% faster response
 *       time under large-dataset conditions.
 *     • Managed Ubuntu servers, Nginx reverse proxy,
 *       Docker Compose and self-managed CI/CD pipelines.
 *     • Deployed MinIO S3 for centralized asset management.
 *
 * ──────────────────────────────────────────────
 * [2] Intern Front-end Developer    Jun 2025 – Sep 2025
 *     Hoang Phuc Thanh Immigration & Trade Co., Ltd
 *     Project : CRM System
 *     Team    : 3 members
 *
 *     Internal tool to manage customer relationships
 *     and streamline communication workflows.
 *
 *     • Built responsive UI with React.js & Tailwind CSS.
 *     • Integrated RESTful APIs → improved data entry
 *       efficiency by 20%.
 *     • Worked under Agile/Scrum methodology.
 *
 * ══════════════════════════════════════════════
 *  PERSONAL PROJECT
 * ══════════════════════════════════════════════
 *
 * [3] E-commerce Platform           Nov 2025 – Present
 *     Stack   : Express.js, Next.js, React.js,
 *               PostgreSQL, MinIO S3
 *     Website : lumieyewear.com
 *     GitHub  : haismile9/LUMIweb
 *
 *     Built independently to go beyond internship scope
 *     and apply full-stack skills end-to-end.
 *
 *     🛍  E-commerce Ecosystem
 *         High-performance storefront + admin dashboard
 *         using Next.js (SSR) and React.js.
 *
 *     🔐 Backend & Security
 *         Centralized backend with Express.js, JWT auth
 *         and RBAC for role-based access control.
 *
 *     💳 Storage & Payment
 *         MinIO S3 for assets + MoMo/VNPay payment
 *         gateways for secure transactions.
 */`
      },
      {
        name: 'tech-stack.js',
        type: 'file',
        icon: '/images/icon-hobbies.svg',
        content: `/**
 * TECHNICAL SKILLS
 *
 * Languages:
 *   JavaScript  TypeScript  HTML5  CSS3
 *
 * Frameworks & Platforms:
 *   NodeJS  Express.js  NestJS
 *   ReactJS  Vite  Next.js
 *
 * Database & ORM:
 *   MS SQL Server  MySQL  PostgreSQL
 *   Redis  Prisma
 *
 * API Design & Tools:
 *   RESTful API  Swagger  Postman
 *   Docker  Git
 *
 * DevOps & Infrastructure:
 *   Docker Compose  CI/CD
 *   Linux (Ubuntu)  Windows Server
 *   MinIO S3  Nginx
 *
 * Concepts:
 *   OOP  Design Patterns (Singleton, Factory)
 *   Microservices  Real-time (Socket.io)
 */`
      },
      {
        name: 'education.md',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * EDUCATION
 *
 * Van Lang Sai Gon College          2023 – 2025
 * Major : Information Technology
 * GPA   : 3.17 / 4.0
 *
 * ─────────────────────────
 * Honors & Awards
 * ─────────────────────────
 *
 * 🥉 3rd Prize
 *    Altair Engineering Challenge 2025
 *    Excellence in solving complex engineering
 *    optimization problems.
 *
 * ⭐ Outstanding Student Award (2023 – 2024)
 *    Awarded for exceptional academic performance
 *    and active professional contributions.
 */`
      },
    ]
  },
  {
    name: 'smile',
    type: 'folder',
    children: [
      {
        name: 'bio.txt',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * HI THERE 👋 I'M HAI
 *
 * I'm a Full-stack Developer based in Ho Chi Minh City,
 * Vietnam. I build things for the web — and sometimes
 * for the fun of it.
 *
 * I started coding because I wanted to understand how
 * things work under the hood. That curiosity turned into
 * a career, and I haven't looked back since.
 *
 * My stack leans backend-heavy (Node.js, NestJS, PostgreSQL)
 * but I genuinely enjoy crafting smooth frontend experiences
 * too. I believe good software is both powerful and pleasant
 * to use.
 *
 * When I'm not writing code, I'm probably:
 *   → Playing strategy games 🎮
 *   → Exploring a new framework or tool
 *   → Listening to lo-fi while debugging at midnight 🎵
 *
 * ──────────────────────────────────────────────
 * A bit about the name "haismile9":
 *
 *   hai   = my name (Hong Hai)
 *   smile = the vibe I try to bring to everything I build
 *   9     = just a number, but it stuck 😄
 * ──────────────────────────────────────────────
 *
 * I'm always open to interesting conversations,
 * collaboration, or just saying hello.
 *
 * 📬 nguyenhai@haismile.dev
 */`
      },
      {
        name: 'interests.md',
        type: 'file',
        icon: '/images/icon-hobbies.svg',
        content: `/**
 * WHAT I'M INTO
 *
 * 💻 Technology
 *   I love staying on top of what's happening in the
 *   backend and DevOps world. Recently exploring:
 *   → Event-driven architecture
 *   → Edge computing & serverless
 *   → Rust (because everyone says it's hard 😄)
 *
 * 🎮 Gaming
 *   Strategy games are my comfort zone.
 *   I like games that make you think 2 steps ahead.
 *   Current obsession: anything with base-building mechanics.
 *
 * 🎵 Music
 *   Lo-fi hip hop and ambient music when coding.
 *   Occasionally something with more energy for debugging
 *   sessions that go past midnight.
 *
 * 🧩 Problem Solving
 *   There's something deeply satisfying about breaking
 *   a complex problem into small, solvable pieces.
 *   It's basically what I do all day — and I love it.
 *
 * 📖 Learning
 *   I read tech blogs, watch conference talks, and
 *   occasionally fall down Wikipedia rabbit holes.
 *   Knowledge compounds — I believe in learning daily.
 */`
      },
      {
        name: 'fun-facts.js',
        type: 'file',
        icon: '/images/icon-hobbies.svg',
        content: `/**
 * FUN FACTS ABOUT ME
 *
 * const hai = {
 *
 *   currentCity    : "Ho Chi Minh City, Vietnam 🇻🇳",
 *
 *   languages      : ["Vietnamese 🇻🇳", "English 🇬🇧"],
 *
 *   coffeeOrTea    : "Coffee ☕ (always)",
 *
 *   codeEditor     : "VS Code (dark theme, obviously)",
 *
 *   typingSpeed    : "fast enough to keep up with my thoughts",
 *
 *   debuggingStyle : "console.log() first, ask questions later",
 *
 *   superpower     : "Turning caffeine into backend services",
 *
 *   lifePhilosophy : "Build things that matter. Keep it simple.
 *                     Smile while doing it. 😊",
 *
 *   funFact        : "The name 'haismile9' was supposed to be
 *                     temporary. That was years ago.",
 *
 *   currentlyLearning: "Always something new.",
 *
 * };
 */`
      }
    ]
  }
];

export default function AboutPage() {
  const [openTabs, setOpenTabs] = useState<string[]>(['bio.txt', 'experience.ts']);
  const [selectedFile, setSelectedFile] = useState<string>('bio.txt');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['honghai', 'smile']);

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
    if (name.endsWith('.ts') || name.endsWith('.js') || name.endsWith('.json')) return '/images/icon-hobbies.svg';
    return '/images/icon-markdown.svg';
  };

  const getFolderColor = (name: string) => {
    if (name === 'honghai') return 'text-accent-primary';
    if (name === 'smile') return 'text-accent-orange';
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 flex flex-col min-w-0"
        >
          {/* Tabs */}
          {openTabs.length > 0 && (
            <div className="flex border-b border-dark-border bg-dark-secondary overflow-x-auto shrink-0">
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
          )}

          {/* Content */}
          {openTabs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-dark-primary p-6 gap-4">
              <Image src="/images/smile_logo.png" alt="Logo" width={100} height={100} className="opacity-10" />
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
                  {content
                    .replace(/^\/\*\*\s*\n/, '')
                    .replace(/\n\s*\*\/\s*$/, '')
                    .split('\n')
                    .map(l => l.replace(/^\s*\*\s?/, ''))
                    .join('\n')}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
