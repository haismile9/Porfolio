'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: string;
  expanded?: boolean;
  children?: SidebarSubItem[];
}

interface SidebarSubItem {
  name: string;
  icon: string;
  content?: string;
}

interface AboutSidebarProps {
  onItemSelect: (content: string) => void;
  selectedItem: string;
}

export default function AboutSidebar({ onItemSelect, selectedItem }: AboutSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['personal-info', 'interests']);

  const sidebarItems: SidebarItem[] = [
    {
      name: 'personal-info',
      icon: '/images/icon-personal-info.svg',
      expanded: true,
      children: [
        {
          name: 'bio',
          icon: '/images/icon-personal-info.svg',
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
          name: 'interests',
          icon: '/images/icon-hobbies.svg',
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
          name: 'education',
          icon: '/images/icon-markdown.svg',
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
      icon: '/images/icon-phone.svg',
      children: [
        {
          name: 'email',
          icon: '/images/icon-message.svg',
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
  ];

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const handleItemClick = (item: SidebarSubItem) => {
    if (item.content) {
      onItemSelect(item.content);
    }
  };

  return (
    <div className="w-full bg-dark-secondary border-r border-dark-border">
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border">
        <span className="text-white text-sm font-medium">personal-info</span>
      </div>

      {/* Sidebar Content */}
      <div className="overflow-y-auto">
        {sidebarItems.map((section) => (
          <div key={section.name} className="border-b border-dark-border last:border-b-0">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.name)}
              className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-dark-border/20 transition-colors"
            >
              {expandedSections.includes(section.name) ? (
                <ChevronDown className="w-4 h-4 text-white" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white" />
              )}
              
              <div className="flex items-center gap-2">
                <Image 
                  src={section.icon} 
                  alt={section.name}
                  width={16}
                  height={16}
                  className="text-accent-orange"
                />
                <span className="text-white text-sm">{section.name}</span>
              </div>
            </button>

            {/* Section Items */}
            {expandedSections.includes(section.name) && section.children && (
              <div className="bg-dark-primary/50">
                {section.children.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "w-full flex items-center gap-2 px-8 py-2 text-left transition-colors",
                      selectedItem === item.name
                        ? "bg-dark-border/40 text-white"
                        : "text-text-secondary hover:text-white hover:bg-dark-border/20"
                    )}
                  >
                    <Image 
                      src={item.icon} 
                      alt={item.name}
                      width={14}
                      height={14}
                    />
                    <span className="text-xs">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
