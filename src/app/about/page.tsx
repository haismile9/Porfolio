'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// Tab types matching Figma design
type TabType = 'professional-info' | 'personal-info' | 'hobbies';

// File interface
interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileItem[];
  content?: string;
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal-info');
  const [activeMobileTab, setActiveMobileTab] = useState<TabType | 'contacts' | ''>('');
  const [openTabs, setOpenTabs] = useState<string[]>(['summary.txt']);
  const [selectedFile, setSelectedFile] = useState<string>('summary.txt');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['bio', 'education', 'experience', 'skills', 'interests']);

  const professionalInfoFiles: FileItem[] = [
    {
      name: 'experience',
      type: 'folder',
      children: [
        {
          name: 'work.ts',
          type: 'file',
          icon: '/images/icon-markdown.svg',
          content: `/**
 * PROFESSIONAL EXPERIENCE
 * 
 * Hoang Phuc Thanh Immigration & Trade Co., Ltd
 * Full-stack Developer (Sep 2025 - Present)
 * Project: Real-time Medical Device Management System
 * 
 * Intern Front-end Developer (Jun 2025 - Sep 2025)
 * Project: CRM System
 * 
 * PERSONAL PROJECT
 * 
 * E-commerce (Nov 2025 - Present)
 * Tech stack: Express.js, Next.js, React.js, PostgreSQL, MinIO S3
 * Website: lumieyewear.com | GitHub: haismile9/LUMIweb
 */`
        }
      ]
    },
    {
      name: 'skills',
      type: 'folder',
      children: [
        {
          name: 'tech-stack.js',
          type: 'file',
          icon: '/images/icon-hobbies.svg',
          content: `/**
 * TECHNICAL SKILLS
 * 
 * - Programming Languages: JavaScript, TypeScript, HTML5, CSS3
 * - Frameworks/Platforms: NodeJS, Express.js, NestJS, ReactJS, Vite, Next.js
 * - Database & ORM: MS SQL Server, MySQL, PostgreSQL, Redis, Prisma
 * - API Design & Tools: RESTful API, Swagger, Postman, Docker, Git
 * - DevOps & Infrastructure: Docker (Compose), CI/CD, Linux (Ubuntu), Windows Server, MinIO S3
 * - Other: Strong knowledge of OOP and Design Patterns
 */`
        }
      ]
    }
  ];

  const personalInfoFiles: FileItem[] = [
    {
      name: 'bio',
      type: 'folder',
      children: [
        {
          name: 'summary.txt',
          type: 'file',
          icon: '/images/icon-markdown.svg',
          content: `/**
 * SUMMARY
 * I am a Full-stack Developer with 1 year of experience specializing in Node.js, NestJS, and React.js.
 * I have a proven track record in building real time IoT medical device management systems
 * and optimizing complex backend logic.
 * I am dedicated to building scalable architecture and high-quality code to deliver impactful
 * backend solutions and enhance system performance.
 */`
        }
      ]
    },
    {
      name: 'interests',
      type: 'folder',
      children: [
        {
          name: 'hobbies.md',
          type: 'file',
          icon: '/images/icon-hobbies.svg',
          content: `/**
 * INTERESTS
 * 
 * - Building scalable web applications
 * - Learning new technologies
 * - Mobile app development
 * - Problem solving
 */`
        }
      ]
    },
    {
      name: 'education',
      type: 'folder',
      children: [
        {
          name: 'college.md',
          type: 'file',
          icon: '/images/icon-markdown.svg',
          content: `/**
 * EDUCATION
 * 
 * 2023 - 2025
 * Van Lang Sai Gon College
 * Major: Information Technology
 * GPA: 3.17/4.0
 * 
 * Honors & Awards:
 * - 3rd Prize – Altair Engineering Challenge 2025
 * - Outstanding Student Award (2023 - 2024)
 */`
        }
      ]
    }
  ];

  const hobbiesFiles: FileItem[] = [
    {
      name: 'gaming',
      type: 'folder',
      children: [
        {
          name: 'favorites.txt',
          type: 'file',
          icon: '/images/icon-hobbies.svg',
          content: `/**
 * GAMES
 * 
 * I like to play strategy and puzzle games.
 */`
        }
      ]
    }
  ];

  const contactFiles: FileItem[] = [
    {
      name: 'nguyenhai@haismile.dev',
      type: 'file',
      icon: '/images/icon-message.svg',
      content: `/**
 * Thông tin liên hệ
 * 
 * Email: nguyenhai@haismile.dev
 * Thời gian phản hồi: Trong vòng 24 giờ
 * Ngôn ngữ: Tiếng Việt, Tiếng Anh
 * 
 * Ưu tiên liên hệ cho các mục đích:
 * - Hợp tác dự án
 * - Trao đổi kỹ thuật
 * - Các cơ hội hợp tác kinh doanh
 */
`
    },
    {
      name: '0334204526',
      type: 'file',
      icon: '/images/icon-phone.svg', 
      content: `/**
 * Liên hệ qua điện thoại
 * 
 * Số điện thoại: 0334204526
 * Thời gian liên hệ: Thứ 2 - Thứ 6, từ 9h sáng đến 6h chiều
 * 
 * Phù hợp nhất cho:
 * - Các vấn đề dự án khẩn cấp
 * - Tư vấn kỹ thuật
 * - Sắp xếp lịch phỏng vấn
 */
`
    }
  ];

  const defaultContent = `/**
 * About Me
 * 
 * I am Nguyen Hong Hai, a Full-stack Developer with 1 year of experience 
 * specializing in Node.js, NestJS, and React.js. 
 * 
 * I have a proven track record in building real time IoT medical device 
 * management systems and optimizing complex backend logic. I am dedicated 
 * to building scalable architecture and high-quality code to deliver 
 * impactful backend solutions and enhance system performance.
 * 
 * Recently, I architected core backend services with Express.js to manage 
 * device data, lifecycle tracking, and implemented real-time alerting via Socket.io.
 */
`;

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const selectFile = (fileName: string, content?: string) => {
    setSelectedFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
  };

  const closeTab = (tabName: string) => {
    setOpenTabs(prev => prev.filter(t => t !== tabName));
    if (selectedFile === tabName) {
      const remaining = openTabs.filter(t => t !== tabName);
      setSelectedFile(remaining[remaining.length - 1] || '');
    }
  };

  const getCurrentContent = () => {
    // Find content for selected file
    const findContent = (files: FileItem[]): string | undefined => {
      for (const file of files) {
        if (file.name === selectedFile && file.content) {
          return file.content;
        }
        if (file.children) {
          const found = findContent(file.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findContent([...personalInfoFiles, ...professionalInfoFiles, ...hobbiesFiles, ...contactFiles]) || defaultContent;
  };

  const renderFileTree = (files: FileItem[], title: string) => {
    return (
      <motion.div 
      className="p-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="hidden lg:flex text-accent-orange text-sm mb-4 items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span>▼</span>
        <span>{title}</span>
      </motion.div>
      
      {/* File Tree */}
      {files.map((item, index) => (
        <motion.div 
          key={item.name} 
          className="ml-4 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <motion.div 
            className="flex items-center gap-2 text-text-secondary text-sm py-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => item.type === 'folder' && toggleFolder(item.name)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.type === 'folder' && (
              <>
                <motion.span 
                  className="text-accent-orange"
                  animate={{ rotate: expandedFolders.includes(item.name) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▶
                </motion.span>
                <motion.img 
                  src="/images/icon-folder.svg" 
                  alt="folder" 
                  className="w-4 h-4"
                  whileHover={{ scale: 1.1 }}
                />
              </>
            )}
            <span>{item.name}</span>
          </motion.div>
          
          <AnimatePresence>
            {item.children && expandedFolders.includes(item.name) && (
              <motion.div 
                className="ml-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.children.map((child, childIndex) => (
                  <motion.div 
                    key={child.name}
                    className={`flex items-center gap-2 text-sm py-1 cursor-pointer transition-all ${
                      selectedFile === child.name ? 'text-white bg-dark-border/20' : 'text-text-secondary hover:text-white'
                    }`}
                    onClick={() => selectFile(child.name, child.content)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: childIndex * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {child.icon && (
                      <motion.img 
                        src={child.icon} 
                        alt={child.name} 
                        className="w-4 h-4"
                        whileHover={{ rotate: 5 }}
                      />
                    )}
                    <span>{child.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-dark-primary min-w-0">
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-w-0">
        {/* Desktop Sidebars */}
        <div className="hidden lg:flex w-80 bg-dark-secondary border-r border-dark-border shrink-0 h-full min-w-0">
          {/* Leftmost Sidebar - Tab Icons */}
          <div className="w-16 flex flex-col justify-start items-center py-4 gap-8 border-r border-dark-border">
            <button
              onClick={() => setActiveTab('personal-info')}
              className={`w-6 h-6 ${activeTab === 'personal-info' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-professional-info.svg" alt="Personal Info" width={24} height={24} />
            </button>
            <button
              onClick={() => setActiveTab('professional-info')}
              className={`w-6 h-6 ${activeTab === 'professional-info' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-personal-info.svg" alt="Professional Info" width={24} height={24} />
            </button>
            <button
              onClick={() => setActiveTab('hobbies')}
              className={`w-6 h-6 ${activeTab === 'hobbies' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-hobbies.svg" alt="Hobbies" width={24} height={24} />
            </button>
          </div>

          {/* Second Sidebar - File Tree Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'personal-info' && (
                <>
                  {renderFileTree(personalInfoFiles, 'personal-info')}
                  <div className="p-3 mt-4 border-t border-dark-border">
                    <div className="text-accent-orange text-sm mb-4 flex items-center gap-2">
                      <span>▼</span>
                      <span>contacts</span>
                    </div>
                    {contactFiles.map((item) => (
                      <div key={item.name} className="ml-4 mb-2">
                        <div 
                          className={`flex items-center gap-2 text-sm py-1 cursor-pointer hover:text-white ${
                            selectedFile === item.name ? 'text-white bg-dark-border/20' : 'text-text-secondary'
                          }`}
                          onClick={() => selectFile(item.name, item.content)}
                        >
                          {item.icon && <Image src={item.icon} alt={item.name} width={16} height={16} className="w-4 h-4" />}
                          <span>{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 'professional-info' && renderFileTree(professionalInfoFiles, 'professional-info')}
              {activeTab === 'hobbies' && renderFileTree(hobbiesFiles, 'hobbies')}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Sidebar */}
        <div className="lg:hidden flex flex-col w-full bg-dark-bg shrink-0 min-w-0">
          <div className="text-text-secondary px-4 py-3 border-b border-dark-border font-fira text-sm">
            _about-me
          </div>
          
          {/* personal-info */}
          <div className="flex flex-col border-b border-dark-border">
            <button 
              onClick={() => setActiveMobileTab(activeMobileTab === 'personal-info' ? '' : 'personal-info')} 
              className="px-4 py-3 bg-dark-secondary flex items-center gap-2 text-white font-fira text-sm"
            >
              <span className={`transform transition-transform text-text-secondary ${activeMobileTab === 'personal-info' ? 'rotate-90' : ''}`}>▶</span>
              <span>personal-info</span>
            </button>
            <AnimatePresence>
              {activeMobileTab === 'personal-info' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-dark-bg"
                >
                  {renderFileTree(personalInfoFiles, 'personal-info')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* professional-info */}
          <div className="flex flex-col border-b border-dark-border">
            <button 
              onClick={() => setActiveMobileTab(activeMobileTab === 'professional-info' ? '' : 'professional-info')} 
              className="px-4 py-3 bg-dark-secondary flex items-center gap-2 text-white font-fira text-sm"
            >
              <span className={`transform transition-transform text-text-secondary ${activeMobileTab === 'professional-info' ? 'rotate-90' : ''}`}>▶</span>
              <span>professional-info</span>
            </button>
            <AnimatePresence>
              {activeMobileTab === 'professional-info' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-dark-bg"
                >
                  {renderFileTree(professionalInfoFiles, 'professional-info')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* hobbies */}
          <div className="flex flex-col border-b border-dark-border">
            <button 
              onClick={() => setActiveMobileTab(activeMobileTab === 'hobbies' ? '' : 'hobbies')} 
              className="px-4 py-3 bg-dark-secondary flex items-center gap-2 text-white font-fira text-sm"
            >
              <span className={`transform transition-transform text-text-secondary ${activeMobileTab === 'hobbies' ? 'rotate-90' : ''}`}>▶</span>
              <span>hobbies</span>
            </button>
            <AnimatePresence>
              {activeMobileTab === 'hobbies' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-dark-bg"
                >
                  {renderFileTree(hobbiesFiles, 'hobbies')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* contacts */}
          <div className="flex flex-col border-b border-dark-border">
            <button 
              onClick={() => setActiveMobileTab(activeMobileTab === 'contacts' ? '' : 'contacts')} 
              className="px-4 py-3 bg-dark-secondary flex items-center gap-2 text-white font-fira text-sm"
            >
              <span className={`transform transition-transform text-text-secondary ${activeMobileTab === 'contacts' ? 'rotate-90' : ''}`}>▶</span>
              <span>contacts</span>
            </button>
            <AnimatePresence>
              {activeMobileTab === 'contacts' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-dark-bg p-3"
                >
                  {contactFiles.map((item) => (
                    <div key={item.name} className="ml-4 mb-2">
                      <div 
                        className={`flex items-center gap-2 text-sm py-1 cursor-pointer hover:text-white ${
                          selectedFile === item.name ? 'text-white bg-dark-border/20' : 'text-text-secondary'
                        }`}
                        onClick={() => selectFile(item.name, item.content)}
                      >
                        {item.icon && <Image src={item.icon} alt={item.name} width={16} height={16} className="w-4 h-4" />}
                        <span>{item.name}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* File Tabs */}
          {openTabs.length > 0 && (
            <div className="flex border-b border-dark-border bg-dark-secondary">
              {openTabs.map((tab) => (
                <div 
                  key={tab}
                  className={`flex items-center gap-2 px-4 py-2 border-r border-dark-border cursor-pointer ${
                    selectedFile === tab ? 'bg-dark-primary text-white' : 'text-text-secondary hover:text-white'
                  }`}
                  onClick={() => setSelectedFile(tab)}
                >
                  <span className="text-sm">{tab}</span>
                  <button 
                    className="text-text-secondary hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Content Split */}
          <div className="flex flex-1 min-w-0">
            {/* Code Area */}
            <div className="flex-1 bg-dark-primary p-4 lg:p-6 relative min-w-0">
              <div className="flex gap-4 lg:gap-10 h-full overflow-y-auto overflow-x-hidden">
                {/* Line Numbers */}
                <div className="text-text-secondary text-right select-none text-lg leading-relaxed shrink-0">
                  {Array.from({length: 16}, (_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                  ))}
                </div>
                
                {/* Code Content */}
                <div className="text-text-secondary font-mono leading-relaxed whitespace-pre-wrap text-lg flex-1 min-w-0 break-words">
                  {getCurrentContent()}
                </div>
              </div>
              
              {/* Scroll indicator */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-text-secondary rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
