'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-t border-dark-border"
    >
      {/* Social Media Container */}
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* Find me in */}
        <div className="flex items-center justify-center gap-2.5 px-4 lg:px-6 py-4 border-b lg:border-b-0 lg:border-r border-dark-border">
          <span className="text-base font-fira text-text-secondary">
            find me in:
          </span>
        </div>

        {/* Social Links */}
        <div className="flex">
          {/* F (Facebook) */}
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-4 py-4 border-r border-dark-border text-text-muted hover:text-text-primary transition-colors flex-1 lg:flex-none justify-center"
          >
            <Image
              src="/images/x-icon.svg"
              alt="X (Facebook)"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/in/smile9/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-4 py-4 border-r lg:border-r border-dark-border text-text-muted hover:text-text-primary transition-colors flex-1 lg:flex-none justify-center"
          >
            <Image
              src="/images/linkedin-icon.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </motion.a>
        </div>
      </div>

      {/* GitHub Link */}
      <motion.a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 px-4 lg:px-8 py-4 lg:border-l border-dark-border text-text-secondary hover:text-text-primary transition-colors"
      >
        <span className="text-base font-fira">@haismile9</span>
        <Image
          src="/images/github-icon.svg"
          alt="GitHub"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </motion.a>
    </motion.footer>
  )
}
