'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Code, Copy, X, Grid, List, BookOpen, Zap, Tag, Eye, FileDown, Menu, Sparkles, Layers, ChevronRight, Filter, Brain, Wand2 } from 'lucide-react'
import { getAllRules, getLanguages, getCategories, type Rule } from '@/lib/rules-loader'
import AIRulesGenerator from '@/components/AIRulesGenerator'

const ITEMS_PER_PAGE = 24 // Optimized for performance

export default function RulesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [languagesExpanded, setLanguagesExpanded] = useState(true)
  const [categoriesExpanded, setCategoriesExpanded] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchDebounced, setSearchDebounced] = useState('')
  const [aiRulesOpen, setAiRulesOpen] = useState(false)

  // Client-side hydration check and URL parameter handling
  useEffect(() => {
    setIsClient(true)

    // Handle URL parameters for filtering
    const languageParam = searchParams.get('language')
    const categoryParam = searchParams.get('category')

    if (languageParam) {
      setSelectedLanguage(languageParam)
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  // Debounced search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(searchQuery)
      setCurrentPage(1) // Reset to first page on search
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

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

  // Load actual rules from your directory (memoized for performance)
  const allRules = useMemo(() => getAllRules(), [])
  const languages = useMemo(() => getLanguages(), [])
  const categories = useMemo(() => getCategories(), [])

  // Optimized filtering with debounced search
  const filteredRules = useMemo(() => {
    return allRules.filter(rule => {
      const matchesSearch = !searchDebounced || 
        rule.title.toLowerCase().includes(searchDebounced.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchDebounced.toLowerCase()) ||
        rule.tags.some(tag => tag.toLowerCase().includes(searchDebounced.toLowerCase())) ||
        rule.libs.some(lib => lib.toLowerCase().includes(searchDebounced.toLowerCase()))
      
      const matchesLanguage = selectedLanguage === 'All' || rule.language === selectedLanguage
      const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory

      return matchesSearch && matchesLanguage && matchesCategory
    })
  }, [allRules, searchDebounced, selectedLanguage, selectedCategory])

  // Sort and paginate rules
  const { paginatedRules, totalPages } = useMemo(() => {
    const sorted = [...filteredRules].sort((a, b) => a.title.localeCompare(b.title))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    
    return {
      paginatedRules: sorted.slice(startIndex, endIndex),
      totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE)
    }
  }, [filteredRules, currentPage])

  const copyToClipboard = useCallback(async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  const downloadRule = useCallback((rule: Rule) => {
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
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex font-space">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-gradient-to-b from-zinc-900 to-zinc-950 border-r border-emerald-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 sm:p-6 border-b border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-bold text-white truncate">Browse Rules</h2>
                  <p className="text-xs text-gray-400 hidden sm:block">Filter by language & category</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Languages Section */}
            <div className="space-y-3">
              <button
                onClick={() => setLanguagesExpanded(!languagesExpanded)}
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Languages</h3>
                    <p className="text-xs text-gray-400">{languages.length - 1} available</p>
                  </div>
                </div>
                <div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${languagesExpanded ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {languagesExpanded && (
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-1">
                      {languages.map((language) => (
                        <button
                          key={language}
                          onClick={() => setSelectedLanguage(language)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                            selectedLanguage === language
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="font-medium">{language}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedLanguage === language
                              ? 'bg-emerald-500/30 text-emerald-300'
                              : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                          }`}>
                            {language === 'All' ? allRules.length : allRules.filter(r => r.language === language).length}
                          </span>
                        </button>
                      ))}
                    </div>
                </div>
              )}
            </div>

            {/* Categories Section */}
            <div className="space-y-3">
              <button
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Categories</h3>
                    <p className="text-xs text-gray-400">{categories.length - 1} available</p>
                  </div>
                </div>
                <div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${categoriesExpanded ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {categoriesExpanded && (
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                            selectedCategory === category
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="font-medium">{category}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category
                              ? 'bg-green-500/30 text-green-300'
                              : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                          }`}>
                            {category === 'All' ? allRules.length : allRules.filter(r => r.category === category).length}
                          </span>
                        </button>
                      ))}
                    </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Quick Actions</span>
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedLanguage('TypeScript')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  >
                    TypeScript Rules
                  </button>
                  <button
                    onClick={() => setSelectedLanguage('JavaScript')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                  >
                    JavaScript Rules
                  </button>
                  <button
                    onClick={() => setSelectedLanguage('Python')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                  >
                    Python Rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Mobile Menu Button */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-emerald-400 hover:bg-emerald-500/30 transition-all duration-200 shadow-lg text-sm sm:text-base"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium hidden sm:inline">Browse by Language & Category</span>
              <span className="font-medium sm:hidden">Browse Rules</span>
            </button>
          </div>

          {/* Navigation Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
            <Link
              href="/"
              className="group flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
              </div>
              <span className="font-medium text-sm sm:text-base">Back to Home</span>
            </Link>

            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm text-gray-400">
                Showing {filteredRules.length} of {allRules.length} rules
              </div>
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Rules Directory
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Discover powerful coding rules and best practices for modern development
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-emerald-400">{allRules.length}</div>
                <div className="text-xs sm:text-sm text-gray-400">Total Rules</div>
              </div>
              <div className="w-px h-6 sm:h-8 md:h-12 bg-emerald-500/30"></div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-emerald-400">{languages.length - 1}</div>
                <div className="text-xs sm:text-sm text-gray-400">Languages</div>
              </div>
              <div className="w-px h-6 sm:h-8 md:h-12 bg-emerald-500/30"></div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-emerald-400">{categories.length - 1}</div>
                <div className="text-xs sm:text-sm text-gray-400">Categories</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search rules, tags, libraries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 search-mono text-white placeholder-zinc-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              {/* View Controls */}
              <div className="flex bg-white/5 rounded-lg sm:rounded-xl p-1 border border-emerald-500/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedLanguage !== 'All' || selectedCategory !== 'All') && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {selectedLanguage !== 'All' && (
                  <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">
                    <Code className="w-3 h-3" />
                    <span>{selectedLanguage}</span>
                    <button onClick={() => setSelectedLanguage('All')} className="hover:text-emerald-300">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategory !== 'All' && (
                  <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full border border-green-500/30">
                    <Filter className="w-3 h-3" />
                    <span>{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('All')} className="hover:text-teal-300">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSelectedLanguage('All')
                    setSelectedCategory('All')
                  }}
                  className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-full border border-gray-600 hover:border-emerald-500 transition-all duration-200"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {filteredRules.length === 0 ? 'No rules found' :
                 filteredRules.length === allRules.length ? 'All Rules' :
                 `${filteredRules.length} Rules Found`}
              </h2>
              <p className="text-gray-400">
                {filteredRules.length === 0 ? 'Try adjusting your search or filters' :
                 `Showing ${paginatedRules.length} of ${filteredRules.length} rules (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>

            {/* AI Rules Generator Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAiRulesOpen(true)}
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-700 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <Brain className="relative w-5 h-5" />
                <span className="relative">AI Rules</span>
                <Wand2 className="relative w-5 h-5" />
              </button>
            </div>

            {filteredRules.length > 0 && (
              <div className="text-sm text-gray-400">
                Sorted alphabetically by name
              </div>
            )}
          </div>

          {/* Rules Display */}
          <div
            className={viewMode === 'grid' ?
              "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" :
              "space-y-4"
            }
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
              <>
                {paginatedRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`group relative overflow-hidden cursor-pointer ${
                    viewMode === 'grid'
                      ? 'glass-effect p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-200 h-fit'
                      : 'glass-effect p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-200 flex items-center space-x-4'
                  }`}
                  onClick={() => setSelectedRule(rule)}
                >
                  <div>
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        {/* Header */}
                        <div className="mb-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer">
                              {rule.title}
                            </h3>
                          </div>

                          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                            {rule.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs font-medium border border-emerald-500/30">
                              {rule.language}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium border border-green-500/30">
                              {rule.category}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-emerald-500/20">
                          <div className="flex items-center space-x-3">
                            {rule.libs && rule.libs.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{rule.libs.length} libs</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Tag className="w-4 h-4" />
                              <span>{rule.tags.length} tags</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                downloadRule(rule)
                              }}
                              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
                            >
                              <FileDown className="w-4 h-4" />
                              <span>Download</span>
                            </button>
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
                          <div className="mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                              {rule.title}
                            </h3>
                          </div>

                          <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                            {rule.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs font-medium border border-emerald-500/30">
                              {rule.language}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium border border-green-500/30">
                              {rule.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadRule(rule)
                            }}
                            className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
                          >
                            <FileDown className="w-4 h-4" />
                          </button>
                          <div className="flex items-center space-x-1 text-emerald-400">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                ))}
              </>
            )}
          </div>

          {/* No Results */}
          {isClient && filteredRules.length === 0 && (
            <div className="text-center py-16">
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
            </div>
          )}
        </div>

        {/* Pagination */}
        {isClient && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 py-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/5 border border-emerald-500/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500/20 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-emerald-500/20 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-emerald-500/20 hover:text-white'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/5 border border-emerald-500/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500/20 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Rule Detail Modal */}
      {selectedRule && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRule(null)}
        >
          <div
            className="bg-gradient-to-br from-dark-900 to-dark-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-emerald-500/20 shadow-2xl"
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
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Tag className="w-4 h-4" />
                      <span>{selectedRule.tags.length} tags</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{selectedRule.libs.length} libraries</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadRule(selectedRule)
                    }}
                    className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white transition-colors"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => setSelectedRule(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Tags */}
                {selectedRule.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                      <Tag className="w-5 h-5 text-emerald-400" />
                      <span>Tags</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRule.tags.map((tag, index) => (
                        <span key={index} className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm border border-emerald-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Libraries */}
                {selectedRule.libs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <span>Libraries</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRule.libs.map((lib, index) => (
                        <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm border border-green-500/30">
                          {lib}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      <span>Rule Content</span>
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(selectedRule.content, selectedRule.id)
                      }}
                      className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white transition-colors"
                    >
                      {copiedId === selectedRule.id ? (
                        <>
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="card-mono">
                    <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-x-auto">
                      {selectedRule.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* AI Rules Generator Modal */}
      <AIRulesGenerator
        isOpen={aiRulesOpen}
        onClose={() => setAiRulesOpen(false)}
      />
    </main>
  )
}
