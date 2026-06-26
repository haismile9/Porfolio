'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface FooterProps {
  onToggleChat?: () => void;
  isChatOpen?: boolean;
}

export function Footer({ onToggleChat, isChatOpen }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-row justify-between items-center border-t border-dark-border"
    >
      {/* Social Media Container */}
      <div className="flex flex-row items-center h-full">
        {/* Find me in */}
        <div className="hidden lg:flex items-center justify-center gap-2.5 px-4 lg:px-6 py-4 border-r border-dark-border h-full">
          <span className="text-base font-fira text-text-secondary">
            find me in:
          </span>
        </div>
        <div className="lg:hidden flex items-center justify-center px-4 py-4 border-r border-dark-border h-full">
          <span className="text-sm font-fira text-text-secondary">
            find me:
          </span>
        </div>

        {/* Social Links */}
        <div className="flex flex-row h-full">
          {/* F (Facebook) */}
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 lg:w-auto lg:px-4 py-4 border-r border-dark-border text-text-muted hover:text-text-primary transition-colors h-full"
          >
            <Image
              src="/images/x-icon.svg"
              alt="X (Facebook)"
              width={20}
              height={20}
              className="w-5 h-5 lg:w-6 lg:h-6"
            />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/in/smile9/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 lg:w-auto lg:px-4 py-4 border-r border-dark-border text-text-muted hover:text-text-primary transition-colors h-full"
          >
            <Image
              src="/images/linkedin-icon.svg"
              alt="LinkedIn"
              width={20}
              height={20}
              className="w-5 h-5 lg:w-6 lg:h-6"
            />
          </motion.a>
        </div>
      </div>

      {/* Right Side: GitHub Link & Chat Toggle */}
      <div className="flex flex-row items-center h-full">
        {/* GitHub Link */}
        <motion.a
          href="https://github.com/haismile9"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-12 lg:w-auto lg:px-8 py-4 lg:border-l border-dark-border text-text-secondary hover:text-text-primary transition-colors h-full"
        >
          <span className="hidden lg:inline text-base font-fira">@haismile9</span>

          <Image
            src="/images/github-icon.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="w-5 h-5 lg:w-6 lg:h-6"
          />
        </motion.a>

        {/* Global Chat Toggle Button */}
        {onToggleChat && (
          <motion.button
            onClick={onToggleChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center gap-2 w-12 lg:w-auto lg:px-6 py-4 lg:border-l border-l border-dark-border transition-colors h-full ${
              isChatOpen ? 'text-accent-blue bg-dark-border/20' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="hidden lg:inline text-base font-fira">Chat</span>
          </motion.button>
        )}
      </div>
    </motion.footer>
  )
}
