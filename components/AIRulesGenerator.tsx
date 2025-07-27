'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Wand2, Code, Brain, Zap, X, Copy, Download, RefreshCw, Palette, Shield, Rocket, Target, Settings, BookOpen } from 'lucide-react'

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
    return `You are an expert software engineer and coding mentor with 15+ years of experience across multiple programming languages and frameworks. Your task is to generate a comprehensive, actionable coding rule based on the user's specifications.

CONTEXT:
- Language/Framework: ${formData.language}
- Category: ${formData.category}
- Complexity Level: ${formData.complexity}
- Primary Focus: ${formData.focus}
- Additional Context: ${formData.context || 'None provided'}
- Custom Requirements: ${formData.customPrompt || 'None provided'}

INSTRUCTIONS:
Generate a detailed coding rule that includes:

1. **Rule Title**: A clear, memorable title (max 60 characters)
2. **Rule Description**: A concise explanation of what the rule addresses (2-3 sentences)
3. **Why It Matters**: Explain the importance and benefits (2-3 sentences)
4. **Implementation Guidelines**: Step-by-step instructions or principles
5. **Code Example**: Provide both "Bad" and "Good" examples with explanations
6. **Best Practices**: 3-5 specific actionable tips
7. **Common Pitfalls**: 2-3 mistakes to avoid
8. **Tools/Resources**: Relevant tools, linters, or libraries that help
9. **Complexity Level**: Appropriate for ${formData.complexity} developers
10. **Tags**: 3-5 relevant tags for categorization

FORMATTING REQUIREMENTS:
- Use clear markdown formatting
- Include syntax highlighting for code blocks
- Use emojis sparingly but effectively
- Keep explanations concise but comprehensive
- Ensure examples are practical and realistic
- Make it actionable and immediately applicable

QUALITY STANDARDS:
- The rule should be specific to ${formData.language} and ${formData.category}
- Focus heavily on ${formData.focus}
- Appropriate complexity for ${formData.complexity} level
- Include real-world scenarios and use cases
- Provide measurable benefits when possible
- Ensure the rule is current with modern practices

Generate a professional, comprehensive coding rule that developers can immediately apply to improve their code quality.`
  }

  const generateRule = async () => {
    if (!formData.language || !formData.category) {
      alert('Please select at least a language and category')
      return
    }

    setIsGenerating(true)
    try {
      const systemPrompt = generateSystemPrompt()
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}`)
      const rule = await response.text()
      setGeneratedRule(rule)
    } catch (error) {
      console.error('Error generating rule:', error)
      alert('Failed to generate rule. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRule)
    alert('Rule copied to clipboard!')
  }

  const downloadRule = () => {
    const blob = new Blob([generatedRule], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.language}-${formData.category}-rule.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
                <p className="text-xl text-gray-300 mt-1">Create custom coding rules with artificial intelligence</p>
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
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <span>Choose Language</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map(lang => (
                    <button
                      key={lang.name}
                      onClick={() => setFormData({ ...formData, language: lang.name })}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        formData.language === lang.name
                          ? `bg-gradient-to-r ${lang.color} border-white/30 text-white shadow-lg`
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.icon}</span>
                        <span className="font-semibold">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <span>Select Category</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setFormData({ ...formData, category: cat.name })}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        formData.category === cat.name
                          ? `bg-gradient-to-r ${cat.color} border-white/30 text-white shadow-lg`
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl ${formData.category === cat.name ? 'bg-white/20' : 'bg-white/10'}`}>
                            {cat.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{cat.name}</div>
                            <div className="text-sm opacity-80">{cat.desc}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Level */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>Complexity Level</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {complexities.map(level => (
                    <button
                      key={level.name}
                      onClick={() => setFormData({ ...formData, complexity: level.name })}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        formData.complexity === level.name
                          ? `bg-gradient-to-r ${level.color} border-white/30 text-white shadow-lg`
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-bold text-lg">{level.name}</div>
                        <div className="text-sm opacity-80 mt-1">{level.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Primary Focus</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {focuses.map(focus => (
                    <button
                      key={focus.name}
                      onClick={() => setFormData({ ...formData, focus: focus.name })}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        formData.focus === focus.name
                          ? `bg-gradient-to-r ${focus.color} border-white/30 text-white shadow-lg`
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{focus.icon}</span>
                        <span className="font-semibold">{focus.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Context */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Additional Context</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <textarea
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    placeholder="Describe your specific use case, project type, or requirements..."
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Custom Prompt */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Custom Requirements</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <textarea
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                    placeholder="Any specific requirements or aspects you want the rule to cover..."
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
                        <span>Generating Amazing Rule...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6" />
                        <span>Generate AI Rule</span>
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
                      <span>Generated Rule</span>
                    </h3>
                    <p className="text-gray-400">Your custom coding rule is ready!</p>
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
                    Configure your preferences and let AI generate the perfect coding rule for your needs
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
