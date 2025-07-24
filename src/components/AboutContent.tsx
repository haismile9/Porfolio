'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, X } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileNode[];
  path: string;
  content?: string;
}

interface AboutContentProps {
  selectedContent: string;
  selectedItem: string;
}

export default function AboutContent({ selectedContent, selectedItem }: AboutContentProps) {
  const [openTabs, setOpenTabs] = useState<string[]>(['bio']);
  const [activeTab, setActiveTab] = useState<string>('bio');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['Portfolio', 'personal-info']);

  // File explorer structure
  const fileStructure: FileNode[] = [
    {
      name: 'Portfolio',
      type: 'folder',
      path: 'Portfolio',
      children: [
        {
          name: 'personal-info',
          type: 'folder',
          path: 'Portfolio/personal-info',
          children: [
            {
              name: 'bio.txt',
              type: 'file',
              icon: '/images/icon-personal-info.svg',
              path: 'Portfolio/personal-info/bio.txt',
              content: `/**
 * About me
 * I have 5 years of experience in web
 * development lorem ipsum dolor sit amet,
 * consectetur adipiscing elit, sed do eiusmod
 * tempor incididunt ut labore et dolore magna
 * aliqua. Ut enim ad minim veniam, quis nostrud
 * exercitation ullamco laboris nisi ut aliquip ex
 * ea commodo consequat.
 */`
            },
            {
              name: 'interests.js',
              type: 'file',
              icon: '/images/icon-hobbies.svg',
              path: 'Portfolio/personal-info/interests.js',
              content: `/**
 * My interests include:
 * - Building scalable web applications
 * - Open source contributions
 * - Learning new technologies
 * - Game development
 * - Mobile app development
 */`
            },
            {
              name: 'education.html',
              type: 'file',
              icon: '/images/icon-markdown.svg',
              path: 'Portfolio/personal-info/education.html',
              content: `/**
 * Education:
 * 
 * 2018-2022
 * Bachelor of Computer Science
 * University of Technology
 * 
 * 2022-2024
 * Master of Software Engineering
 * Institute of Advanced Technology
 */`
            }
          ]
        },
        {
          name: 'contacts',
          type: 'folder',
          path: 'Portfolio/contacts',
          children: [
            {
              name: 'email.py',
              type: 'file',
              icon: '/images/icon-message.svg',
              path: 'Portfolio/contacts/email.py',
              content: `/**
 * Contact Information
 * 
 * Email: john.doe@example.com
 * Phone: +1 (555) 123-4567
 * Location: San Francisco, CA
 * LinkedIn: linkedin.com/in/johndoe
 * GitHub: github.com/johndoe
 */`
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    if (selectedItem && !openTabs.includes(selectedItem)) {
      setOpenTabs(prev => [...prev, selectedItem]);
    }
    if (selectedItem) {
      setActiveTab(selectedItem);
    }
  }, [selectedItem, openTabs]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const handleFileClick = (file: FileNode) => {
    if (!openTabs.includes(file.name.split('.')[0])) {
      setOpenTabs(prev => [...prev, file.name.split('.')[0]]);
    }
    setActiveTab(file.name.split('.')[0]);
  };

  const closeTab = (tabName: string) => {
    const newTabs = openTabs.filter(tab => tab !== tabName);
    setOpenTabs(newTabs);
    
    if (activeTab === tabName) {
      setActiveTab(newTabs[newTabs.length - 1] || '');
    }
  };

  const getFileIcon = (file: FileNode) => {
    if (file.icon) {
      return <Image src={file.icon} alt={file.name} width={16} height={16} />;
    }
    return <File className="w-4 h-4 text-text-secondary" />;
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 pr-2 hover:bg-dark-border/20 cursor-pointer transition-colors",
            depth === 0 ? "pl-2" : `pl-${2 + depth * 4}`
          )}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => node.type === 'folder' ? toggleFolder(node.path) : handleFileClick(node)}
        >
          {node.type === 'folder' ? (
            <>
              {expandedFolders.includes(node.path) ? (
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              ) : (
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              )}
              {expandedFolders.includes(node.path) ? (
                <FolderOpen className="w-4 h-4 text-accent-orange" />
              ) : (
                <Folder className="w-4 h-4 text-accent-orange" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              {getFileIcon(node)}
            </>
          )}
          <span className="text-text-secondary text-sm hover:text-white transition-colors">
            {node.name}
          </span>
        </div>
        
        {node.type === 'folder' && 
         expandedFolders.includes(node.path) && 
         node.children && (
          <div>
            {renderFileTree(node.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getCurrentContent = () => {
    if (selectedContent) return selectedContent;
    
    // Find content for active tab
    const findContent = (nodes: FileNode[]): string | undefined => {
      for (const node of nodes) {
        if (node.type === 'file' && node.name.split('.')[0] === activeTab) {
          return node.content;
        }
        if (node.children) {
          const found = findContent(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findContent(fileStructure) || `// Welcome to my portfolio\n// Select a file from the explorer to view its content`;
  };

  return (
    <div className="flex-1 flex">
      {/* File Explorer */}
      <div className="w-80 bg-dark-secondary border-r border-dark-border">
        {/* Explorer Header */}
        <div className="flex items-center gap-2 px-3 py-3 border-b border-dark-border">
          <span className="text-white text-sm font-medium">Explorer</span>
        </div>

        {/* File Tree */}
        <div className="overflow-y-auto p-2">
          {renderFileTree(fileStructure)}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        {openTabs.length > 0 && (
          <div className="flex border-b border-dark-border bg-dark-secondary">
            {openTabs.map((tab) => (
              <div
                key={tab}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border-r border-dark-border cursor-pointer group",
                  activeTab === tab
                    ? "bg-dark-primary text-white"
                    : "text-text-secondary hover:text-white hover:bg-dark-border/20"
                )}
                onClick={() => setActiveTab(tab)}
              >
                <span className="text-sm">{tab}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab);
                  }}
                  className="w-4 h-4 flex items-center justify-center rounded hover:bg-dark-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Code Content */}
        <div className="flex-1 bg-dark-primary">
          <pre className="h-full p-6 overflow-auto">
            <code className="text-sm text-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
              {getCurrentContent()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
