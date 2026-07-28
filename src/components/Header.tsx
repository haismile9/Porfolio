'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { name: '_hello', href: '/', active: false },
  { name: '_about-me', href: '/about', active: false },
  { name: '_projects', href: '/projects', active: false },
  { name: '_blog', href: '/blog', active: false },
  { name: '_game', href: '/games', active: false },
  { name: '_contact-me', href: '/contact', active: false },
]

interface HeaderProps {
  activeTab?: string
}

export function Header({ activeTab = '_hello' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-dark-border"
    >
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        {/* Logo */}
        <div className="flex items-center justify-center px-4 lg:px-6 py-3 border-b lg:border-b-0 lg:border-r border-dark-border lg:border-dark-border flex-1 lg:flex-none justify-start">
          <Image 
            src="/images/smile_logo/OIP-Photoroom.png" 
            alt="hai-smile logo" 
            width={32} 
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        
        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden px-4 py-4 text-text-secondary hover:text-white border-b border-l border-dark-border"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className={cn(
        "lg:flex lg:flex-row lg:items-center lg:w-auto lg:justify-between flex-1",
        isMenuOpen ? "absolute top-full left-0 w-full bg-dark-bg z-50 flex flex-col h-[calc(100vh-105px)]" : "hidden"
      )}>
        {/* Mobile menu label */}
        <div className="lg:hidden px-4 py-4 border-b border-dark-border text-text-secondary font-fira text-sm">
          # navigate:
        </div>

        {/* Main Links */}
        <nav className="flex flex-col lg:flex-row lg:items-center">
          {menuItems.slice(0, 5).map((item, index) => (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <motion.a
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col border-b lg:border-b-0 lg:border-r border-dark-border",
                  index === 0 && "lg:border-l border-dark-border"
                )}
              >
                <div className={cn(
                  "flex items-center justify-start lg:justify-center gap-2.5 px-4 lg:px-8 py-4 transition-colors",
                  item.name === activeTab
                    ? "text-text-primary lg:border-b-[3px] border-accent-orange bg-dark-border/10 lg:bg-transparent" 
                    : "text-text-secondary hover:text-text-primary hover:bg-dark-border/10 lg:hover:bg-transparent"
                )}>
                  <span className="text-base font-fira">{item.name}</span>
                </div>
              </motion.a>
            </Link>
          ))}
        </nav>

        {/* Contact Menu Item */}
        <Link href={menuItems[5].href} passHref legacyBehavior>
          <motion.a
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col lg:border-l border-dark-border mt-auto lg:mt-0"
          >
            <div className={cn(
              "flex items-center justify-start lg:justify-center gap-2.5 px-4 lg:px-8 py-4 transition-colors",
              menuItems[5].name === activeTab
                ? "text-text-primary lg:border-b-[3px] border-accent-orange bg-dark-border/10 lg:bg-transparent" 
                : "text-text-secondary hover:text-text-primary hover:bg-dark-border/10 lg:hover:bg-transparent"
            )}>
              <span className="text-base font-fira">{menuItems[5].name}</span>
            </div>
          </motion.a>
        </Link>
      </div>
    </motion.header>
  )
}
