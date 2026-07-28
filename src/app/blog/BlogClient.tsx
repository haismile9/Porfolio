'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { BlogPost } from '@/lib/blogs'

// Animation variants synchronized with _projects and _about-me
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

interface BlogClientProps {
  blogs: BlogPost[]
}

export default function BlogClient({ blogs }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  // activeBlogId = null means GRID CARD VIEW; non-null means DETAIL ARTICLE VIEW
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    all: true,
    nextjs: false,
    backend: false,
    database: false,
    architecture: false,
  })
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  const activeBlog = useMemo(() => {
    if (!activeBlogId) return null
    return blogs.find((b) => b.id === activeBlogId) || null
  }, [activeBlogId, blogs])

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Category filter
      if (selectedCategory !== 'all' && blog.category !== selectedCategory) {
        return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchTitle = blog.title.toLowerCase().includes(query)
        const matchTag = blog.tags.some((t) => t.toLowerCase().includes(query))
        const matchSummary = blog.summary.toLowerCase().includes(query)
        return matchTitle || matchTag || matchSummary
      }

      return true
    })
  }, [selectedCategory, searchQuery, blogs])

  const categories = [
    { id: 'nextjs', label: 'Next.js', count: blogs.filter(b => b.category === 'nextjs').length },
    { id: 'backend', label: 'Backend & Microservices', count: blogs.filter(b => b.category === 'backend').length },
    { id: 'database', label: 'Database & SQL', count: blogs.filter(b => b.category === 'database').length },
    { id: 'architecture', label: 'System Architecture', count: blogs.filter(b => b.category === 'architecture').length },
  ]

  const getFolderColor = (categoryId: string) => {
    return 'text-text-secondary group-hover:text-white transition-colors'
  }

  const toggleFolder = (catId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }))
    setSelectedCategory(catId)
    setActiveBlogId(null)
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'nextjs':
        return { label: '// NEXT.JS & FRONTEND', color: 'bg-dark-primary border border-dark-border text-text-secondary' }
      case 'backend':
        return { label: '// BACKEND & MICROSERVICES', color: 'bg-dark-primary border border-dark-border text-text-secondary' }
      case 'database':
        return { label: '// DATABASE & SQL', color: 'bg-dark-primary border border-dark-border text-text-secondary' }
      case 'architecture':
        return { label: '// SYSTEM ARCHITECTURE', color: 'bg-dark-primary border border-dark-border text-text-secondary' }
      default:
        return { label: '// TECHNICAL ARTICLE', color: 'bg-dark-primary border border-dark-border text-text-secondary' }
    }
  }

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  // Robust Markdown parser that never splits inside code blocks
  const renderMarkdownContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)
    let codeBlockCounter = 0

    return parts.map((part, pIdx) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const firstLineEnd = part.indexOf('\n')
        const lang = part.slice(3, firstLineEnd).trim() || 'code'
        const codeText = part.slice(firstLineEnd + 1, -3).trim()
        const currentCodeIdx = codeBlockCounter++

        return (
          <div key={pIdx} className="my-6 rounded-xl overflow-hidden border border-dark-border bg-dark-primary shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-dark-secondary border-b border-dark-border text-xs font-fira text-text-secondary">
              <span className="text-accent-orange uppercase font-bold tracking-wider">{lang}</span>
              <button
                onClick={() => handleCopyCode(codeText, currentCodeIdx)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                {copiedCodeIndex === currentCodeIdx ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-fira leading-relaxed text-text-primary">
              <code>{codeText}</code>
            </pre>
          </div>
        )
      }

      const sections = part.split('\n\n').filter((s) => s.trim().length > 0)
      return sections.map((section, idx) => {
        const key = `${pIdx}-${idx}`
        const trimmed = section.trim()

        // Key Takeaways callout (> [!TIP])
        if (trimmed.startsWith('> [!TIP]')) {
          const lines = trimmed
            .split('\n')
            .filter((line) => !line.includes('[!TIP]'))
            .map((line) => line.replace(/^>\s?/, ''))

          return (
            <div key={key} className="my-6 p-5 rounded-xl bg-accent-blue/10 border border-accent-blue/40 text-text-primary">
              <div className="flex items-center gap-2 text-accent-blue font-fira font-semibold mb-3 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>KEY TAKEAWAYS / TÓM TẮT NHANH CHO DEV</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed font-inter text-text-secondary">
                {lines.map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>
            </div>
          )
        }

        // Horizontal rule (---)
        if (trimmed === '---') {
          return <hr key={key} className="my-8 border-dark-border" />
        }

        // Headers H2 (## )
        if (trimmed.startsWith('## ')) {
          const headerText = trimmed.replace(/^##\s+/, '')
          return (
            <h2 key={key} className="text-lg sm:text-xl lg:text-2xl font-fira font-bold text-white mt-8 mb-4 flex items-center gap-2 border-b border-dark-border/60 pb-2">
              <span className="text-accent-orange">#</span>
              <span>{headerText}</span>
            </h2>
          )
        }

        // Headers H3 (### )
        if (trimmed.startsWith('### ')) {
          const headerText = trimmed.replace(/^###\s+/, '')
          return (
            <h3 key={key} className="text-base sm:text-lg font-fira font-semibold text-accent-blue mt-6 mb-3 flex items-center gap-2">
              <span className="text-text-secondary">##</span>
              <span>{headerText}</span>
            </h3>
          )
        }

        // Lists (-)
        if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
          const listItems = trimmed.split('\n').filter((item) => item.trim().startsWith('- '))
          return (
            <ul key={key} className="my-4 space-y-2 pl-4">
              {listItems.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-text-secondary text-sm sm:text-base leading-relaxed">
                  <span className="text-accent-orange mt-1.5">•</span>
                  <span>{item.replace(/^- /, '')}</span>
                </li>
              ))}
            </ul>
          )
        }

        // Paragraphs
        return (
          <p key={key} className="my-4 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            {trimmed}
          </p>
        )
      })
    })
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-dark-bg min-h-0 overflow-hidden">
      {/* Left Column: Explorer - FILE EXPLORER (Staggered slide from left matching _projects) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-72 bg-dark-secondary/60 border-b lg:border-b-0 lg:border-r border-dark-border flex flex-col shrink-0"
      >
        {/* Explorer Title */}
        <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
          <span className="text-xs font-fira font-semibold text-text-primary uppercase tracking-wider">
            FILE EXPLORER
          </span>
          <span className="text-[11px] font-fira text-text-secondary">
            {blogs.length} articles
          </span>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-dark-border">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActiveBlogId(null) // Switch to grid view when searching
              }}
              placeholder="Search topics, titles or #tags..."
              className="w-full bg-dark-primary border border-dark-border rounded-lg pl-8 pr-3 py-1.5 text-xs font-fira text-text-primary placeholder-text-secondary/60 focus:outline-none focus:border-accent-blue transition-colors"
            />
            <svg
              className="w-4 h-4 text-text-secondary absolute left-2.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Collapsible Tree Explorer */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 font-fira text-xs">
          {/* Root Folder: All Articles */}
          <div>
            <button
              onClick={() => {
                setExpandedFolders((prev) => ({ ...prev, all: !prev.all }))
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-dark-primary/60 transition-colors text-left"
            >
              <motion.span
                animate={{ rotate: expandedFolders.all ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className={`text-xs ${getFolderColor('all')} inline-block`}
              >
                ▶
              </motion.span>
              <Image
                src="/images/icon-folder.svg"
                alt="folder"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span className={`font-fira font-medium ${getFolderColor('all')}`}>
                All Articles
              </span>
            </button>

            {/* Indented child: blogs.json */}
            <AnimatePresence>
              {expandedFolders.all && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pl-6 pt-1 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setActiveBlogId(null)
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                      selectedCategory === 'all' && activeBlogId === null
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-text-secondary hover:text-white hover:bg-dark-primary/40'
                    }`}
                  >
                    <Image
                      src="/images/icon-personal-info.svg"
                      alt="json"
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                    <span>blogs.json</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-2 border-t border-dark-border/40 my-1">
            <div className="text-[10px] text-text-secondary uppercase px-2 py-1 tracking-wider">TOPIC CATEGORIES</div>
          </div>

          {/* Category Folders with Indented Articles */}
          {categories.map((cat) => {
            const isExpanded = expandedFolders[cat.id]
            const catArticles = blogs.filter((b) => b.category === cat.id)

            return (
              <div key={cat.id} className="space-y-0.5">
                {/* Folder Row */}
                <button
                  onClick={() => toggleFolder(cat.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors text-left ${
                    selectedCategory === cat.id && activeBlogId === null
                      ? 'bg-dark-primary text-white font-medium border border-dark-border'
                      : 'hover:bg-dark-primary/40'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-xs ${getFolderColor(cat.id)} inline-block`}
                    >
                      ▶
                    </motion.span>
                    <Image
                      src="/images/icon-folder.svg"
                      alt="folder"
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    <span className={`font-fira font-medium truncate ${getFolderColor(cat.id)}`}>
                      {cat.label}
                    </span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-dark-primary text-text-secondary shrink-0">
                    {cat.count}
                  </span>
                </button>

                {/* Indented child `.md` articles */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-6 space-y-0.5 border-l border-dark-border/40 ml-3 py-1 overflow-hidden"
                    >
                      {catArticles.map((blog) => {
                        const isSelected = activeBlogId === blog.id
                        return (
                          <button
                            key={blog.id}
                            onClick={() => {
                              setSelectedCategory(cat.id)
                              setActiveBlogId(blog.id)
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center gap-2 truncate text-xs transition-colors ${
                              isSelected
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-text-secondary hover:text-white hover:bg-dark-primary/40'
                            }`}
                          >
                            <Image
                              src="/images/icon-markdown.svg"
                              alt="markdown"
                              width={14}
                              height={14}
                              className="shrink-0"
                            />
                            <span className="truncate">{blog.slug}</span>
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Right Column: Dynamic Content Area (Grid Cards OR Article Detail View) */}
      <div className="flex-1 flex flex-col min-h-0 bg-dark-bg overflow-hidden">
        <AnimatePresence mode="wait">
          {!activeBlog ? (
            /* ========================================================
               STATE 1: GRID CARD VIEW (activeBlogId === null)
               ======================================================== */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {/* Grid Top Header Bar - Slides down from top matching _projects filter bar */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center justify-between bg-dark-secondary border-b border-dark-border px-6 py-3 text-xs font-fira shrink-0"
              >
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="text-text-secondary">{"// _"}</span>
                  <Image
                    src={selectedCategory === 'all' ? '/images/icon-personal-info.svg' : '/images/icon-folder.svg'}
                    alt="icon"
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                  <span>
                    {selectedCategory === 'all'
                      ? 'All Articles'
                      : categories.find((c) => c.id === selectedCategory)?.label}
                  </span>
                </div>
                <div className="text-text-secondary">
                  Showing <span className="text-white font-bold">{filteredBlogs.length}</span> articles
                </div>
              </motion.div>

              {/* Cards Grid Area with Staggered Animations */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-20 text-text-secondary font-fira text-sm">
                    No articles found matching your criteria.
                  </div>
                ) : (
                  <motion.div
                    key={`${selectedCategory}-${searchQuery}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto"
                  >
                    {filteredBlogs.map((blog) => {
                      return (
                        <motion.div
                          key={blog.id}
                          variants={itemVariants}
                          layout
                          onClick={() => setActiveBlogId(blog.id)}
                          whileHover={{
                            y: -6,
                            scale: 1.02,
                            boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-dark-secondary/60 border border-dark-border hover:border-accent-blue/60 rounded-2xl p-5 transition-all group flex flex-col justify-between shadow-xl cursor-pointer"
                        >
                          <div>
                            {/* Card Title */}
                            <div className="text-base font-fira font-bold text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                              {blog.title}
                            </div>

                            {/* Excerpt */}
                            <p className="text-text-secondary text-xs font-inter line-clamp-3 mt-2.5 leading-relaxed">
                              {blog.summary}
                            </p>

                            {/* Card Image Banner */}
                            {blog.image && (
                              <div className="relative w-full h-36 bg-dark-primary rounded-xl overflow-hidden border border-dark-border my-4">
                                <Image
                                  src={blog.image}
                                  alt={blog.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                          </div>

                          <div>
                            {/* Tag Pills */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-3">
                              {blog.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-fira bg-dark-primary border border-dark-border text-text-secondary group-hover:text-white transition-colors"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer Row: Date & Read Time */}
                            <div className="flex items-center justify-between text-[11px] font-fira text-text-secondary pt-3 border-t border-dark-border/60">
                              <div className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-text-secondary/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{blog.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-text-secondary">
                                <svg className="w-3.5 h-3.5 text-text-secondary/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{blog.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* ========================================================
               STATE 2: DETAIL ARTICLE VIEW (activeBlogId !== null)
               ======================================================== */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {/* Detail Top Back Navigation Bar - Staggered slide from top */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-between bg-dark-secondary border-b border-dark-border px-6 py-2.5 text-xs font-fira shrink-0"
              >
                <button
                  onClick={() => setActiveBlogId(null)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-primary border border-dark-border text-text-secondary hover:text-white hover:border-accent-blue transition-colors font-medium"
                >
                  <span>←</span>
                  <span>Back to All Articles</span>
                </button>
                <div className="flex items-center gap-3 text-text-secondary text-xs">
                  <span className="flex items-center gap-1.5 text-accent-orange font-semibold">
                    <Image
                      src="/images/icon-markdown.svg"
                      alt="markdown"
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                    <span>{activeBlog.slug}</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">UTF-8</span>
                </div>
              </motion.div>

              {/* Article Viewer Content with Staggered Component Transitions */}
              <div className="flex-1 overflow-y-auto flex">
                {/* Left Line Numbers Margin */}
                <div className="w-12 py-8 bg-dark-secondary/30 border-r border-dark-border/40 text-right pr-3 font-fira text-xs text-text-secondary/40 select-none hidden sm:block shrink-0 space-y-4">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="h-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Main Article Body */}
                <motion.div
                  key={activeBlog.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex-1 p-6 sm:p-10 lg:p-12 max-w-4xl mx-auto overflow-x-hidden"
                >
                  {/* Topic & Metadata Header */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-between gap-3 mb-6"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const badge = getCategoryBadge(activeBlog.category)
                        return (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-fira font-semibold border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        )
                      })()}
                      <div className="flex items-center gap-3 text-xs font-fira text-text-secondary">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-text-secondary/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{activeBlog.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-text-secondary">
                          <svg className="w-3.5 h-3.5 text-text-secondary/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{activeBlog.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeBlog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-fira bg-dark-secondary border border-dark-border text-text-secondary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Article Title */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl lg:text-4xl font-fira font-bold text-white leading-tight mb-4"
                  >
                    {activeBlog.title}
                  </motion.h1>

                  {/* Article Summary */}
                  <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-text-secondary font-inter leading-relaxed border-b border-dark-border pb-6 mb-6"
                  >
                    {activeBlog.summary}
                  </motion.p>

                  {/* Rendered Markdown Body */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    {renderMarkdownContent(activeBlog.content)}
                  </motion.div>

                  {/* Article Footer */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-fira text-text-secondary"
                  >
                    <div>
                      © 2026 Nguyen Hong Hai • Written with passion for the developer community
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveBlogId(null)}
                        className="px-3 py-1.5 rounded-lg bg-dark-secondary border border-dark-border hover:border-accent-blue hover:text-white transition-colors"
                      >
                        ← Back to All Articles
                      </button>
                      <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-3 py-1.5 rounded-lg bg-dark-secondary border border-dark-border hover:border-accent-blue hover:text-white transition-colors"
                      >
                        ↑ Top of file
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
