'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Sparkles, Wand2, Code, Brain, Zap, X, Copy, Download, RefreshCw, Palette, Shield, Rocket, Target, Settings, BookOpen, ChevronDown, Plus } from 'lucide-react'

interface AIRulesGeneratorProps {
  isOpen: boolean
  onClose: () => void
}

const AIRulesGenerator = memo(function AIRulesGenerator({ isOpen, onClose }: AIRulesGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRule, setGeneratedRule] = useState('')
  const [formData, setFormData] = useState({
    language: 'JavaScript',
    category: 'Best Practices',
    complexity: 'Intermediate',
    focus: 'Performance',
    context: '',
    customPrompt: ''
  })
  const [dropdownStates, setDropdownStates] = useState({
    language: false,
    category: false,
    complexity: false,
    focus: false
  })
  const [customInputs, setCustomInputs] = useState({
    language: '',
    category: '',
    complexity: '',
    focus: ''
  })
  const [inputMode, setInputMode] = useState({
    language: 'preset', // 'preset' or 'custom'
    category: 'preset',
    complexity: 'preset',
    focus: 'preset'
  })

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setDropdownStates({
          language: false,
          category: false,
          complexity: false,
          focus: false
        })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Memoize static data to prevent recreation on every render
  const languages = useMemo(() => [
    { name: 'JavaScript', icon: '🟨', color: 'from-yellow-500 to-orange-500' },
    { name: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-indigo-600' },
    { name: 'Python', icon: '🐍', color: 'from-green-500 to-emerald-600' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-600' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-600 to-emerald-700' },
    { name: 'Java', icon: '☕', color: 'from-red-500 to-orange-600' },
    { name: 'C++', icon: '⚡', color: 'from-purple-500 to-indigo-600' },
    { name: 'Go', icon: '🔵', color: 'from-cyan-400 to-blue-500' },
    { name: 'Rust', icon: '🦀', color: 'from-orange-500 to-red-600' },
    { name: 'PHP', icon: '🐘', color: 'from-purple-600 to-indigo-700' },
    { name: 'Swift', icon: '🍎', color: 'from-orange-400 to-red-500' }
  ], [])

  const categories = useMemo(() => [
    { name: 'Best Practices', icon: <Target className="w-5 h-5" />, color: 'from-emerald-500 to-green-600', desc: 'Industry standards and proven methods' },
    { name: 'Performance', icon: <Rocket className="w-5 h-5" />, color: 'from-blue-500 to-cyan-600', desc: 'Speed and optimization techniques' },
    { name: 'Security', icon: <Shield className="w-5 h-5" />, color: 'from-red-500 to-pink-600', desc: 'Secure coding practices' },
    { name: 'Code Quality', icon: <Sparkles className="w-5 h-5" />, color: 'from-purple-500 to-indigo-600', desc: 'Clean, maintainable code' },
    { name: 'Architecture', icon: <Settings className="w-5 h-5" />, color: 'from-gray-500 to-slate-600', desc: 'System design patterns' },
    { name: 'Testing', icon: <Zap className="w-5 h-5" />, color: 'from-yellow-500 to-orange-600', desc: 'Testing strategies and methods' }
  ], [])

  const complexities = useMemo(() => [
    { name: 'Beginner', color: 'from-green-500 to-emerald-600', desc: 'New to programming' },
    { name: 'Intermediate', color: 'from-blue-500 to-cyan-600', desc: 'Some experience' },
    { name: 'Advanced', color: 'from-purple-500 to-indigo-600', desc: 'Experienced developer' },
    { name: 'Expert', color: 'from-red-500 to-pink-600', desc: 'Senior level expertise' }
  ], [])

  const focuses = useMemo(() => [
    { name: 'Performance', icon: '⚡', color: 'from-yellow-500 to-orange-600' },
    { name: 'Readability', icon: '📖', color: 'from-blue-500 to-cyan-600' },
    { name: 'Maintainability', icon: '🔧', color: 'from-green-500 to-emerald-600' },
    { name: 'Scalability', icon: '📈', color: 'from-purple-500 to-indigo-600' },
    { name: 'Security', icon: '🔒', color: 'from-red-500 to-pink-600' },
    { name: 'Testing', icon: '🧪', color: 'from-cyan-500 to-blue-600' }
  ], [])

  const generateSystemPrompt = () => {
    const currentLanguage = getCurrentValue('language')
    const currentCategory = getCurrentValue('category')
    const currentComplexity = getCurrentValue('complexity')
    const currentFocus = getCurrentValue('focus')

    return `You are an expert ${currentLanguage} developer and coding standards specialist. Generate comprehensive coding rules and best practices for ${currentLanguage} development, specifically focused on ${currentCategory} and ${currentFocus}.

Project Context: ${formData.context || 'Modern development practices'}
Specific Requirements: ${formData.customPrompt || 'Industry-standard coding guidelines'}

Create a detailed coding rules document in markdown format that follows the same structure as professional coding standards. Include real, actionable rules with specific code examples.

Generate the rules in this exact format:

# ${currentLanguage} ${currentCategory} Coding Rules

## Core Principles
- List 5-8 fundamental principles for ${currentLanguage} ${currentCategory} development
- Focus on ${currentFocus} throughout

## File Structure & Organization
- Provide specific directory structure recommendations
- File naming conventions
- Module organization patterns
- Import/export best practices

## Code Style & Formatting
- Indentation and spacing rules
- Naming conventions (variables, functions, classes, constants)
- Comment and documentation standards
- Line length and code organization

## ${currentFocus} Best Practices
- Specific rules for ${currentFocus} in ${currentLanguage}
- Performance optimization techniques
- Memory management guidelines
- Error handling patterns

## Code Examples
Provide 3-5 concrete code examples showing:
- ✅ Good practices (DO)
- ❌ Bad practices (DON'T)
- Include explanations for each example

## Testing Guidelines
- Unit testing patterns for ${currentLanguage}
- Test file organization
- Mocking and testing best practices
- Coverage requirements

## Security & Performance
- Security best practices specific to ${currentLanguage}
- Performance optimization rules
- Common pitfalls to avoid
- Monitoring and debugging guidelines

## Dependencies & Libraries
- Recommended libraries for ${currentCategory}
- Dependency management best practices
- Version control and updates
- Package.json/requirements management

## Development Workflow
- Git workflow recommendations
- Code review checklist
- CI/CD integration guidelines
- Documentation requirements

Make each rule specific, actionable, and include real code examples. Focus heavily on ${currentFocus} and ${currentComplexity} level practices. Generate content that developers can immediately apply to their ${currentLanguage} projects.`
  }

  // Fallback rule generator when APIs fail
  const generateFallbackRule = (language: string, category: string) => {
    return `# ${language} ${category} Coding Rules

## 🚀 Generated Offline Rules

Since our AI services are temporarily unavailable, here are some essential ${language} ${category} coding rules:

## Core Principles
- Write clean, readable, and maintainable code
- Follow ${language} naming conventions and best practices
- Implement proper error handling and logging
- Use version control effectively with meaningful commit messages
- Write comprehensive tests for your code

## Code Organization
- Structure your project with clear directory hierarchy
- Separate concerns and follow single responsibility principle
- Use meaningful file and variable names
- Keep functions small and focused
- Document your code with clear comments

## ${category} Best Practices
- Follow industry standards for ${category} development
- Implement proper security measures
- Optimize for performance and scalability
- Use appropriate design patterns
- Maintain consistent code style across the project

## Quality Assurance
- Write unit tests and integration tests
- Use linting tools and code formatters
- Implement continuous integration/deployment
- Conduct code reviews
- Monitor application performance

## Security Guidelines
- Validate all user inputs
- Use secure authentication and authorization
- Protect against common vulnerabilities
- Keep dependencies updated
- Follow OWASP security guidelines

---
*Note: This is a fallback response. For more detailed and specific rules, please try again when our AI services are available.*`
  }

  const generateRuleWithNvidia = async (prompt: string) => {
    try {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-405b-instruct',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
          stream: false
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('NVIDIA API Error Response:', errorText)
        throw new Error(`NVIDIA API error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from NVIDIA API')
      }

      return data.choices[0].message.content
    } catch (error) {
      console.error('NVIDIA API Error:', error)
      throw error
    }
  }

  const generateRule = useCallback(async () => {
    const currentLanguage = getCurrentValue('language')
    const currentCategory = getCurrentValue('category')

    if (!currentLanguage || !currentCategory) {
      alert('Please select or enter at least a language/framework and project category')
      return
    }

    setIsGenerating(true)
    try {
      const systemPrompt = generateSystemPrompt()
      let rule = ''

      // Try multiple APIs in sequence for better reliability
      const apis = [
        {
          name: 'Pollinations AI',
          call: async () => {
            console.log('🔄 Trying Pollinations AI...')
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 15000)

            try {
              // Try the text endpoint first
              let response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}`, {
                method: 'GET',
                headers: {
                  'Accept': 'text/plain',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                  'Cache-Control': 'no-cache'
                },
                signal: controller.signal
              })

              // If text endpoint fails, try the chat endpoint
              if (!response.ok) {
                response = await fetch('https://text.pollinations.ai/openai', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    messages: [{ role: 'user', content: systemPrompt }],
                    model: 'openai',
                    stream: false
                  }),
                  signal: controller.signal
                })
              }

              clearTimeout(timeoutId)

              if (response.ok) {
                const contentType = response.headers.get('content-type')
                let text = ''

                if (contentType && contentType.includes('application/json')) {
                  const data = await response.json()
                  text = data.choices?.[0]?.message?.content || data.response || ''
                } else {
                  text = await response.text()
                }

                if (text && text.trim().length > 50) {
                  return text.trim()
                }
              }
              throw new Error(`Pollinations API failed: ${response.status}`)
            } catch (error) {
              clearTimeout(timeoutId)
              throw error
            }
          }
        },
        {
          name: 'NVIDIA API',
          call: async () => {
            console.log('🔄 Trying NVIDIA API...')
            return await generateRuleWithNvidia(systemPrompt)
          }
        },
        {
          name: 'DeepInfra API',
          call: async () => {
            console.log('🔄 Trying DeepInfra API...')
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 15000)

            try {
              const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  model: 'meta-llama/Llama-2-7b-chat-hf',
                  messages: [
                    {
                      role: 'user',
                      content: systemPrompt
                    }
                  ],
                  temperature: 0.7,
                  max_tokens: 2000,
                  stream: false
                }),
                signal: controller.signal
              })

              clearTimeout(timeoutId)

              if (response.ok) {
                const data = await response.json()
                if (data && data.choices && data.choices[0] && data.choices[0].message) {
                  return data.choices[0].message.content.trim()
                }
              }
              throw new Error(`DeepInfra API failed: ${response.status}`)
            } catch (error) {
              clearTimeout(timeoutId)
              throw error
            }
          }
        },
        {
          name: 'OpenAI Compatible API',
          call: async () => {
            console.log('🔄 Trying OpenAI Compatible API...')
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 15000)

            try {
              // Using a free OpenAI-compatible API
              const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer gsk_free_api_key_placeholder',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'llama3-8b-8192',
                  messages: [
                    {
                      role: 'user',
                      content: systemPrompt
                    }
                  ],
                  temperature: 0.7,
                  max_tokens: 2000
                }),
                signal: controller.signal
              })

              clearTimeout(timeoutId)

              if (response.ok) {
                const data = await response.json()
                if (data && data.choices && data.choices[0] && data.choices[0].message) {
                  return data.choices[0].message.content.trim()
                }
              }
              throw new Error(`OpenAI Compatible API failed: ${response.status}`)
            } catch (error) {
              clearTimeout(timeoutId)
              throw error
            }
          }
        }
      ]

      // Try each API in sequence
      for (const api of apis) {
        try {
          rule = await api.call()
          if (rule && rule.trim().length > 50) {
            console.log(`✅ ${api.name} successful!`)
            setGeneratedRule(rule)
            return
          }
        } catch (apiError) {
          const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error'
          console.log(`❌ ${api.name} failed:`, errorMessage)
          continue
        }
      }

      // If all APIs fail, provide a fallback response
      console.log('⚠️ All APIs failed, providing fallback response...')
      const fallbackRule = generateFallbackRule(currentLanguage, currentCategory)
      setGeneratedRule(fallbackRule)

    } catch (error) {
      console.error('Error generating rule:', error)
      // Provide fallback even on unexpected errors
      const currentLanguage = getCurrentValue('language')
      const currentCategory = getCurrentValue('category')
      const fallbackRule = generateFallbackRule(currentLanguage, currentCategory)
      setGeneratedRule(fallbackRule)
    } finally {
      setIsGenerating(false)
    }
  }, [generateSystemPrompt])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedRule)
    alert('Coding rules copied to clipboard!')
  }, [generatedRule])

  const downloadRule = useCallback(() => {
    const currentLanguage = getCurrentValue('language')
    const currentCategory = getCurrentValue('category')
    const fileName = `${currentLanguage.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')}-rules.md`

    const blob = new Blob([generatedRule], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [generatedRule])

  // Helper functions for dropdown management - optimized with useCallback
  const toggleDropdown = useCallback((field: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }, [])

  const selectPreset = useCallback((field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setInputMode(prev => ({ ...prev, [field]: 'preset' }))
    setDropdownStates(prev => ({ ...prev, [field]: false }))
  }, [])

  const handleCustomInput = useCallback((field: keyof typeof customInputs, value: string) => {
    setCustomInputs(prev => ({ ...prev, [field]: value }))
    setFormData(prev => ({ ...prev, [field]: value }))
    setInputMode(prev => ({ ...prev, [field]: 'custom' }))
  }, [])

  const getCurrentValue = useCallback((field: 'language' | 'category' | 'complexity' | 'focus') => {
    return inputMode[field] === 'custom' ? customInputs[field] : formData[field]
  }, [inputMode, customInputs, formData])

  // Reusable dropdown component
  const DropdownField = ({
    field,
    title,
    icon,
    options,
    placeholder = "Type your custom option..."
  }: {
    field: 'language' | 'category' | 'complexity' | 'focus'
    title: string
    icon: React.ReactNode
    options: Array<{ name: string; icon?: React.ReactNode; color?: string; desc?: string }>
    placeholder?: string
  }) => (
    <div className="space-y-3">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2">
        {icon}
        <span>{title}</span>
      </h3>

      <div className="relative dropdown-container">
        {/* Current Selection / Custom Input */}
        <div
          className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl cursor-pointer hover:border-white/20 transition-colors"
          onClick={() => toggleDropdown(field)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              {inputMode[field] === 'preset' && options.find(opt => opt.name === formData[field])?.icon && (
                <div className="text-lg sm:text-xl flex-shrink-0">{options.find(opt => opt.name === formData[field])?.icon}</div>
              )}
              <span className="text-white font-medium text-sm sm:text-base truncate">
                {getCurrentValue(field) || 'Select or type custom...'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 ${dropdownStates[field] ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownStates[field] && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl z-50 max-h-60 sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
            {/* Custom Input */}
            <div className="p-3 sm:p-4 border-b border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-medium text-emerald-400">Custom Option</span>
              </div>
              <input
                type="text"
                placeholder={placeholder}
                value={customInputs[field]}
                onChange={(e) => handleCustomInput(field, e.target.value)}
                className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 text-sm sm:text-base"
                autoFocus={inputMode[field] === 'custom'}
              />
            </div>

            {/* Preset Options */}
            <div className="p-1 sm:p-2">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => selectPreset(field, option.name)}
                  className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center space-x-2 sm:space-x-3 ${
                    formData[field] === option.name && inputMode[field] === 'preset'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  {option.icon && <div className="text-lg sm:text-xl flex-shrink-0">{option.icon}</div>}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm sm:text-base truncate">{option.name}</div>
                    {option.desc && <div className="text-xs opacity-70 hidden sm:block">{option.desc}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-4 sm:top-20 left-4 sm:left-20 w-32 sm:w-72 h-32 sm:h-72 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-4 sm:bottom-20 right-4 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl w-full max-w-[95vw] sm:max-w-7xl max-h-[95vh] overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-cyan-500/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-6 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-400 via-cyan-400 to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-9 lg:h-9 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl lg:text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent truncate">
                  AI Rules Generator
                </h1>
                <p className="text-xs sm:text-sm lg:text-xl text-gray-300 mt-1 hidden sm:block">Generate comprehensive coding rules and best practices for any language</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0 ml-2"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(95vh-120px)] sm:h-[calc(95vh-140px)] lg:h-[calc(95vh-200px)]">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 lg:border-r border-white/10 overflow-y-auto max-h-[40vh] lg:max-h-none">
            <div className="space-y-8">
              {/* Language Selection */}
              <DropdownField
                field="language"
                title="Choose Language"
                icon={<Code className="w-5 h-5 text-emerald-400" />}
                options={languages}
                placeholder="Type your preferred language/framework..."
              />

              {/* Category Selection */}
              <DropdownField
                field="category"
                title="Select Category"
                icon={<Palette className="w-5 h-5 text-purple-400" />}
                options={categories}
                placeholder="Type your custom category..."
              />

              {/* Complexity Level */}
              <DropdownField
                field="complexity"
                title="Complexity Level"
                icon={<BookOpen className="w-5 h-5 text-blue-400" />}
                options={complexities}
                placeholder="Type your preferred complexity level..."
              />

              {/* Focus Area */}
              <DropdownField
                field="focus"
                title="Primary Focus"
                icon={<Target className="w-5 h-5 text-cyan-400" />}
                options={focuses}
                placeholder="Type your custom focus area..."
              />

              {/* Project Context */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span>Project Context</span>
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <textarea
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    placeholder="Describe your project: type, scale, target users, business goals, timeline..."
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none text-sm sm:text-base"
                    rows={3}
                  />
                </div>
              </div>

              {/* Specific Requirements */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                  <span>Specific Requirements</span>
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <textarea
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                    placeholder="Specific features, integrations, compliance needs, performance requirements..."
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none text-sm sm:text-base"
                    rows={3}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button
                  onClick={generateRule}
                  disabled={isGenerating}
                  className="group relative w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:via-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl text-white font-bold text-base sm:text-lg lg:text-xl transition-all duration-500 hover:scale-105 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-700 rounded-2xl sm:rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 animate-spin" />
                        <span className="hidden sm:inline">Generating Coding Rules...</span>
                        <span className="sm:hidden">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        <span className="hidden sm:inline">Generate Rules with AI</span>
                        <span className="sm:hidden">Generate AI Rules</span>
                        <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Generated Rule */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
            {generatedRule ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 hover:border-emerald-500/50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-emerald-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  >
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Copy Rule</span>
                  </button>
                  <button
                    onClick={downloadRule}
                    className="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/30 hover:border-purple-500/50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-purple-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Download</span>
                  </button>
                </div>

                {/* Generated Content */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                      </div>
                      <span>Generated Coding Rules</span>
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-400">Your comprehensive coding rules and best practices are ready!</p>
                  </div>
                  <div className="bg-black/20 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 max-h-48 sm:max-h-64 lg:max-h-96 overflow-y-auto">
                    <pre className="text-gray-200 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed">
                      {generatedRule}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 sm:space-y-6 lg:space-y-8 p-4">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Ready to Create Magic</h3>
                  <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md leading-relaxed">
                    Configure your language and focus area to generate comprehensive coding rules and best practices
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-emerald-400">
                    <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">AI-Powered Generation</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default AIRulesGenerator
