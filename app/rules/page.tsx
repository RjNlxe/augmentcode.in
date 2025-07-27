'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Code, Star, Download, Copy, ChevronDown, X, Grid, List, BookOpen, Zap, Tag, Eye, FileDown, Menu, Sparkles, Layers, ChevronRight } from 'lucide-react'
import { getAllRules, getLanguages, getCategories, type Rule } from '@/lib/rules-loader'


export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'downloads'>('name')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [languagesExpanded, setLanguagesExpanded] = useState(true)
  const [categoriesExpanded, setCategoriesExpanded] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Modal scroll lock effect
  useEffect(() => {
    if (selectedRule) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedRule])

  // Load actual rules from your directory
  const allRules = getAllRules()
  const languages = getLanguages()
  const categories = getCategories()

  const filteredAndSortedRules = useMemo(() => {
    let filtered = allRules.filter(rule => {
      const matchesSearch = rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           rule.libs.some(lib => lib.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesLanguage = selectedLanguage === 'All' || rule.language === selectedLanguage
      const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory

      return matchesSearch && matchesLanguage && matchesCategory
    })

    // Sort rules
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'downloads':
          return (b.downloads || 0) - (a.downloads || 0)
        case 'name':
        default:
          return a.title.localeCompare(b.title)
      }
    })

    return filtered
  }, [searchQuery, selectedLanguage, selectedCategory, allRules, sortBy])

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadRule = (rule: Rule) => {
    const content = `# ${rule.title}

## Description
${rule.description}

## Language
${rule.language}

## Category
${rule.category}

## Tags
${rule.tags.join(', ')}

## Libraries
${rule.libs.join(', ')}

## Content
${rule.content}
`

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${rule.slug || rule.title.toLowerCase().replace(/\s+/g, '-')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-dark-950 text-white flex">
      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-dark-900 to-dark-950 border-r border-emerald-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Rules Hub</h2>
                  <p className="text-xs text-gray-400">{allRules.length} rules available</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {/* Languages Section */}
            <div className="bg-white/5 rounded-xl border border-emerald-500/20">
              <button
                onClick={() => setLanguagesExpanded(!languagesExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Languages</h3>
                    <p className="text-xs text-gray-400">{languages.length - 1} available</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: languagesExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {languagesExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-1">
                      {languages.map((language) => (
                        <motion.button
                          key={language}
                          onClick={() => setSelectedLanguage(language)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                            selectedLanguage === language
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-medium">{language}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedLanguage === language
                              ? 'bg-emerald-500/30 text-emerald-300'
                              : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                          }`}>
                            {language === 'All' ? allRules.length : allRules.filter(r => r.language === language).length}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories Section */}
            <div className="bg-white/5 rounded-xl border border-green-500/20">
              <button
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Categories</h3>
                    <p className="text-xs text-gray-400">{categories.length - 1} available</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: categoriesExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {categoriesExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-1">
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                            selectedCategory === category
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-medium">{category}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category
                              ? 'bg-green-500/30 text-green-300'
                              : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                          }`}>
                            {category === 'All' ? allRules.length : allRules.filter(r => r.category === category).length}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 rounded-xl border border-teal-500/20 p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-teal-400" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedLanguage('All')
                    setSelectedCategory('All')
                    setSearchQuery('')
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  🔄 Reset All Filters
                </button>
                <button
                  onClick={() => setSelectedLanguage('TypeScript')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  ⚡ TypeScript Rules
                </button>
                <button
                  onClick={() => setSelectedLanguage('JavaScript')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  🚀 JavaScript Rules
                </button>
                <button
                  onClick={() => setSelectedLanguage('Python')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  🐍 Python Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-900/20 via-dark-900 to-green-900/20 py-8 px-6 md:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-500 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Mobile Menu Button */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-400 hover:bg-emerald-500/30 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5" />
              <span className="font-medium">Browse by Language & Category</span>
            </motion.button>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Rules Directory
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover {allRules.length}+ powerful coding rules across {languages.length - 1} languages.
              Find exactly what you need with our smart search and filtering.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.1 }}
            >
              {[
                { value: `${allRules.length}+`, label: 'Rules' },
                { value: `${languages.length - 1}`, label: 'Languages' },
                { value: `${categories.length - 1}`, label: 'Categories' },
                { value: 'Free', label: 'Always' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-effect p-4 rounded-xl text-center border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

        {/* Search and Controls */}
        <div className="py-6 px-6 md:px-8 bg-gradient-to-r from-emerald-900/10 to-green-900/10 border-b border-emerald-500/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              {/* Search Bar and Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <motion.div
                  className="relative flex-1 max-w-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search rules, tags, libraries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-sm transition-all duration-300"
                  />
                </motion.div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  {/* Sort Control */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'downloads')}
                    className="bg-white/5 border border-emerald-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 backdrop-blur-sm"
                  >
                    <option value="name" className="bg-dark-900">Name A-Z</option>
                    <option value="rating" className="bg-dark-900">Highest Rated</option>
                    <option value="downloads" className="bg-dark-900">Most Popular</option>
                  </select>

                  {/* View Controls */}
                  <div className="flex bg-white/5 rounded-xl p-1 border border-emerald-500/30">
                    <motion.button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'grid' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Grid className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === 'list' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

            {/* Active Filters */}
            {(selectedLanguage !== 'All' || selectedCategory !== 'All' || searchQuery) && (
              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {searchQuery && (
                  <motion.span
                    className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-full text-sm border border-emerald-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Search className="w-3 h-3" />
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-emerald-300">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                {selectedLanguage !== 'All' && (
                  <motion.span
                    className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-2 rounded-full text-sm border border-green-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Code className="w-3 h-3" />
                    <span>{selectedLanguage}</span>
                    <button onClick={() => setSelectedLanguage('All')} className="hover:text-green-300">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                {selectedCategory !== 'All' && (
                  <motion.span
                    className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-400 px-3 py-2 rounded-full text-sm border border-teal-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Filter className="w-3 h-3" />
                    <span>{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('All')} className="hover:text-teal-300">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                <motion.button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedLanguage('All')
                    setSelectedCategory('All')
                  }}
                  className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-full border border-gray-600 hover:border-emerald-500 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              </motion.div>
            )}
            </motion.div>
          </div>
        </div>

      {/* Results Section */}
      <div className="py-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {filteredAndSortedRules.length === 0 ? 'No rules found' :
                 filteredAndSortedRules.length === allRules.length ? 'All Rules' :
                 `${filteredAndSortedRules.length} Rules Found`}
              </h2>
              <p className="text-gray-400">
                {filteredAndSortedRules.length === 0 ? 'Try adjusting your search or filters' :
                 `Showing ${filteredAndSortedRules.length} of ${allRules.length} total rules`}
              </p>
            </div>

            {filteredAndSortedRules.length > 0 && (
              <div className="text-sm text-gray-400">
                Sorted by {sortBy === 'name' ? 'Name' : sortBy === 'rating' ? 'Rating' : 'Popularity'}
              </div>
            )}
          </motion.div>

          {/* Rules Display */}
          <motion.div
            className={viewMode === 'grid' ?
              "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" :
              "space-y-4"
            }
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {!isClient ? (
              // Server-side placeholder to prevent hydration mismatch
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded mb-3"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence>
                {filteredAndSortedRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className={`group relative overflow-hidden ${
                    viewMode === 'grid'
                      ? 'glass-effect p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 h-fit'
                      : 'glass-effect p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 flex items-center space-x-4'
                  }`}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10" onClick={() => setSelectedRule(rule)}>
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer">
                              {rule.title}
                            </h3>
                            <div className="flex items-center space-x-1 text-yellow-400 ml-2">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm">{rule.rating?.toFixed(1)}</span>
                            </div>
                          </div>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                          {rule.description}
                        </p>

                          {/* Language and Category */}
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs font-medium border border-emerald-500/30">
                              {rule.language}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium border border-green-500/30">
                              {rule.category}
                            </span>
                          </div>

                        {/* Tags Preview */}
                        {rule.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {rule.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {rule.tags.length > 3 && (
                              <span className="text-gray-400 text-xs">+{rule.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-emerald-500/20">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{rule.downloads?.toLocaleString()}</span>
                            </div>
                            {rule.libs.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{rule.libs.length} libs</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                downloadRule(rule)
                              }}
                              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FileDown className="w-4 h-4" />
                              <span>Download</span>
                            </motion.button>
                            <div className="flex items-center space-x-1 text-emerald-400">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </div>
                          </div>
                        </div>
                    </>
                  ) : (
                    // List View
                    <>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {rule.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span>{rule.rating?.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Download className="w-4 h-4" />
                              <span>{rule.downloads?.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                          {rule.description}
                        </p>

                          <div className="flex items-center space-x-2">
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/30">
                              {rule.language}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs border border-green-500/30">
                              {rule.category}
                            </span>
                            {rule.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {rule.tags.length > 2 && (
                              <span className="text-gray-400 text-xs">+{rule.tags.length - 2}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadRule(rule)
                            }}
                            className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FileDown className="w-4 h-4" />
                          </motion.button>
                          <div className="flex items-center space-x-1 text-emerald-400">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>

          {/* No Results */}
          {isClient && filteredAndSortedRules.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="glass-effect p-12 rounded-2xl max-w-md mx-auto">
                <Search className="w-16 h-16 mx-auto mb-6 text-gray-500" />
                <h3 className="text-xl font-semibold mb-3 text-white">No rules found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedLanguage('All')
                    setSelectedCategory('All')
                  }}
                  className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-xl text-white font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Rule Detail Modal */}
      <AnimatePresence>
        {selectedRule && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRule(null)}
          >
            <motion.div
              className="bg-dark-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-green-900/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedRule.title}</h2>
                    <p className="text-gray-400 mb-4">{selectedRule.description}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-medium border border-emerald-500/30">
                        {selectedRule.language}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg font-medium border border-green-500/30">
                        {selectedRule.category}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{selectedRule.rating?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Download className="w-4 h-4" />
                        <span>{selectedRule.downloads?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadRule(selectedRule)
                      }}
                      className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download</span>
                    </motion.button>

                    <button
                      onClick={() => setSelectedRule(null)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Tags and Libraries */}
                {(selectedRule.tags.length > 0 || selectedRule.libs.length > 0) && (
                  <div className="mb-6">
                    {selectedRule.tags.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                          <Tag className="w-4 h-4 mr-2" />
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRule.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRule.libs.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Libraries
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRule.libs.map((lib, index) => (
                            <span key={index} className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-lg text-sm border border-teal-500/30">
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Rule Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">Rule Content</h3>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(selectedRule.content, selectedRule.id)
                      }}
                      className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedId === selectedRule.id ? (
                        <>
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="bg-dark-950 p-6 rounded-xl border border-emerald-500/30 shadow-inner">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                      {selectedRule.content}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </main>
  )
}
