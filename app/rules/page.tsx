'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Code, Star, Download, Copy, ChevronDown, X, Grid, List, BookOpen, Zap, Tag, Eye } from 'lucide-react'
import { getAllRules, getLanguages, getCategories, type Rule } from '@/lib/rules-loader'


export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'downloads'>('name')

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

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-900 to-dark-800 py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Rules Directory</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover {allRules.length}+ powerful coding rules across {languages.length - 1} languages.
              Find exactly what you need with our smart search and filtering.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="glass-effect p-4 rounded-xl text-center">
                <div className="text-2xl font-bold gradient-text">{allRules.length}+</div>
                <div className="text-sm text-gray-400">Rules</div>
              </div>
              <div className="glass-effect p-4 rounded-xl text-center">
                <div className="text-2xl font-bold gradient-text">{languages.length - 1}</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div className="glass-effect p-4 rounded-xl text-center">
                <div className="text-2xl font-bold gradient-text">{categories.length - 1}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="glass-effect p-4 rounded-xl text-center">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-400">Always</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="py-8 px-6 md:px-8 bg-dark-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Main Search Bar */}
            <div className="relative max-w-4xl mx-auto mb-6">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by rule name, description, tags, or libraries... (e.g., 'React', 'Python', 'API')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white/5 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-lg backdrop-blur-sm"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Language Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center space-x-2 bg-white/5 border border-gray-600 rounded-xl px-4 py-3 text-white hover:border-primary-500 transition-colors min-w-[140px] justify-between backdrop-blur-sm"
                  >
                    <span className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span>{selectedLanguage}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isLanguageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-dark-900 border border-gray-600 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto backdrop-blur-sm"
                      >
                        {languages.map((language) => (
                          <button
                            key={language}
                            onClick={() => {
                              setSelectedLanguage(language)
                              setIsLanguageOpen(false)
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-primary-500/20 transition-colors ${
                              selectedLanguage === language ? 'bg-primary-500/30 text-primary-400' : 'text-gray-300'
                            }`}
                          >
                            {language}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center space-x-2 bg-white/5 border border-gray-600 rounded-xl px-4 py-3 text-white hover:border-primary-500 transition-colors min-w-[140px] justify-between backdrop-blur-sm"
                  >
                    <span className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>{selectedCategory}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-dark-900 border border-gray-600 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto backdrop-blur-sm"
                      >
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category)
                              setIsCategoryOpen(false)
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-primary-500/20 transition-colors ${
                              selectedCategory === category ? 'bg-primary-500/30 text-primary-400' : 'text-gray-300'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'downloads')}
                  className="bg-white/5 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 backdrop-blur-sm"
                >
                  <option value="name" className="bg-dark-900">Name A-Z</option>
                  <option value="rating" className="bg-dark-900">Highest Rated</option>
                  <option value="downloads" className="bg-dark-900">Most Popular</option>
                </select>
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-3">
                <div className="flex bg-white/5 rounded-xl p-1 border border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedLanguage !== 'All' || selectedCategory !== 'All' || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <span className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-full text-sm">
                    <Search className="w-3 h-3" />
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLanguage !== 'All' && (
                  <span className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-400 px-3 py-2 rounded-full text-sm">
                    <Code className="w-3 h-3" />
                    <span>{selectedLanguage}</span>
                    <button onClick={() => setSelectedLanguage('All')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center space-x-2 bg-accent-500/20 text-accent-400 px-3 py-2 rounded-full text-sm">
                    <Filter className="w-3 h-3" />
                    <span>{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedLanguage('All')
                    setSelectedCategory('All')
                  }}
                  className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  Clear All
                </button>
              </div>
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
            <AnimatePresence>
              {filteredAndSortedRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`group cursor-pointer ${
                    viewMode === 'grid'
                      ? 'glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 h-fit'
                      : 'glass-effect p-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-4'
                  }`}
                  onClick={() => setSelectedRule(rule)}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
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
                          <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded-lg text-xs font-medium">
                            {rule.language}
                          </span>
                          <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded-lg text-xs font-medium">
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
                      <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-gray-700/50">
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
                        <div className="flex items-center space-x-1 text-primary-400">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
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
                          <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded text-xs">
                            {rule.language}
                          </span>
                          <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded text-xs">
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

                      <div className="flex items-center space-x-1 text-primary-400">
                        <Eye className="w-5 h-5" />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredAndSortedRules.length === 0 && (
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
              className="bg-dark-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedRule.title}</h2>
                    <p className="text-gray-400 mb-4">{selectedRule.description}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-lg font-medium">
                        {selectedRule.language}
                      </span>
                      <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-lg font-medium">
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

                  <button
                    onClick={() => setSelectedRule(null)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
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
                            <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(selectedRule.content, selectedRule.id)
                      }}
                      className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-lg text-white transition-colors"
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
                    </button>
                  </div>

                  <div className="bg-dark-950 p-6 rounded-xl border border-gray-700">
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
    </main>
  )
}
