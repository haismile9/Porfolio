'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-primary flex flex-col">
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 p-8">
          
          {/* Left Side: 404 Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative font-bold select-none flex items-center justify-center"
            style={{ fontSize: '12rem', lineHeight: 1 }}
          >
            {/* Base Layer */}
            <span className="text-dark-secondary relative z-20">404</span>
            {/* Outline Layer 1 */}
            <span className="absolute text-transparent z-10" style={{ WebkitTextStroke: '2px #607B96', transform: 'translate(10px, 10px)' }}>404</span>
            {/* Outline Layer 2 */}
            <span className="absolute text-transparent z-0" style={{ WebkitTextStroke: '2px #43D9AD', transform: 'translate(-10px, -10px)', opacity: 0.3 }}>404</span>
          </motion.div>

          {/* Right Side: Code Snippet */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex text-sm lg:text-base font-fira leading-relaxed"
          >
            {/* Line Numbers */}
            <div className="flex flex-col text-text-secondary opacity-50 pr-8 select-none text-right">
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex flex-col">
              <div>
                <span className="text-accent-purple">const</span> <span className="text-white">page</span> <span className="text-text-secondary">=</span> <span className="text-accent-orange">findPage</span><span className="text-white">(</span><span className="text-accent-green">&apos;you-were-looking-for&apos;</span><span className="text-white">);</span>
              </div>
              <br />
              <div>
                <span className="text-accent-purple">if</span> <span className="text-white">(!page) {'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-accent-orange">console</span><span className="text-white">.</span><span className="text-accent-orange">log</span><span className="text-white">(</span><span className="text-accent-green">&quot;Oops! Looks like you took a wrong turn in the codebase.&quot;</span><span className="text-white">);</span>
              </div>
              <div className="pl-4">
                <span className="text-accent-orange">console</span><span className="text-white">.</span><span className="text-accent-orange">log</span><span className="text-white">(</span><span className="text-accent-green">&quot;But hey, since you&apos;re here ...&quot;</span><span className="text-white">);</span>
              </div>
              <div className="pl-4">
                <span className="text-accent-orange">console</span><span className="text-white">.</span><span className="text-accent-orange">log</span><span className="text-white">(</span><span className="text-accent-green">&quot;🔍 Go back to the homepage and explore more cool stuff!&quot;</span><span className="text-white">);</span>
              </div>
              <div className="pl-4">
                <span className="text-accent-purple">throw</span> <span className="text-accent-purple">new</span> <span className="text-accent-orange">Error</span><span className="text-white">(</span><span className="text-accent-green">&quot;404: PageNotFoundError 😵&quot;</span><span className="text-white">);</span>
              </div>
              <div>
                <span className="text-white">{'}'}</span>
              </div>
              <br />
              <div className="text-text-secondary">
                {'/* Suggestions:'}
              </div>
              <div className="text-text-secondary pl-2">
                {'* - Check the URL for typos'}
              </div>
              <div className="text-text-secondary pl-2">
                {'* - Use the site navigation'}
              </div>
              <div className="text-text-secondary pl-2">
                {'* - Or hit CMD+Z in real life 😅'}
              </div>
              <div className="text-text-secondary pl-2">
                {'*/'}
              </div>
              <br />
              <div>
                <span className="text-accent-orange">redirect</span><span className="text-white">(</span><span className="text-accent-green">&apos;home&apos;</span><span className="text-white">);</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
