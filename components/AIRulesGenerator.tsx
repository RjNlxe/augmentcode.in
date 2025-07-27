'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Wand2, Code, Brain, Zap, X, Copy, Download, RefreshCw, Palette, Shield, Rocket, Target, Settings, BookOpen, ChevronDown, Plus } from 'lucide-react'

interface AIRulesGeneratorProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIRulesGenerator({ isOpen, onClose }: AIRulesGeneratorProps) {
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

  const languages = [
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
  ]

  const categories = [
    { name: 'Best Practices', icon: <Target className="w-5 h-5" />, color: 'from-emerald-500 to-green-600', desc: 'Industry standards and proven methods' },
    { name: 'Performance', icon: <Rocket className="w-5 h-5" />, color: 'from-blue-500 to-cyan-600', desc: 'Speed and optimization techniques' },
    { name: 'Security', icon: <Shield className="w-5 h-5" />, color: 'from-red-500 to-pink-600', desc: 'Secure coding practices' },
    { name: 'Code Quality', icon: <Sparkles className="w-5 h-5" />, color: 'from-purple-500 to-indigo-600', desc: 'Clean, maintainable code' },
    { name: 'Architecture', icon: <Settings className="w-5 h-5" />, color: 'from-gray-500 to-slate-600', desc: 'System design patterns' },
    { name: 'Testing', icon: <Zap className="w-5 h-5" />, color: 'from-yellow-500 to-orange-600', desc: 'Testing strategies and methods' }
  ]

  const complexities = [
    { name: 'Beginner', color: 'from-green-500 to-emerald-600', desc: 'New to programming' },
    { name: 'Intermediate', color: 'from-blue-500 to-cyan-600', desc: 'Some experience' },
    { name: 'Advanced', color: 'from-purple-500 to-indigo-600', desc: 'Experienced developer' },
    { name: 'Expert', color: 'from-red-500 to-pink-600', desc: 'Senior level expertise' }
  ]

  const focuses = [
    { name: 'Performance', icon: '⚡', color: 'from-yellow-500 to-orange-600' },
    { name: 'Readability', icon: '📖', color: 'from-blue-500 to-cyan-600' },
    { name: 'Maintainability', icon: '🔧', color: 'from-green-500 to-emerald-600' },
    { name: 'Scalability', icon: '📈', color: 'from-purple-500 to-indigo-600' },
    { name: 'Security', icon: '🔒', color: 'from-red-500 to-pink-600' },
    { name: 'Testing', icon: '🧪', color: 'from-cyan-500 to-blue-600' }
  ]

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

