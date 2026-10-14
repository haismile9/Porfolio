'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

  // Close the mobile menu on navigation and on Escape
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-dark-border"
    >
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        {/* Logo + current page (mobile) */}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:border-r border-dark-border flex-1 lg:flex-none min-w-0"
        >
          <Image 
            src="/images/smile_logo/OIP-Photoroom.png" 
            alt="hai-smile logo" 
            width={32} 
            height={32}
            className="w-8 h-8 object-contain shrink-0"
          />
          <span className="lg:hidden font-fira text-sm text-text-primary truncate">
            {activeTab}
          </span>
        </Link>
        
        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="lg:hidden self-stretch px-4 text-text-secondary hover:text-white border-l border-dark-border"
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

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full h-[calc(100dvh-100%)] bg-dark-bg border-t border-dark-border z-50 flex flex-col overflow-y-auto"
          >
            <div className="px-4 py-4 border-b border-dark-border text-text-secondary font-fira text-sm">
              # navigate:
            </div>
            <nav className="flex flex-col">
              {menuItems.map((item, index) => {
                const isActive = item.name === activeTab
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 border-b border-dark-border font-fira text-base transition-colors",
                        isActive
                          ? "text-text-primary bg-dark-border/20 shadow-[inset_3px_0_0_#FFB86A]"
                          : "text-text-secondary active:bg-dark-border/20"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-row lg:items-center lg:w-auto lg:justify-between flex-1">
        {/* Main Links */}
        <nav className="flex flex-row items-center">
          {menuItems.slice(0, 5).map((item, index) => (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col border-r border-dark-border",
                  index === 0 && "border-l border-dark-border"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center gap-2.5 px-8 py-4 transition-colors",
                  item.name === activeTab
                    ? "text-text-primary border-b-[3px] border-accent-orange" 
                    : "text-text-secondary hover:text-text-primary"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col border-l border-dark-border"
          >
            <div className={cn(
              "flex items-center justify-center gap-2.5 px-8 py-4 transition-colors",
              menuItems[5].name === activeTab
                ? "text-text-primary border-b-[3px] border-accent-orange" 
                : "text-text-secondary hover:text-text-primary"
            )}>
              <span className="text-base font-fira">{menuItems[5].name}</span>
            </div>
          </motion.a>
        </Link>
      </div>
    </motion.header>
  )
}
