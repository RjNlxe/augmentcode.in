'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Code, Star, Download, Copy, ChevronDown, X } from 'lucide-react'
import { getAllRules, getLanguages, getCategories, type Rule } from '@/lib/rules-loader'


export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load actual rules from your directory
  const allRules = getAllRules()
  const languages = getLanguages()
  const categories = getCategories()

  const filteredRules = useMemo(() => {
    return allRules.filter(rule => {
      const matchesSearch = rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           rule.libs.some(lib => lib.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesLanguage = selectedLanguage === 'All' || rule.language === selectedLanguage
      const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory

      return matchesSearch && matchesLanguage && matchesCategory
    })
  }, [searchQuery, selectedLanguage, selectedCategory, allRules])

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
    <main className="min-h-screen bg-dark-950 text-white py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Augment Code Rules</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the most powerful rules that make Augment Code the best AI coding assistant.
            Search, filter, and find exactly what you need.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rules, descriptions, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dark-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            {/* Language Filter */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 bg-dark-900/50 border border-gray-700 rounded-xl px-6 py-4 text-white hover:border-primary-500 transition-colors min-w-[150px] justify-between"
              >
                <span>{selectedLanguage}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-dark-900 border border-gray-700 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto"
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
                className="flex items-center space-x-2 bg-dark-900/50 border border-gray-700 rounded-xl px-6 py-4 text-white hover:border-primary-500 transition-colors min-w-[150px] justify-between"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-dark-900 border border-gray-700 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto"
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
          </div>

          {/* Active Filters */}
          {(selectedLanguage !== 'All' || selectedCategory !== 'All') && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedLanguage !== 'All' && (
                <span className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm">
                  <span>{selectedLanguage}</span>
                  <button onClick={() => setSelectedLanguage('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center space-x-2 bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-400">
            Showing {filteredRules.length} of {allRules.length} rules
          </p>
        </motion.div>

        {/* Rules Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AnimatePresence>
            {filteredRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                {/* Rule Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{rule.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{rule.description}</p>

                    <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                      <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
                        {rule.language}
                      </span>
                      <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded">
                        {rule.category}
                      </span>
                      {rule.rating && (
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{rule.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {rule.downloads && (
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Download className="w-4 h-4" />
                          <span>{rule.downloads.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {rule.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {rule.tags.slice(0, 5).map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {rule.tags.length > 5 && (
                          <span className="text-gray-400 text-xs">+{rule.tags.length - 5} more</span>
                        )}
                      </div>
                    )}

                    {/* Libraries */}
                    {rule.libs.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {rule.libs.slice(0, 3).map((lib, libIndex) => (
                          <span key={libIndex} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                            {lib}
                          </span>
                        ))}
                        {rule.libs.length > 3 && (
                          <span className="text-gray-400 text-xs">+{rule.libs.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Preview */}
                <div className="relative">
                  <div className="bg-dark-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{rule.content.substring(0, 1000)}{rule.content.length > 1000 ? '...' : ''}</pre>
                  </div>

                  <button
                    onClick={() => copyToClipboard(rule.content, rule.id)}
                    className="absolute top-2 right-2 p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedId === rule.id ? (
                      <span className="text-green-400 text-xs">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredRules.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No rules found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
