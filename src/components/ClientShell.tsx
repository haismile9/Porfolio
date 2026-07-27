'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Header } from './Header'
import { Footer } from './Footer'
import { ChatBox } from './ChatBox'
import { PageTransition } from './PageTransition'

interface ClientShellProps {
  children: React.ReactNode
}

export function ClientShell({ children }: ClientShellProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  // Determine active tab based on pathname
  let activeTab = '_hello'
  if (pathname === '/about') activeTab = '_about-me'
  else if (pathname === '/projects') activeTab = '_projects'
  else if (pathname === '/games') activeTab = '_game'
  else if (pathname === '/contact') activeTab = '_contact-me'

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-dark-bg">
      {pathname === '/' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Blue blur - positioned in top-right area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            className="absolute -top-32 -right-32 w-[700px] h-[700px] lg:w-[881px] lg:h-[831px] lg:-top-40 lg:-right-40"
            style={{ zIndex: 1 }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/blue-blur.svg"
                alt=""
                width={881}
                height={831}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>
          
          {/* Green blur - positioned in center-left area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
            className="absolute top-20 -left-32 w-[600px] h-[550px] lg:w-[864px] lg:h-[783px] lg:top-32 lg:-left-40"
            style={{ zIndex: 2 }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/green-blur.svg"
                alt=""
                width={864}
                height={783}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Additional subtle gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5" style={{ zIndex: 3 }} />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-teal-900/5" style={{ zIndex: 4 }} />
        </div>
      )}

      <div className="relative z-10">
        <Header activeTab={activeTab} />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden relative z-0">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative min-w-0 @container">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        
        {/* IDE-style Bottom Panel (Terminal) */}
        <div 
          className={`
            w-full bg-[#0d1117] flex flex-col z-20 shadow-2xl overflow-hidden
            transition-all duration-500 ease-in-out border-t border-dark-border shrink-0
            ${isChatOpen 
              ? 'h-[50vh] lg:h-[35vh] opacity-100 translate-y-0 pointer-events-auto' 
              : 'h-0 opacity-0 translate-y-8 pointer-events-none border-t-0'
            }
          `}
        >
          {/* Inner container */}
          <div className="w-full h-full flex flex-col">
            {/* Close button for mobile is no longer needed since it's a bottom panel that doesn't cover everything, 
                but we can keep a drag handle or just rely on the toggle button in Footer */}
            <ChatBox onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer onToggleChat={() => setIsChatOpen(!isChatOpen)} isChatOpen={isChatOpen} />
      </div>
    </div>
  )
}
