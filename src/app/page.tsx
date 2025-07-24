'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SnakeGame } from '@/components/SnakeGame'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20px] right-[20px] w-[780px] h-[742px] pointer-events-none">
          {/* Blue blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-[158px] left-[223px] w-[556px] h-[584px]"
          >
            <Image
              src="/images/blue-blur.svg"
              alt=""
              width={556}
              height={584}
              className="w-full h-full object-cover blur-[174px]"
            />
          </motion.div>
          
          {/* Green blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute top-0 left-0 w-[525px] h-[490px]"
          >
            <Image
              src="/images/green-blur.svg"
              alt=""
              width={525}
              height={490}
              className="w-full h-full object-cover blur-[174px]"
            />
          </motion.div>
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col min-h-screen bg-dark-surface">
        <Header />
        
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="flex items-center gap-[146px] w-full max-w-7xl">
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
                    &gt; Front-end developer
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
