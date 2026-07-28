'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Technology types
type Technology = 'Next.js' | 'React' | 'NestJS' | 'PostgreSQL' | 'MinIO' | 'Redis' | 'Firebase' | 'HTML' | 'CSS' | 'Flutter' | 'Laravel' | 'MySQL' | 'Java' | 'PHP';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  primaryTech: Technology;
  link?: string;
}

// Technology configuration
const technologies: { name: Technology; icon: string; color: string }[] = [
  { name: 'Next.js', icon: '/images/icon-react.svg', color: '#FFFFFF' },
  { name: 'React', icon: '/images/icon-react.svg', color: '#A3B3FF' },
  { name: 'NestJS', icon: '/images/icon-markdown.svg', color: '#E0234E' },
  { name: 'Flutter', icon: '/images/icon-flutter.svg', color: '#A3B3FF' },
  { name: 'Laravel', icon: '/images/icon-markdown.svg', color: '#FF2D20' },
  { name: 'Java', icon: '/images/icon-html.svg', color: '#5382A1' },
  { name: 'PHP', icon: '/images/icon-css.svg', color: '#777BB4' },
];

// Sample projects data
const projects: Project[] = [
  {
    id: 7,
    title: 'Portfolio',
    description: 'This website you\'re looking at.',
    image: '/images/Porfolio.png',
    technologies: ['Next.js', 'React', 'Firebase'],
    primaryTech: 'Next.js',
    link: 'https://haismile.dev/'
  },
  {
    id: 2,
    title: 'LUMIweb E-commerce',
    description: 'E-commerce web app with admin dashboard.',
    image: '/images/Lumi.png',
    technologies: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'MinIO', 'Redis'],
    primaryTech: 'Next.js',
    link: 'https://lumieyewear.haismile.dev/'
  },
  {
    id: 4,
    title: 'H-Task',
    description: 'Kanban task management web app to organize workflows.',
    image: '/images/H-task.png',
    technologies: ['React', 'Laravel', 'MySQL'],
    primaryTech: 'React',
    link: 'https://github.com/haismile9/Web_H-task'
  },
  {
    id: 5,
    title: 'Social Media App',
    description: 'Real-time social media app with chat and posts.',
    image: '/images/Social_media_app.png',
    technologies: ['Flutter', 'Firebase'],
    primaryTech: 'Flutter',
    link: 'https://github.com/haismile9/social_media_app'
  },
  {
    id: 6,
    title: 'Cellphones App',
    description: 'Mobile e-commerce app for Android with PHP & MySQL backend.',
    image: '/images/Cellphone.png',
    technologies: ['Java', 'PHP', 'MySQL'],
    primaryTech: 'Java',
    link: 'https://github.com/haismile9/Cellphones_app'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

export default function ProjectsPage() {
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleTechnology = (tech: Technology) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const filteredProjects = selectedTechs.length === 0 
    ? projects 
    : projects.filter(project => 
        selectedTechs.some(tech => project.technologies.includes(tech))
      );

  const getTechIcon = (techName: Technology) => {
    return technologies.find(t => t.name === techName)?.icon;
  };

  const getTechColor = (techName: Technology) => {
    return technologies.find(t => t.name === techName)?.color || '#A3B3FF';
  };

  const getFilterDisplayText = () => {
    if (selectedTechs.length === 0) return 'No filters';
    if (selectedTechs.length === 1) return selectedTechs[0];
    return selectedTechs.join('; ');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-dark-primary">
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0">
        {/* Left Sidebar - Technology Filter */}
        <motion.div 
          className="w-full lg:w-80 bg-dark-secondary lg:border-r border-b lg:border-b-0 border-dark-border flex flex-col shrink-0 max-h-[40vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Projects Section */}
          <div className="p-4 lg:p-6">
            <motion.div 
              className="flex items-center gap-3 text-accent-orange text-sm mb-4 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="transition-transform"
                animate={{ rotate: isDropdownOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▶
              </motion.span>
              <span>projects</span>
            </motion.div>
            
            {/* Technology Filter */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="ml-0 lg:ml-4 flex flex-row flex-wrap lg:flex-col gap-2 lg:gap-0 lg:space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {technologies.map((tech, index) => (
                    <motion.div 
                      key={tech.name}
                      className="flex items-center gap-6 py-1 px-3 cursor-pointer hover:bg-dark-border/20 rounded transition-colors"
                      onClick={() => toggleTechnology(tech.name)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Checkbox */}
                      <div className="relative w-5 h-5">
                        <motion.div 
                          className={`w-full h-full border border-text-secondary rounded-sm flex items-center justify-center ${
                            selectedTechs.includes(tech.name) ? 'bg-text-secondary' : 'bg-transparent'
                          }`}
                          animate={{
                            backgroundColor: selectedTechs.includes(tech.name) 
                              ? '#62748E' 
                              : 'transparent',
                            scale: selectedTechs.includes(tech.name) ? 1.1 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <AnimatePresence>
                            {selectedTechs.includes(tech.name) && (
                              <motion.img 
                                src="/images/icon-check.svg" 
                                alt="checked" 
                                className="w-3 h-3"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      {/* Technology */}
                      <div className="flex items-center gap-2">
                        <motion.img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className="w-6 h-6"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className={`text-sm transition-colors ${
                          selectedTechs.includes(tech.name) ? 'text-white' : 'text-text-secondary'
                        }`}>
                          {tech.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Filter Tabs */}
          <motion.div 
            className="flex border-b border-dark-border bg-dark-secondary"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-3 px-6 py-3 border-r border-dark-border bg-dark-primary"
              layout
              animate={{
                backgroundColor: selectedTechs.length > 0 ? '#0F172B' : '#1E293B'
              }}
            >
              <motion.span 
                className="text-text-secondary text-sm"
                key={getFilterDisplayText()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getFilterDisplayText()}
              </motion.span>
              <motion.button 
                className="text-text-secondary hover:text-white transition-colors"
                onClick={() => setSelectedTechs([])}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ×
              </motion.button>
            </motion.div>
            <div className="flex-1"></div>
          </motion.div>

          {/* Projects Grid */}
          <div className="flex-1 overflow-auto">
            <div className="px-16 pt-16 pb-0">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedTechs.join('-')}
                  className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-10 max-w-[1200px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div 
                      key={project.id} 
                      className="flex flex-col gap-4 max-w-[407px] h-full"
                      variants={itemVariants}
                      layout
                    >
                      {/* Project Title */}
                      <motion.h3 
                        className="text-accent-blue font-bold text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      {/* Project Card */}
                      <motion.div 
                        className="bg-dark-secondary border border-dark-border rounded-2xl overflow-hidden relative group cursor-pointer flex flex-col flex-1 h-full"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => project.link && window.open(project.link, '_blank')}
                      >
                        {/* View Project Floating Badge in Top Right Corner of Image */}
                        <motion.div 
                          className="absolute top-3.5 right-3.5 z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div 
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-bg/90 border border-dark-border group-hover:border-accent-blue/80 text-text-secondary group-hover:text-accent-blue text-xs font-fira backdrop-blur-md transition-all duration-200 shadow-lg group-hover:scale-105"
                          >
                            <span>view-project</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </motion.div>
                        
                        {/* Project Image */}
                        <div className="h-[155px] bg-dark-border border-b border-dark-border overflow-hidden shrink-0 relative">
                          <motion.img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        
                        {/* Project Content */}
                        <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                          <motion.p 
                            className="text-text-secondary text-sm lg:text-base leading-relaxed line-clamp-2 min-h-[44px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            {project.description}
                          </motion.p>
                          
                          {/* Tech Stack Pills */}
                          <motion.div
                            className="flex flex-wrap items-center gap-1.5 mt-auto pt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {project.technologies.map((tech) => (
                              <span 
                                key={tech} 
                                className="px-2.5 py-1 rounded-full text-xs font-fira bg-dark-primary border border-dark-border text-text-secondary group-hover:border-accent-blue/40 group-hover:text-accent-blue transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="w-10 flex flex-col items-center py-3 gap-2 border-l border-dark-border"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div 
                className="w-1.5 h-6 bg-accent-blue rounded-full"
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
