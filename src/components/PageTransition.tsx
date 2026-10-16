'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    x: 300,
    filter: 'blur(4px)'
  },
  in: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)'
  },
  out: { 
    opacity: 0, 
    x: -300,
    filter: 'blur(4px)'
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  // Animate only when switching top-level sections, so navigating
  // between /blog and /blog/[slug] doesn't replay the page transition
  const section = pathname.split('/')[1] || '/';

  return (
    <motion.div
      key={section}
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full flex-1 flex flex-col h-full min-h-0 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
