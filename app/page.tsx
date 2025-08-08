'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Search, Code2, ArrowRight, Zap, BookOpen, Palette, Brain, Globe, Rocket, Heart, Users, X, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Preload rules on client-side for instant navigation
import { getAllRules, getLanguages, getCategories } from '@/lib/rules-loader'

const Home = memo(function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Preload rules data on component mount for instant navigation
  useEffect(() => {
    // Trigger preload of all rules data
    getAllRules()
    getLanguages()
    getCategories()
  }, [])

  // Optimized mouse tracking with throttling - only on client
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isClient) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

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
  }, [handleMouseMove, isClient])

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
        
        {/* Enhanced floating geometric shapes - only render dynamic positioning on client */}
        <div
          className="absolute w-96 h-96 border border-emerald-500/10 rounded-full animate-float glow-effect opacity-20"
          style={isClient ? {
            left: `${10 + mousePosition.x * 0.008}%`,
            top: `${10 + mousePosition.y * 0.008}%`,
            animationDelay: '0s'
          } : {
            left: '10%',
            top: '10%',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-64 h-64 border border-emerald-400/8 rounded-full animate-float opacity-15"
          style={isClient ? {
            right: `${15 + mousePosition.x * 0.006}%`,
            bottom: `${15 + mousePosition.y * 0.006}%`,
            animationDelay: '3s'
          } : {
            right: '15%',
            bottom: '15%',
            animationDelay: '3s'
          }}
        />
        <div
          className="absolute w-32 h-32 bg-emerald-500/5 rounded-full blur-xl animate-pulse"
          style={isClient ? {
            left: `${50 + mousePosition.x * 0.004}%`,
            top: `${30 + mousePosition.y * 0.004}%`,
          } : {
            left: '50%',
            top: '30%',
          }}
        />

        {/* Additional ambient orbs */}
        <div
          className="absolute w-48 h-48 bg-emerald-400/3 rounded-full blur-2xl animate-float"
          style={isClient ? {
            right: `${30 + mousePosition.x * 0.003}%`,
            top: `${20 + mousePosition.y * 0.003}%`,
            animationDelay: '1.5s'
          } : {
            right: '30%',
            top: '20%',
            animationDelay: '1.5s'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 group min-w-0 flex-1">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-mono group-hover:scale-110 transition-transform duration-300 pulse-emerald flex-shrink-0">
              <Image
                src="/image.png"
                alt="Augment Code Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover logo-visible"
                priority
              />
            </div>
            <span className="text-lg sm:text-2xl md:text-3xl font-black visible-text font-code tracking-wider text-shadow-emerald truncate">
              augmentcode
            </span>
          </div>

          {/* Enhanced Navigation Container - Clean & Elegant */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-zinc-900/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5 shadow-lg shadow-emerald-500/10">
              <Link
                href="/rules"
                className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Rules</span>
              </Link>

              <Link
                href="/mcp"
                className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">MCP</span>
              </Link>

              <Link
                href="/generate"
                className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Generate</span>
              </Link>

              {/* Separator */}
              <div className="w-px h-6 bg-emerald-500/20 mx-2" />

              <Link
                href="/vsx"
                className="group relative px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30 whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Extension</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mono p-2 sm:p-3 touch-target"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-64 h-full bg-zinc-950 border-l border-emerald-500/20 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="space-y-4">
                <Link
                  href="/rules"
                  className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Rules</span>
                  </div>
                </Link>

                <Link
                  href="/mcp"
                  className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span>MCP</span>
                  </div>
                </Link>

                <Link
                  href="/generate"
                  className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Code2 className="w-5 h-5" />
                    <span>Generate</span>
                  </div>
                </Link>

                <Link
                  href="/vsx"
                  className="block px-4 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors border border-emerald-500/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span>Download Extension</span>
                  </div>
                </Link>

              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto w-full">

          {/* Enhanced Hero Container */}
          <div className="relative">
            {/* Hero Background with subtle emerald glow */}
            <div className="hero-mono" />

            {/* Content */}
            <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 text-center space-y-8 sm:space-y-10 md:space-y-12">
              {/* Main Hero */}
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight font-space">
                    <span className="inline-block visible-text animate-slide-up text-shadow-lg">
                      Join the
                    </span>
                    <br />
                    <span className="inline-block gradient-text force-visible animate-slide-up shimmer">
                      Augment Community
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-delay font-space px-4">
                    Discover powerful coding rules and cutting-edge patterns
                  </p>
                </div>

                {/* Enhanced Search Bar */}
                <div className="max-w-2xl mx-auto animate-scale-in px-4">
                  <div className="relative group">
                    <div className="search-mono p-1 sm:p-1.5">
                      <div className="flex items-center">
                        <Search className="ml-3 sm:ml-5 text-emerald-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder="Search rules, patterns, frameworks..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 px-2 sm:px-4 py-3 sm:py-4 bg-transparent visible-text placeholder-zinc-500 focus:outline-none text-sm sm:text-base md:text-lg font-space min-w-0"
                        />
                        <button className="btn-emerald text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 ml-2">
                          <span className="hidden sm:inline">Search</span>
                          <span className="sm:hidden">Go</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="space-y-6 sm:space-y-8 pt-6 sm:pt-8 animate-fade-in-delay-2 px-4">
                  {/* Primary CTA - Download Extension */}
                  <div className="flex justify-center">
                    <Link
                      href="/vsx"
                      className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-emerald-500/30 text-base sm:text-lg md:text-xl border-2 border-emerald-400/20"
                    >
                      <Download className="w-6 h-6 sm:w-7 sm:h-7" />
                      <span className="font-space font-black">Download VSCode Extension</span>
                      <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>

                  {/* Secondary CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <Link
                      href="/rules"
                      className="group relative inline-flex items-center space-x-3 bg-zinc-800/60 hover:bg-zinc-700/60 border border-emerald-500/30 hover:border-emerald-400/50 text-emerald-300 hover:text-emerald-200 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/20 text-sm sm:text-base backdrop-blur-sm"
                    >
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="font-space">Explore Coding Rules</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    <Link
                      href="/mcp"
                      className="group relative inline-flex items-center space-x-3 bg-zinc-800/40 hover:bg-zinc-700/40 border border-zinc-600/50 hover:border-zinc-500/70 text-zinc-300 hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base backdrop-blur-sm"
                    >
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="font-space">MCP Servers</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Featured Rules */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12 animate-fade-in-delay-3 mt-12 sm:mt-14 md:mt-16">
            <div className="text-center space-y-3 sm:space-y-4 px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold visible-text font-space">
                Featured <span className="text-emerald-400">Rules</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-space">
                Handpicked coding patterns that will transform your development workflow
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 px-4">
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
                  <div className="card-emerald h-full min-h-[140px] sm:min-h-[160px] flex flex-col">
                    {/* Icon with emerald glow */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 hover:bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 text-emerald-400 shadow-mono group-hover:scale-110 transition-all duration-300 group-hover:text-emerald-300">
                      {rule.icon}
                    </div>

                    {/* Content - Flex grow to fill space */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xs sm:text-sm font-bold visible-text mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors duration-300 font-space line-clamp-2">
                        {rule.title}
                      </h3>

                      <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 font-space flex-1 line-clamp-3">
                        {rule.description}
                      </p>

                      {/* Enhanced Arrow - Always at bottom */}
                      <div className="mt-2 sm:mt-3 flex justify-end">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 group-hover:scale-110">
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced View All Button */}
            <div className="text-center pt-6 sm:pt-8 px-4">
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-2 btn-mono-outline text-sm sm:text-base"
              >
                <span className="font-space">View All Rules</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 p-4 sm:p-6 md:p-8 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-zinc-400 text-sm sm:text-base md:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 font-space">
            <span>© 2025 augmentcode.in. Built with</span>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-pulse" />
              <span>by the Augment community.</span>
            </div>
          </div>
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
})

export default Home
