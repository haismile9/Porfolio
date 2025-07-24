'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
  const [openTabs, setOpenTabs] = useState<string[]>(['education']);
  const [selectedFile, setSelectedFile] = useState<string>('education');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['personal-info', 'education']);

  // File structure based on Figma design
  const personalInfoFiles: FileItem[] = [
    {
      name: 'bio',
      type: 'folder',
      children: []
    },
    {
      name: 'interests', 
      type: 'folder',
      children: []
    },
    {
      name: 'education',
      type: 'folder',
      children: [
        {
          name: 'high-school',
          type: 'file',
          icon: '/images/icon-markdown.svg',
          content: `/**
 * High School Education
 * 
 * 2014-2018
 * Springfield High School
 * Computer Science Track
 * 
 * Relevant Coursework:
 * - Introduction to Programming
 * - Web Development Basics
 * - Computer Science Principles
 * - Mathematics (Advanced)
 */`
        },
        {
          name: 'university',
          type: 'file', 
          icon: '/images/icon-markdown.svg',
          content: `/**
 * University Education
 * 
 * 2018-2022
 * Bachelor of Computer Science
 * University of Technology
 * GPA: 3.8/4.0
 * 
 * 2022-2024
 * Master of Software Engineering
 * Institute of Advanced Technology
 * GPA: 3.9/4.0
 * 
 * Specializations:
 * - Full-Stack Web Development
 * - Software Architecture
 * - Machine Learning
 */`
        }
      ]
    }
  ];

  const contactFiles: FileItem[] = [
    {
      name: 'user@gmail.com',
      type: 'file',
      icon: '/images/icon-message.svg',
      content: `/**
 * Contact Information
 * 
 * Email: user@gmail.com
 * Response Time: 24 hours
 * Languages: English, Spanish
 * 
 * Preferred contact method for:
 * - Business inquiries
 * - Project collaborations
 * - Technical discussions
 */`
    },
    {
      name: '+3598246359',
      type: 'file',
      icon: '/images/icon-phone.svg', 
      content: `/**
 * Phone Contact
 * 
 * Phone: +3598246359
 * Available: Mon-Fri 9AM-6PM EST
 * 
 * Best for:
 * - Urgent project matters
 * - Technical consultations
 * - Interview scheduling
 */`
    }
  ];

  const defaultContent = `/**
 * About me
 * I have 5 years of еxperience in web
 * development lorem ipsum dolor sit amet, 
 * consectetur adipiscing elit, sed do eiusmod
 * tempor incididunt ut labore et dolore
 * magna aliqua. Ut enim ad minim veniam,
 * quis nostrud exercitation ullamco laboris
 * nisi ut aliquip ex ea commodo consequat.
 * Duis aute irure dolor in reprehenderit in
 *
 * Duis aute irure dolor in reprehenderit in
 * voluptate velit esse cillum dolore eu fugiat 
 * nulla pariatur. Excepteur sint occaecat 
 * officia deserunt mollit anim id est laborum.
 */`;

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

    return findContent([...personalInfoFiles, ...contactFiles]) || defaultContent;
  };

  return (
    <div className="min-h-screen bg-dark-primary flex flex-col">
      <Header activeTab="_about-me" />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tab Navigation */}
        <div className="w-80 bg-dark-secondary border-r border-dark-border flex flex-col">
          {/* Tab Icons */}
          <div className="flex flex-col border-b border-dark-border p-3 gap-8">
            <button
              onClick={() => setActiveTab('professional-info')}
              className={`w-6 h-6 ${activeTab === 'professional-info' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-professional-info.svg" alt="Professional Info" width={24} height={24} />
            </button>
            <button
              onClick={() => setActiveTab('personal-info')}
              className={`w-6 h-6 ${activeTab === 'personal-info' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-personal-info.svg" alt="Personal Info" width={24} height={24} />
            </button>
            <button
              onClick={() => setActiveTab('hobbies')}
              className={`w-6 h-6 ${activeTab === 'hobbies' ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image src="/images/icon-hobbies.svg" alt="Hobbies" width={24} height={24} />
            </button>
          </div>

          {/* Accordion Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'personal-info' && (
              <motion.div 
                className="p-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-accent-orange text-sm mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span>▼</span>
                  <span>personal-info</span>
                </motion.div>
                
                {/* File Tree */}
                {personalInfoFiles.map((item, index) => (
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
            )}

            {activeTab === 'professional-info' && (
              <div className="p-3">
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
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
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
          <div className="flex flex-1">
            {/* Code Area */}
            <div className="flex-1 bg-dark-primary p-6 border-r border-dark-border relative">
              <div className="flex gap-10 h-full overflow-auto">
                {/* Line Numbers */}
                <div className="text-text-secondary text-right select-none text-lg leading-relaxed">
                  {Array.from({length: 16}, (_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                  ))}
                </div>
                
                {/* Code Content */}
                <div className="text-text-secondary font-mono leading-relaxed whitespace-pre-wrap text-lg">
                  {getCurrentContent()}
                </div>
              </div>
              
              {/* Scroll indicator */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-text-secondary rounded"></div>
            </div>

            {/* Code Snippets Area */}
            <div className="w-1/2 bg-dark-primary p-6 relative overflow-auto">
              <div className="text-text-secondary font-mono mb-8 text-lg">
                {/* Code snippet showcase: */}
              </div>
              
              {/* Gist Snippets */}
              <div className="space-y-8">
                {/* Gist 1 - Expanded state with footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-dark-secondary border border-dark-border rounded-lg p-4 cursor-pointer transition-colors hover:border-accent-blue/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                      ></motion.div>
                      <div>
                        <div className="text-purple-400 font-bold text-sm">@username</div>
                        <div className="text-text-secondary text-xs">Created 5 months ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 cursor-pointer hover:text-accent-blue"
                      >
                        <span>💬</span>
                        <span>details</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 cursor-pointer hover:text-accent-teal"
                      >
                        <span>⭐</span>
                        <span>3 stars</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(16, 20, 24, 0.8)" }}
                    className="bg-dark-primary rounded-lg p-4 text-sm font-mono text-text-secondary mb-4 transition-colors"
                  >
                    {`function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}`}
                  </motion.div>
                  
                  {/* Footer section */}
                  <div className="flex justify-between items-start pt-4 border-t border-dark-border">
                    <div className="text-text-secondary text-sm leading-relaxed">
                      My work here was 5 months ago. It was for the project called &quot;...&quot;. Some other text can be placed here.
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-text-secondary hover:text-white ml-4"
                    >
                      ×
                    </motion.button>
                  </div>
                </motion.div>

                {/* Gist 2 - Default state */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-dark-secondary border border-dark-border rounded-lg p-4 cursor-pointer transition-colors hover:border-accent-blue/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-9 h-9 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"
                      ></motion.div>
                      <div>
                        <div className="text-purple-400 font-bold text-sm">@username</div>
                        <div className="text-text-secondary text-xs">Created 9 months ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 cursor-pointer hover:text-accent-blue"
                      >
                        <span>💬</span>
                        <span>details</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 cursor-pointer hover:text-accent-teal"
                      >
                        <span>⭐</span>
                        <span>0 stars</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(16, 20, 24, 0.8)" }}
                    className="bg-dark-primary rounded-lg p-4 text-sm font-mono text-text-secondary transition-colors"
                  >
                    {`export function parseModelTuple(
  response: Response,
  value: {+[key: string]: JSONValue} | $ReadOnlyArray<JSONValue>,
): any {
  const tuple: [mixed, mixed, mixed, mixed] = (value: any);`}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Scroll indicator */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-text-secondary rounded"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