  const generateRuleWithNvidia = async (prompt: string) => {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2-instruct',
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
      throw new Error(`NVIDIA API error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  const generateRule = async () => {
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

      // Try Pollinations AI first
      try {
        console.log('Trying Pollinations AI API...')
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}`, {
          method: 'GET',
          headers: {
            'Accept': 'text/plain',
          }
        })

        if (response.ok) {
          rule = await response.text()
          if (rule && rule.trim().length > 0) {
            console.log('✅ Pollinations AI successful')
            setGeneratedRule(rule)
            return
          }
        }
        throw new Error('Pollinations API failed or returned empty response')
      } catch (pollinationsError) {
        console.log('❌ Pollinations AI failed, trying NVIDIA API backup...')

        // Fallback to NVIDIA API
        try {
          rule = await generateRuleWithNvidia(systemPrompt)
          if (rule && rule.trim().length > 0) {
            console.log('✅ NVIDIA API backup successful')
            setGeneratedRule(rule)
            return
          }
          throw new Error('NVIDIA API returned empty response')
        } catch (nvidiaError) {
          console.error('❌ Both APIs failed:', { pollinationsError, nvidiaError })
          throw new Error('Both Pollinations and NVIDIA APIs failed. Please try again later.')
        }
      }
    } catch (error) {
      console.error('Error generating rule:', error)
      // Silently handle errors - no alert notifications
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRule)
    alert('Coding rules copied to clipboard!')
  }

  const downloadRule = () => {
    const currentLanguage = getCurrentValue('language')
    const currentCategory = getCurrentValue('category')
    const fileName = `${currentLanguage.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')}-rules.mdc`

    const blob = new Blob([generatedRule], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Helper functions for dropdown management
  const toggleDropdown = (field: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const selectPreset = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setInputMode(prev => ({ ...prev, [field]: 'preset' }))
    setDropdownStates(prev => ({ ...prev, [field]: false }))
  }

  const handleCustomInput = (field: keyof typeof customInputs, value: string) => {
    setCustomInputs(prev => ({ ...prev, [field]: value }))
    setFormData(prev => ({ ...prev, [field]: value }))
    setInputMode(prev => ({ ...prev, [field]: 'custom' }))
  }

  const getCurrentValue = (field: 'language' | 'category' | 'complexity' | 'focus') => {
    return inputMode[field] === 'custom' ? customInputs[field] : formData[field]
  }

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
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        {icon}
        <span>{title}</span>
      </h3>

      <div className="relative dropdown-container">
        {/* Current Selection / Custom Input */}
        <div
          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-white/20 transition-colors"
          onClick={() => toggleDropdown(field)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {inputMode[field] === 'preset' && options.find(opt => opt.name === formData[field])?.icon && (
                <div className="text-xl">{options.find(opt => opt.name === formData[field])?.icon}</div>
              )}
              <span className="text-white font-medium">
                {getCurrentValue(field) || 'Select or type custom...'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownStates[field] ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownStates[field] && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
            {/* Custom Input */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Custom Option</span>
              </div>
              <input
                type="text"
                placeholder={placeholder}
                value={customInputs[field]}
                onChange={(e) => handleCustomInput(field, e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50"
                autoFocus={inputMode[field] === 'custom'}
              />
            </div>

            {/* Preset Options */}
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => selectPreset(field, option.name)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                    formData[field] === option.name && inputMode[field] === 'preset'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  {option.icon && <div className="text-xl">{option.icon}</div>}
                  <div>
                    <div className="font-medium">{option.name}</div>
                    {option.desc && <div className="text-xs opacity-70">{option.desc}</div>}
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative p-8 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-cyan-500/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-cyan-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Brain className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                  AI Rules Generator
                </h1>
                <p className="text-xl text-gray-300 mt-1">Generate comprehensive coding rules and best practices for any language</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-200px)]">
          {/* Left Panel - Form */}
          <div className="w-1/2 p-8 border-r border-white/10 overflow-y-auto">
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
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-orange-400" />
                  <span>Project Context</span>
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <textarea
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    placeholder="Describe your project: type, scale, target users, business goals, timeline..."
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Specific Requirements */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span>Specific Requirements</span>
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <textarea
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                    placeholder="Specific features, integrations, compliance needs, performance requirements..."
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button
                  onClick={generateRule}
                  disabled={isGenerating}
                  className="group relative w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:via-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 p-6 rounded-3xl text-white font-bold text-xl transition-all duration-500 hover:scale-105 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-700 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative flex items-center justify-center space-x-4">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Generating Coding Rules...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6" />
                        <span>Generate Rules with AI</span>
                        <Wand2 className="w-6 h-6" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Generated Rule */}
          <div className="w-1/2 p-8 overflow-y-auto">
            {generatedRule ? (
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={copyToClipboard}
                    className="group flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 hover:border-emerald-500/50 px-6 py-3 rounded-2xl text-emerald-400 transition-all duration-300 hover:scale-105"
                  >
                    <Copy className="w-5 h-5" />
                    <span className="font-semibold">Copy Rule</span>
                  </button>
                  <button
                    onClick={downloadRule}
                    className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/30 hover:border-purple-500/50 px-6 py-3 rounded-2xl text-purple-400 transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Download</span>
                  </button>
                </div>

                {/* Generated Content */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span>Generated Coding Rules</span>
                    </h3>
                    <p className="text-gray-400">Your comprehensive coding rules and best practices are ready!</p>
                  </div>
                  <div className="bg-black/20 border border-white/10 rounded-2xl p-6 max-h-96 overflow-y-auto">
                    <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {generatedRule}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">Ready to Create Magic</h3>
                  <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                    Configure your language and focus area to generate comprehensive coding rules and best practices
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-emerald-400">
                    <Wand2 className="w-5 h-5" />
                    <span className="font-semibold">AI-Powered Generation</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
