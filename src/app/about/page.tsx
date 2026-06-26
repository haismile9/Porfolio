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
    name: 'haismile',
    type: 'folder',
    children: [
      {
        name: 'summary.txt',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * SUMMARY
 *
 * Name    : Nguyen Hong Hai
 * Role    : Full-stack Developer
 * Email   : nguyenhai@haismile.dev
 * Website : haismile.dev
 * Address : Ung Van Khiem, Ward 25, Binh Thanh, HCM City
 *
 * I am a Full-stack Developer with 1 year of experience
 * specializing in Node.js, NestJS, and React.js.
 *
 * I have a proven track record in building real-time IoT
 * medical device management systems and optimizing complex
 * backend logic.
 *
 * I am dedicated to building scalable architecture and
 * high-quality code to deliver impactful backend solutions
 * and enhance system performance.
 */`
      },
      {
        name: 'tech-stack.js',
        type: 'file',
        icon: '/images/icon-hobbies.svg',
        content: `/**
 * TECHNICAL SKILLS
 *
 * Programming Languages:
 *   JavaScript, TypeScript, HTML5, CSS3
 *
 * Frameworks / Platforms:
 *   NodeJS, Express.js, NestJS, ReactJS, Vite, Next.js
 *
 * Database & ORM:
 *   MS SQL Server, MySQL, PostgreSQL, Redis, Prisma
 *
 * API Design & Tools:
 *   RESTful API, Swagger, Postman, Docker, Git
 *
 * DevOps & Infrastructure:
 *   Docker (Compose), CI/CD, Linux (Ubuntu),
 *   Windows Server, MinIO S3
 *
 * Other:
 *   Strong knowledge of OOP and Design Patterns
 *   (Singleton, Factory)
 */`
      },
      {
        name: 'experience.ts',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * PROFESSIONAL EXPERIENCE
 *
 * ─────────────────────────────────────────────
 * Hoang Phuc Thanh Immigration & Trade Co., Ltd
 * ─────────────────────────────────────────────
 *
 * [1] Full-stack Developer          Sep 2025 - Present
 *     Project: Real-time Medical Device Management System
 *     Team Size: 4
 *
 *     Description:
 *     A comprehensive system for hospitals to monitor
 *     medical device status and lifecycles in real-time.
 *
 *     Responsibilities:
 *     • Architected core backend services with Node.js
 *       (Express.js) to manage device data, lifecycle
 *       tracking, and maintenance scheduling.
 *     • Implemented real-time alerting via Socket.io,
 *       enabling instant notifications for device failures
 *       and maintenance triggers.
 *     • Built interactive dashboard with React.js and
 *       dynamic charts to visualize device performance
 *       and lifecycle data.
 *     • Optimized PostgreSQL queries, reducing average
 *       response time by ~40% under large-dataset conditions.
 *     • Set up and managed company server infrastructure:
 *       Ubuntu servers, Nginx reverse proxy, Docker Compose
 *       deployments, and self-managed CI/CD pipelines.
 *     • Deployed and administered MinIO S3 object storage
 *       for centralized asset management across projects.
 *
 * ─────────────────────────────────────────────
 * [2] Intern Front-end Developer    Jun 2025 - Sep 2025
 *     Project: CRM System
 *     Team Size: 3
 *
 *     Description:
 *     An internal tool to manage customer relationships
 *     and streamline communication workflows.
 *
 *     Responsibilities:
 *     • Developed responsive UI components using React.js
 *       and Tailwind CSS across devices.
 *     • Integrated RESTful APIs to handle customer data,
 *       improving data entry efficiency by 20%.
 *     • Collaborated under Agile/Scrum methodology to
 *       deliver features on time.
 */`
      },
      {
        name: 'education.md',
        type: 'file',
        icon: '/images/icon-markdown.svg',
        content: `/**
 * EDUCATION
 *
 * Van Lang Sai Gon College          2023 - 2025
 * Major: Information Technology
 * GPA  : 3.17 / 4.0
 *
 * Honors & Awards:
 *
 * 🥉 3rd Prize – Altair Engineering Challenge 2025
 *    Excellence in solving complex engineering
 *    optimization problems.
 *
 * ⭐ Outstanding Student Award (2023 - 2024)
 *    Awarded for exceptional academic performance
 *    and active professional contributions.
 */`
      },
      {
        name: 'projects.json',
        type: 'file',
        icon: '/images/icon-hobbies.svg',
        content: `/**
 * PERSONAL PROJECTS
 *
 * ─────────────────────────────────────────────
 * E-commerce Platform              Nov 2025 - Present
 * ─────────────────────────────────────────────
 *
 * Tech Stack:
 *   Express.js, Next.js, React.js,
 *   PostgreSQL, MinIO S3
 *
 * Website : lumieyewear.com
 * GitHub  : haismile9/LUMIweb
 *
 * Highlights:
 *   • E-commerce Ecosystem:
 *     Built a high-performance storefront and admin
 *     dashboard using Next.js (SSR) and React.js.
 *
 *   • Backend & Security:
 *     Engineered a centralized backend with Express.js,
 *     implementing JWT authentication and RBAC for
 *     secure access.
 *
 *   • Storage & Payment:
 *     Integrated MinIO S3 for asset management and
 *     MoMo / VNPay gateways for secure transactions.
 */`
      }
    ]
  }
];

export default function AboutPage() {
  const [openTabs, setOpenTabs] = useState<string[]>(['summary.txt']);
  const [selectedFile, setSelectedFile] = useState<string>('summary.txt');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['haismile']);

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
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-white/5 transition-colors text-left"
                style={{ paddingLeft: `${12 + depth * 16}px` }}
              >
                <motion.span
                  animate={{ rotate: expandedFolders.includes(item.name) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-accent-orange text-xs"
                >
                  ▶
                </motion.span>
                <span className="text-accent-orange font-fira">{item.name}</span>
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
            <button
              onClick={() => selectFile(item.name)}
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
            </button>
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
            <div className="flex border-b border-dark-border bg-dark-secondary overflow-x-auto">
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
                  <Image
                    src={getIconForFile(tab)}
                    alt={tab}
                    width={14}
                    height={14}
                  />
                  <span className="text-sm font-fira">{tab}</span>
                  <button
                    className="text-text-secondary hover:text-white ml-1 leading-none"
                    onClick={(e) => closeTab(tab, e)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Content Area */}
          {openTabs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-dark-primary p-6 gap-4">
              <Image src="/images/smile_logo.png" alt="Logo" width={100} height={100} className="opacity-10" />
              <h2 className="text-xl font-fira text-text-secondary">No file is open</h2>
              <p className="text-text-secondary opacity-50 text-sm">Select a file from the explorer to view its contents.</p>
            </div>
          ) : (
            <div className="flex-1 bg-dark-primary overflow-hidden">
              {/* Desktop: line numbers */}
              <div className="hidden lg:flex h-full overflow-y-auto overflow-x-hidden">
                <div className="text-text-secondary text-right select-none text-sm leading-7 px-4 py-6 shrink-0 min-w-[3rem] border-r border-dark-border/40">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-text-secondary font-mono text-sm leading-7 px-6 py-6 whitespace-pre-wrap flex-1 min-w-0">
                  {content}
                </div>
              </div>

              {/* Mobile: no line numbers */}
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
