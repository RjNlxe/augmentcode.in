'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Code, Brain, Zap, X, Copy, Download, RefreshCw } from 'lucide-react'

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

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Node.js',
    'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin',
    'Vue.js', 'Angular', 'Django', 'Flask', 'Express.js', 'Spring Boot'
  ]

  const categories = [
    'Best Practices', 'Performance Optimization', 'Security', 'Code Quality',
    'Architecture', 'Testing', 'Debugging', 'Error Handling', 'Design Patterns',
    'API Design', 'Database', 'DevOps', 'Accessibility', 'Mobile Development'
  ]

  const complexities = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  const focuses = [
    'Performance', 'Readability', 'Maintainability', 'Scalability',
    'Security', 'Testing', 'Documentation', 'Optimization', 'Clean Code'
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-emerald-500/20 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-purple-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Rules Generator</h2>
                <p className="text-gray-400">Create custom coding rules with AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-120px)]">
          {/* Left Panel - Form */}
          <div className="w-1/2 p-6 border-r border-emerald-500/20 overflow-y-auto">
            <div className="space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Programming Language/Framework *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full p-3 bg-dark-800 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Rule Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-dark-800 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Complexity Level */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Complexity Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {complexities.map(level => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, complexity: level })}
                      className={`p-3 rounded-xl border transition-all ${
                        formData.complexity === level
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-dark-800 border-emerald-500/30 text-gray-300 hover:border-emerald-500/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Primary Focus
                </label>
                <select
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  className="w-full p-3 bg-dark-800 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {focuses.map(focus => (
                    <option key={focus} value={focus}>{focus}</option>
                  ))}
                </select>
              </div>

              {/* Context */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Additional Context (Optional)
                </label>
                <textarea
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  placeholder="Describe your specific use case, project type, or requirements..."
                  className="w-full p-3 bg-dark-800 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Custom Requirements (Optional)
                </label>
                <textarea
                  value={formData.customPrompt}
                  onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                  placeholder="Any specific requirements or aspects you want the rule to cover..."
                  className="w-full p-3 bg-dark-800 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateRule}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 p-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating Rule...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate AI Rule</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Generated Rule */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {generatedRule ? (
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadRule}
                    className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 px-4 py-2 rounded-xl text-purple-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>

                {/* Generated Content */}
                <div className="bg-dark-800/50 border border-emerald-500/20 rounded-xl p-6">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {generatedRule}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Generate</h3>
                  <p className="text-gray-400 max-w-md">
                    Configure your preferences on the left and click "Generate AI Rule" to create a custom coding rule tailored to your needs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
