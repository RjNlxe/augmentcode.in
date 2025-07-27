'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Code, Star, Download, Copy, ChevronDown, X } from 'lucide-react'

// Sample rules data - this would come from your actual rules directory
const rulesData = [
  {
    id: 1,
    title: "Smart Code Completion",
    description: "Intelligent autocomplete that understands context and provides accurate suggestions",
    language: "JavaScript",
    category: "Productivity",
    rating: 4.9,
    downloads: 15420,
    code: `// Smart completion rule
{
  "trigger": "function",
  "completion": "function ${1:name}(${2:params}) {\\n\\t${3:// code}\\n}"
}`
  },
  {
    id: 2,
    title: "React Component Generator",
    description: "Quickly generate React functional components with TypeScript support",
    language: "TypeScript",
    category: "React",
    rating: 4.8,
    downloads: 12350,
    code: `// React component rule
{
  "trigger": "rfc",
  "completion": "const ${1:ComponentName} = () => {\\n\\treturn (\\n\\t\\t<div>\\n\\t\\t\\t${2:content}\\n\\t\\t</div>\\n\\t)\\n}"
}`
  },
  {
    id: 3,
    title: "Python Class Template",
    description: "Generate Python classes with common methods and docstrings",
    language: "Python",
    category: "Templates",
    rating: 4.7,
    downloads: 9870,
    code: `# Python class rule
{
  "trigger": "class",
  "completion": "class ${1:ClassName}:\\n\\t\\"\\"\\"${2:Class description}\\"\\"\\"\\n\\t\\n\\tdef __init__(self${3:, args}):\\n\\t\\t${4:pass}"
}`
  },
  {
    id: 4,
    title: "API Endpoint Builder",
    description: "Create REST API endpoints with proper error handling",
    language: "Node.js",
    category: "Backend",
    rating: 4.9,
    downloads: 18200,
    code: `// API endpoint rule
{
  "trigger": "api",
  "completion": "app.${1:get}('/${2:endpoint}', async (req, res) => {\\n\\ttry {\\n\\t\\t${3:// logic}\\n\\t\\tres.json({ success: true });\\n\\t} catch (error) {\\n\\t\\tres.status(500).json({ error: error.message });\\n\\t}\\n});"
}`
  },
  {
    id: 5,
    title: "CSS Flexbox Layout",
    description: "Quick flexbox layouts with common patterns",
    language: "CSS",
    category: "Styling",
    rating: 4.6,
    downloads: 7650,
    code: `/* Flexbox rule */
{
  "trigger": "flex",
  "completion": ".${1:container} {\\n\\tdisplay: flex;\\n\\tjustify-content: ${2:center};\\n\\talign-items: ${3:center};\\n\\tgap: ${4:1rem};\\n}"
}`
  }
]

const languages = ["All", "JavaScript", "TypeScript", "Python", "Node.js", "CSS", "HTML", "Java", "C++", "Go", "Rust"]
const categories = ["All", "Productivity", "React", "Templates", "Backend", "Styling", "Frontend", "Database"]

export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const filteredRules = useMemo(() => {
    return rulesData.filter(rule => {
      const matchesSearch = rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLanguage = selectedLanguage === 'All' || rule.language === selectedLanguage
      const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory
      
      return matchesSearch && matchesLanguage && matchesCategory
    })
  }, [searchQuery, selectedLanguage, selectedCategory])

  const copyToClipboard = async (code: string, id: number) => {
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
            Showing {filteredRules.length} of {rulesData.length} rules
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
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
                        {rule.language}
                      </span>
                      <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded">
                        {rule.category}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{rule.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Download className="w-4 h-4" />
                        <span>{rule.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Preview */}
                <div className="relative">
                  <pre className="bg-dark-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
                    <code>{rule.code}</code>
                  </pre>
                  
                  <button
                    onClick={() => copyToClipboard(rule.code, rule.id)}
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
