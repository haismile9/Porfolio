'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

// Technology types
type Technology = 'React' | 'HTML' | 'CSS' | 'Vue' | 'Angular' | 'Gatsby' | 'Flutter';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  primaryTech: Technology;
}

// Technology configuration
const technologies: { name: Technology; icon: string; color: string }[] = [
  { name: 'React', icon: '/images/icon-react.svg', color: '#A3B3FF' },
  { name: 'HTML', icon: '/images/icon-html.svg', color: '#A3B3FF' },
  { name: 'CSS', icon: '/images/icon-css.svg', color: '#A3B3FF' },
  { name: 'Vue', icon: '/images/icon-vue.svg', color: '#46ECD5' },
  { name: 'Angular', icon: '/images/icon-angular.svg', color: '#A3B3FF' },
  { name: 'Gatsby', icon: '/images/icon-gatsby.svg', color: '#A3B3FF' },
  { name: 'Flutter', icon: '/images/icon-flutter.svg', color: '#A3B3FF' },
];

// Sample projects data
const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1 // _ui-animations',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    image: '/images/project-1-ui-animations-6da66d.png',
    technologies: ['React'],
    primaryTech: 'React'
  },
  {
    id: 2,
    title: 'Project 2 // _tetris-game',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    image: '/images/project-2-tetris-game.png',
    technologies: ['React'],
    primaryTech: 'React'
  },
  {
    id: 3,
    title: 'Project 3 // _glassy-ui',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    image: '/images/project-3-glassy-ui-1d9512.png',
    technologies: ['CSS'],
    primaryTech: 'CSS'
  },
  {
    id: 4,
    title: 'Project 4 // _nimbus',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    image: '/images/project-4-nimbus-7618dd.png',
    technologies: ['Vue'],
    primaryTech: 'Vue'
  },
  {
    id: 5,
    title: 'Project 5 // _emberize-ui',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    image: '/images/project-5-emberize-ui-697087.png',
    technologies: ['Vue'],
    primaryTech: 'Vue'
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>(['React']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleTechnology = (tech: Technology) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const filteredProjects = projects.filter(project => 
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
    <div className="min-h-screen bg-dark-primary flex flex-col">
      <Header activeTab="_projects" />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Technology Filter */}
        <motion.div 
          className="w-80 bg-dark-secondary border-r border-dark-border flex flex-col"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Projects Section */}
          <div className="p-6">
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
                  className="ml-4 space-y-2"
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
        <div className="flex-1 flex flex-col">
          {/* Filter Tabs */}
          <motion.div 
            className="flex border-b border-dark-border bg-dark-secondary"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
                  className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1200px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div 
                      key={project.id} 
                      className="space-y-4 max-w-[407px]"
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
                        className="bg-dark-secondary border border-dark-border rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Technology Badge */}
                        <motion.div 
                          className="absolute top-5 right-5 z-10 p-1 rounded"
                          style={{ backgroundColor: getTechColor(project.primaryTech) }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Image 
                            src={getTechIcon(project.primaryTech) || '/images/icon-react.svg'} 
                            alt={project.primaryTech}
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </motion.div>
                        
                        {/* Project Image */}
                        <div className="h-[145px] bg-dark-border border-b border-dark-border overflow-hidden">
                          <motion.img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        
                        {/* Project Content */}
                        <div className="p-8 space-y-5 h-[179px] flex flex-col justify-between">
                          <motion.p 
                            className="text-text-secondary text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            {project.description}
                          </motion.p>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <Button 
                              className="bg-dark-border hover:bg-dark-border/80 text-white text-sm px-3 py-2 transition-all duration-200 hover:scale-105"
                            >
                              view-project
                            </Button>
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
              transition={{ delay: 0.8 }}
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

      <Footer />
    </div>
  );
}
