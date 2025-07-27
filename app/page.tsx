'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Search, Code2, ArrowRight, Zap, BookOpen, Palette, Brain, Globe, Rocket, Heart, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Preload rules on client-side for instant navigation
import { getAllRules, getLanguages, getCategories } from '@/lib/rules-loader'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Preload rules data on component mount for instant navigation
  useEffect(() => {
    // Trigger preload of all rules data
    getAllRules()
    getLanguages()
    getCategories()
  }, [])

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => handleMouseMove(e), 16) // ~60fps
    }

    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      clearTimeout(timeoutId)
    }
  }, [handleMouseMove])

  // Memoized featured rules for performance
  const featuredRules = useMemo(() => [
    {
      title: "Design System",
      description: "Beautiful UI components and design patterns",
      icon: <Palette className="w-5 h-5" />,
      delay: 0.1,
      category: "Frontend",
      language: "React"
    },
    {
      title: "Deep Learning",
      description: "Advanced AI/ML patterns and neural networks",
      icon: <Brain className="w-5 h-5" />,
      delay: 0.2,
      category: "AI/ML",
      language: "Python"
    },
    {
      title: "Django Framework",
      description: "Scalable Python web development practices",
      icon: <Globe className="w-5 h-5" />,
      delay: 0.3,
      category: "Backend",
      language: "Django"
    },
    {
      title: "Chrome Extensions",
      description: "Modern browser extension development",
      icon: <Rocket className="w-5 h-5" />,
      delay: 0.4,
      category: "Frontend",
      language: "JavaScript"
    },
    {
      title: "Next.js Mastery",
      description: "Performance-first React applications",
      icon: <Zap className="w-5 h-5" />,
      delay: 0.5,
      category: "Frontend",
      language: "Next.js"
    },
    {
      title: "Python & Rust",
      description: "High-performance systems programming",
      icon: <Code2 className="w-5 h-5" />,
      delay: 0.6,
      category: "General",
      language: "Python"
    }
  ], [])

  // Handle featured rule click
  const handleRuleClick = useCallback((rule: typeof featuredRules[0]) => {
    const params = new URLSearchParams()
    if (rule.language) params.set('language', rule.language)
    if (rule.category) params.set('category', rule.category)

    const queryString = params.toString()
    const url = queryString ? `/rules?${queryString}` : '/rules'

    window.location.href = url
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-hidden font-space">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Subtle emerald geometric patterns */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(34, 197, 94) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Enhanced floating geometric shapes */}
        <div
          className="absolute w-96 h-96 border border-emerald-500/10 rounded-full animate-float glow-effect opacity-20"
          style={{
            left: `${10 + mousePosition.x * 0.008}%`,
            top: `${10 + mousePosition.y * 0.008}%`,
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-64 h-64 border border-emerald-400/8 rounded-full animate-float opacity-15"
          style={{
            right: `${15 + mousePosition.x * 0.006}%`,
            bottom: `${15 + mousePosition.y * 0.006}%`,
            animationDelay: '3s'
          }}
        />
        <div
          className="absolute w-32 h-32 bg-emerald-500/5 rounded-full blur-xl animate-pulse"
          style={{
            left: `${50 + mousePosition.x * 0.004}%`,
            top: `${30 + mousePosition.y * 0.004}%`,
          }}
        />
        
        {/* Additional ambient orbs */}
        <div
          className="absolute w-48 h-48 bg-emerald-400/3 rounded-full blur-2xl animate-float"
          style={{
            right: `${30 + mousePosition.x * 0.003}%`,
            top: `${20 + mousePosition.y * 0.003}%`,
            animationDelay: '1.5s'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-mono group-hover:scale-110 transition-transform duration-300 pulse-emerald">
              <Image
                src="/image.png"
                alt="Augment Code Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover logo-visible"
                priority
              />
            </div>
            <span className="text-3xl font-black visible-text font-code tracking-wider text-shadow-emerald">
              augmentcode
            </span>
          </div>

          {/* Enhanced Navigation Container */}
          <nav className="hidden md:flex items-center">
            <div className="nav-mono p-1.5">
              <Link
                href="/rules"
                className="group relative px-5 py-2.5 rounded-xl font-semibold visible-text transition-all duration-300 hover:scale-105 font-space"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Rules</span>
              </Link>

              <Link
                href="/mcp"
                className="group relative px-5 py-2.5 rounded-xl font-semibold visible-text transition-all duration-300 hover:scale-105 font-space"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">MCP</span>
              </Link>

              <Link
                href="/generate"
                className="group relative px-5 py-2.5 rounded-xl font-semibold visible-text transition-all duration-300 hover:scale-105 font-space"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Generate</span>
              </Link>

              <a
                href="https://augment.community"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 btn-emerald ml-2"
              >
                <Users className="w-4 h-4" />
                <span>Community</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <div className="nav-mono p-3">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white rounded-full"></div>
                <div className="w-full h-0.5 bg-white rounded-full"></div>
                <div className="w-full h-0.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">

          {/* Enhanced Hero Container */}
          <div className="relative">
            {/* Hero Background with subtle emerald glow */}
            <div className="hero-mono" />

            {/* Content */}
            <div className="relative p-12 md:p-16 text-center space-y-12">
              {/* Main Hero */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight font-space">
                    <span className="inline-block visible-text animate-slide-up text-shadow-lg">
                      Join the
                    </span>
                    <br />
                    <span className="inline-block gradient-text force-visible animate-slide-up shimmer">
                      Augment Community
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-delay font-space">
                    Discover powerful coding rules and cutting-edge patterns
                  </p>
                </div>

                {/* Enhanced Search Bar */}
                <div className="max-w-2xl mx-auto animate-scale-in">
                  <div className="relative group">
                    <div className="search-mono p-1.5">
                      <div className="flex items-center">
                        <Search className="ml-5 text-emerald-400 w-6 h-6" />
                        <input
                          type="text"
                          placeholder="Search rules, patterns, frameworks..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 px-4 py-4 bg-transparent visible-text placeholder-zinc-500 focus:outline-none text-lg font-space"
                        />
                        <button className="btn-emerald">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-delay-2">
                  <Link
                    href="/rules"
                    className="group relative inline-flex items-center space-x-3 btn-emerald"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-lg font-space">Explore Rules</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    href="/mcp"
                    className="group inline-flex items-center space-x-3 btn-mono-outline"
                  >
                    <Zap className="w-5 h-5" />
                    <span className="text-lg font-space">MCP Integration</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Featured Rules */}
          <div className="space-y-12 animate-fade-in-delay-3 mt-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold visible-text font-space">
                Featured <span className="text-emerald-400">Rules</span>
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl mx-auto font-space">
                Handpicked coding patterns that will transform your development workflow
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredRules.map((rule, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transform transition-transform duration-200 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${rule.delay}s both`
                  }}
                  onClick={() => handleRuleClick(rule)}
                >
                  {/* Enhanced Card with Fixed Height */}
                  <div className="card-emerald h-full min-h-[160px] flex flex-col">
                    {/* Icon with emerald glow */}
                    <div className="w-10 h-10 bg-zinc-800 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3 text-emerald-400 shadow-mono group-hover:scale-110 transition-all duration-300 group-hover:text-emerald-300">
                      {rule.icon}
                    </div>

                    {/* Content - Flex grow to fill space */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-sm font-bold visible-text mb-2 group-hover:text-emerald-200 transition-colors duration-300 font-space">
                        {rule.title}
                      </h3>

                      <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 font-space flex-1">
                        {rule.description}
                      </p>

                      {/* Enhanced Arrow - Always at bottom */}
                      <div className="mt-3 flex justify-end">
                        <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 group-hover:scale-110">
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced View All Button */}
            <div className="text-center pt-8">
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-2 btn-mono-outline"
              >
                <span className="text-sm font-space">View All Rules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 p-8 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-400 text-lg flex items-center justify-center space-x-2 font-space">
            <span>© 2025 augmentcode.in. Built with</span>
            <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span>by the Augment community.</span>
          </p>
        </div>
      </footer>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 1.2s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 1.2s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeInUp 1.2s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeInUp 1.2s ease-out 0.9s both;
        }

        .animate-slide-up {
          animation: slideUp 1.4s ease-out 0.2s both;
        }

        .animate-scale-in {
          animation: scaleIn 1.2s ease-out 0.5s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  )
}
