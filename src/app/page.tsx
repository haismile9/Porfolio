'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SnakeGame } from '@/components/SnakeGame'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col overflow-hidden relative">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* Main container */}
      <div className="relative flex flex-col min-h-screen bg-transparent" style={{ zIndex: 10 }}>
        <Header />
        
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="flex items-center gap-[146px] w-full max-w-7xl relative" style={{ zIndex: 11 }}>
            {/* About container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-[75px] w-[504px]"
            >
              {/* Introduction container */}
              <div className="flex flex-col gap-1">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-lg text-text-secondary font-fira"
                >
                  Hi all. I am
                </motion.p>
                
                <div className="flex flex-col gap-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="text-6xl font-fira leading-[1.1] text-text-primary"
                  >
                    Smile
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-3xl font-fira leading-[1.4] text-accent-blue"
                  >
                    &gt; Full-tack developer
                  </motion.p>
                </div>
              </div>

              {/* Links container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="flex flex-col gap-2"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                  className="text-base font-fira text-text-secondary leading-[1.5]"
                >
                  {/* complete the game to continue */}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                  className="text-base font-fira text-text-secondary leading-[1.5]"
                >
                  {/* find my profile on Github: */}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.0 }}
                  className="text-base font-fira text-text-primary leading-[1.31]"
                >
                  <span className="text-accent-blue">const</span>{' '}
                  <span className="text-text-primary">githubLink</span>{' '}
                  <span className="text-text-secondary">=</span>{' '}
                  <span className="text-accent-green">&quot;https://github.com/haismile9&quot;</span>
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Snake Game */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <SnakeGame />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
