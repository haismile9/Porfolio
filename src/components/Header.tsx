'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const menuItems = [
  { name: '_hello', href: '/', active: false },
  { name: '_about-me', href: '/about', active: false },
  { name: '_projects', href: '/projects', active: false },
  { name: '_games', href: '/games', active: false},
  { name: '_contact-me', href: '/contact', active: false },
]

interface HeaderProps {
  activeTab?: string
}

export function Header({ activeTab = '_hello' }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-dark-border"
    >
      {/* Logo Container */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-32">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 px-4 lg:px-6 py-4 border-b lg:border-b-0 lg:border-r border-dark-border lg:border-dark-border">
          <span className="text-base font-fira text-text-secondary">
            hai-smile
          </span>
        </div>

        {/* Menu Container */}
        <nav className="flex flex-col lg:flex-row lg:items-center">
          {menuItems.slice(0, 4).map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "flex flex-col border-b lg:border-b-0 lg:border-r border-dark-border",
                index === 0 && "lg:border-l border-dark-border"
              )}
            >
              <div className={cn(
                "flex items-center justify-center gap-2.5 px-4 lg:px-8 py-4 transition-colors",
                item.name === activeTab
                  ? "text-text-primary lg:border-b-[3px] border-accent-orange bg-dark-border/20 lg:bg-transparent" 
                  : "text-text-secondary hover:text-text-primary hover:bg-dark-border/10 lg:hover:bg-transparent"
              )}>
                <span className="text-base font-fira">{item.name}</span>
              </div>
            </motion.a>
          ))}
        </nav>
      </div>

      {/* Contact Menu Item */}
      <motion.a
        href={menuItems[4].href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-col lg:border-l border-dark-border"
      >
        <div className={cn(
          "flex items-center justify-center gap-2.5 px-4 lg:px-8 py-4 transition-colors",
          menuItems[4].name === activeTab
            ? "text-text-primary lg:border-b-[3px] border-accent-orange bg-dark-border/20 lg:bg-transparent" 
            : "text-text-secondary hover:text-text-primary hover:bg-dark-border/10 lg:hover:bg-transparent"
        )}>
          <span className="text-base font-fira">{menuItems[4].name}</span>
        </div>
      </motion.a>
    </motion.header>
  )
}
