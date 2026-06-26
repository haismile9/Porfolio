'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SnakeGame } from '@/components/SnakeGame'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">


      {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 lg:px-8 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[146px] w-full max-w-7xl relative" style={{ zIndex: 11 }}>
            {/* About container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center gap-16 lg:gap-[75px] w-full lg:w-[504px]"
            >
              {/* Introduction container */}
              <div className="flex flex-col gap-1">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-text-secondary font-fira"
                >
                  Hi all. I am
                </motion.p>
                
                <div className="flex flex-col gap-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl lg:text-6xl font-fira leading-[1.1] text-text-primary"
                  >
                    Nguyen Hong Hai
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-2xl lg:text-3xl font-fira leading-[1.4] text-accent-blue"
                  >
                    &gt; Full-stack Developer
                  </motion.p>
                </div>
              </div>

              {/* Links container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-2"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="hidden @5xl:block text-base font-fira text-text-secondary leading-[1.5]"
                >
                  {'//'} complete the game to continue
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="text-sm lg:text-base font-fira text-text-secondary leading-[1.5]"
                >
                  {'//'} find my profile on Github:
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="text-sm lg:text-base font-fira text-text-primary leading-[1.31] break-words lg:break-normal"
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden @5xl:block"
            >
              <SnakeGame />
            </motion.div>
          </div>
        </main>
    </div>
  )
}
