'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Brain, Wand2, Users, Code, Target, Shield, Rocket, Settings, BookOpen, CheckCircle, ArrowRight, RefreshCw, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface FormData {
  projectName: string
  projectDescription: string
  targetAudience: string
  businessGoals: string
  primaryLanguage: string
  techStack: string[]
  projectType: string
  timeline: string
  teamSize: string
  budget: string
  specificRequirements: string
}

export default function GeneratePage() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    targetAudience: '',
    businessGoals: '',
    primaryLanguage: 'JavaScript',
    techStack: [],
    projectType: 'Web Application',
    timeline: '3-6 months',
    teamSize: '2-5 developers',
    budget: 'Medium ($10k-$50k)',
    specificRequirements: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPRD, setGeneratedPRD] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  // Scroll lock effect when preview is shown
  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showPreview])

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Vue.js',
    'Angular', 'Django', 'FastAPI', 'Node.js', 'Rust', 'Go', 'Java',
    'C++', 'Swift', 'Flutter', 'React Native', 'PHP', 'Ruby', 'C#'
  ]

  const techStackOptions = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
    'Node.js', 'Express', 'Django', 'FastAPI', 'Flask', 'Laravel',
    'Spring Boot', 'ASP.NET', 'Ruby on Rails', 'PostgreSQL', 'MySQL',
    'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'GraphQL',
    'REST API', 'WebSocket', 'JWT', 'OAuth', 'Stripe', 'PayPal'
  ]

  const projectTypes = [
    'Web Application', 'Mobile App', 'Desktop Application', 'API/Backend Service',
    'E-commerce Platform', 'SaaS Product', 'CMS/Blog', 'Social Platform',
    'Dashboard/Analytics', 'AI/ML Application', 'Blockchain/Web3', 'Game',
    'IoT Application', 'Microservices', 'Chrome Extension', 'PWA'
  ]

  const toggleTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }))
  }

  const generateSystemPrompt = () => {
    return `You are a senior product manager and technical architect. Create a comprehensive Project Requirements Document (PRD) for the following project:

Project Name: ${formData.projectName}
Project Description: ${formData.projectDescription}
Target Audience: ${formData.targetAudience}
Business Goals: ${formData.businessGoals}
Primary Language: ${formData.primaryLanguage}
Tech Stack: ${formData.techStack.join(', ')}
Project Type: ${formData.projectType}
Timeline: ${formData.timeline}
Team Size: ${formData.teamSize}
Budget: ${formData.budget}
Specific Requirements: ${formData.specificRequirements}

Generate a complete, professional PRD document in markdown format. Include real, actionable content with specific examples and technical details. Structure the document as follows:

# Project Requirements Document: ${formData.projectName}

## 1. Executive Summary
- Project overview and vision
- Key objectives and success metrics
- Target market and user base
- Expected ROI and business impact

## 2. Project Overview
- Detailed project description
- Problem statement and solution
- Market opportunity and competitive analysis
- Value proposition

## 3. Target Audience & User Personas
- Primary and secondary user groups
- Detailed user personas with demographics
- User journey mapping
- Pain points and needs analysis

## 4. Business Requirements
- Functional requirements with user stories
- Non-functional requirements (performance, security, scalability)
- Business rules and constraints
- Compliance and regulatory requirements

## 5. Technical Architecture
- System architecture overview
- Technology stack justification
- Database design and data flow
- API specifications and integrations
- Security architecture

## 6. Feature Specifications
- Core features with detailed descriptions
- User stories with acceptance criteria
- Feature prioritization (MoSCoW method)
- Wireframes and UI/UX considerations

## 7. Development Guidelines
- Coding standards and conventions
- Code review processes
- Testing strategies (unit, integration, e2e)
- Documentation requirements
- Version control workflow

## 8. Project Timeline & Milestones
- Development phases and sprints
- Key milestones and deliverables
- Resource allocation and dependencies
- Risk assessment and mitigation

## 9. Quality Assurance
- Testing protocols and procedures
- Performance benchmarks
- Security testing requirements
- User acceptance testing criteria

## 10. Deployment & Operations
- Deployment strategy and environments
- CI/CD pipeline configuration
- Monitoring and logging setup
- Maintenance and support procedures

## 11. Budget & Resource Planning
- Development cost breakdown
- Infrastructure and operational costs
- Team structure and roles
- Third-party services and licenses

## 12. Risk Management
- Technical risks and mitigation strategies
- Business risks and contingency plans
- Timeline risks and buffer planning
- Quality risks and prevention measures

Make this document comprehensive, professional, and immediately actionable. Include specific code examples in ${formData.primaryLanguage} where relevant. Focus on practical implementation details that a development team can follow directly.`
  }

  const generatePRDWithNvidia = async (prompt: string) => {
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

  const generatePRD = async () => {
    if (!formData.projectName.trim() || !formData.projectDescription.trim()) {
      alert('Please provide at least a project name and description')
      return
    }

    setIsGenerating(true)
    try {
      const systemPrompt = generateSystemPrompt()
      let prdContent = ''

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
          prdContent = await response.text()
          if (prdContent && prdContent.trim().length > 0) {
            console.log('✅ Pollinations AI successful')
            setGeneratedPRD(prdContent)
            setShowPreview(true)
            return
          }
        }
        throw new Error('Pollinations API failed or returned empty response')
      } catch (pollinationsError) {
        console.log('❌ Pollinations AI failed, trying NVIDIA API backup...')

        // Fallback to NVIDIA API
        try {
          prdContent = await generatePRDWithNvidia(systemPrompt)
          if (prdContent && prdContent.trim().length > 0) {
            console.log('✅ NVIDIA API backup successful')
            setGeneratedPRD(prdContent)
            setShowPreview(true)
            return
          }
          throw new Error('NVIDIA API returned empty response')
        } catch (nvidiaError) {
          console.error('❌ Both APIs failed:', { pollinationsError, nvidiaError })
          throw new Error('Both Pollinations and NVIDIA APIs failed. Please try again later.')
        }
      }
    } catch (error) {
      console.error('Error generating PRD:', error)
      // Silently handle errors - no alert notifications
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPRD = () => {
    const blob = new Blob([generatedPRD], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prd.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPRD)
    alert('PRD copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-black text-white font-space overflow-hidden">
      {/* Header */}
      <header className="relative z-20 border-b border-emerald-500/20 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl overflow-hidden pulse-emerald">
              <Image
                src="/image.png"
                alt="Augment Code Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover logo-visible"
                priority
              />
            </div>
            <span className="text-2xl font-black visible-text font-code tracking-wider text-shadow-emerald">
              augmentcode
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link href="/rules" className="text-zinc-400 hover:text-emerald-400 transition-colors font-space">Rules</Link>
            <Link href="/mcp" className="text-zinc-400 hover:text-emerald-400 transition-colors font-space">MCP</Link>
            <a 
              href="https://augment.community" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-emerald text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </a>
          </nav>
        </div>
      </header>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-6xl md:text-7xl font-black mb-6 font-space">
            <span className="visible-text text-shadow-lg">AI-Powered</span>
            <br />
            <span className="gradient-text force-visible shimmer">PRD Generator</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
            Generate comprehensive Project Requirements Documents with technical specifications,
            architecture details, and implementation guidelines tailored to your project.
          </p>
        </div>

        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-8">
              {/* Project Name */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Project Name</span>
                </h3>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  placeholder="e.g., TaskFlow - Project Management Platform"
                  className="w-full p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 font-space"
                />
              </div>

              {/* Project Description */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Project Description</span>
                </h3>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  placeholder="Describe your project in detail: features, functionality, goals, and vision..."
                  className="w-full h-32 p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none font-space"
                />
              </div>

              {/* Target Audience */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Target Audience</span>
                </h3>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  placeholder="e.g., Small to medium businesses, project managers, remote teams"
                  className="w-full p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 font-space"
                />
              </div>

              {/* Business Goals */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Business Goals</span>
                </h3>
                <textarea
                  value={formData.businessGoals}
                  onChange={(e) => setFormData({...formData, businessGoals: e.target.value})}
                  placeholder="What are the main business objectives? Revenue targets, user acquisition, market penetration..."
                  className="w-full h-24 p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none font-space"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-8">
              {/* Primary Language */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Primary Language</span>
                </h3>
                <select
                  value={formData.primaryLanguage}
                  onChange={(e) => setFormData({...formData, primaryLanguage: e.target.value})}
                  className="w-full p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 font-space"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="bg-zinc-950">{lang}</option>
                  ))}
                </select>
              </div>

              {/* Tech Stack */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Tech Stack</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {techStackOptions.map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTechStack(tech)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        formData.techStack.includes(tech)
                          ? 'bg-emerald-500 text-black'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                {formData.techStack.length > 0 && (
                  <div className="mt-4 p-3 bg-emerald-950/50 rounded-xl border border-emerald-500/20">
                    <p className="text-sm text-emerald-300">
                      Selected: {formData.techStack.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Project Type */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Project Type</span>
                </h3>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 font-space"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type} className="bg-zinc-950">{type}</option>
                  ))}
                </select>
              </div>

              {/* Timeline & Team */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card-emerald">
                  <h3 className="text-lg font-bold mb-3 text-emerald-400">Timeline</h3>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className="w-full p-3 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm font-space"
                  >
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                </div>
                <div className="card-emerald">
                  <h3 className="text-lg font-bold mb-3 text-emerald-400">Team Size</h3>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                    className="w-full p-3 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm font-space"
                  >
                    <option value="1 developer">1 developer</option>
                    <option value="2-5 developers">2-5 developers</option>
                    <option value="5-10 developers">5-10 developers</option>
                    <option value="10+ developers">10+ developers</option>
                  </select>
                </div>
              </div>

              {/* Specific Requirements */}
              <div className="card-emerald">
                <h3 className="text-xl font-bold mb-4 text-emerald-400 flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Specific Requirements</span>
                </h3>
                <textarea
                  value={formData.specificRequirements}
                  onChange={(e) => setFormData({...formData, specificRequirements: e.target.value})}
                  placeholder="Any specific features, integrations, compliance needs, performance requirements..."
                  className="w-full h-24 p-4 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none font-space"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePRD}
                disabled={isGenerating || !formData.projectName.trim() || !formData.projectDescription.trim()}
                className="w-full btn-emerald text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-3">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>Generating Comprehensive PRD...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Brain className="w-6 h-6" />
                    <span>Generate PRD</span>
                    <Wand2 className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          // PRD Preview Section
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-emerald-400 flex items-center space-x-3">
                <CheckCircle className="w-8 h-8" />
                <span>Generated PRD</span>
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={copyToClipboard}
                  className="btn-emerald flex items-center space-x-2"
                >
                  <FileText className="w-5 h-5" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadPRD}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PRD</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-3 rounded-xl transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="bg-black/20 border border-white/10 rounded-2xl p-6 max-h-[70vh] overflow-y-auto">
                <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedPRD}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  )
}
