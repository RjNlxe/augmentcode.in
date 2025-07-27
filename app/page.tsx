'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Search, Code2, ArrowRight, Zap, BookOpen, Palette, Brain, Globe, Rocket, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
      delay: 0.1
    },
    {
      title: "Deep Learning",
      description: "Advanced AI/ML patterns and neural networks",
      icon: <Brain className="w-5 h-5" />,
      delay: 0.2
    },
    {
      title: "Django Framework",
      description: "Scalable Python web development practices",
      icon: <Globe className="w-5 h-5" />,
      delay: 0.3
    },
    {
      title: "Chrome Extensions",
      description: "Modern browser extension development",
      icon: <Rocket className="w-5 h-5" />,
      delay: 0.4
    },
    {
      title: "Next.js Mastery",
      description: "Performance-first React applications",
      icon: <Zap className="w-5 h-5" />,
      delay: 0.5
    },
    {
      title: "Python & Rust",
      description: "High-performance systems programming",
      icon: <Code2 className="w-5 h-5" />,
      delay: 0.6
    }
  ], [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.2),transparent_50%)]" />

        {/* Floating Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
            transform: 'translate(50%, 50%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/image.png"
                alt="Augment Code Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              augmentcode
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/rules" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
              Rules
            </Link>
            <Link href="/mcp" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
              MCP
            </Link>
            <Link href="/home" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 px-6 py-3 rounded-2xl text-white transition-all duration-300 hover:scale-105 shadow-lg font-medium">
              Platform
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">

          {/* Glass Hero Container */}
          <div className="relative">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 rounded-3xl" />

            {/* Content */}
            <div className="relative p-12 md:p-16 text-center space-y-12">
              {/* Main Hero */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                    <span className="inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                      Join the
                    </span>
                    <br />
                    <span className="inline-block text-white animate-slide-up">
                      Augment Community
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-delay">
                    Discover powerful coding rules and cutting-edge patterns
                  </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto animate-scale-in">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5">
                      <div className="flex items-center">
                        <Search className="ml-5 text-emerald-400 w-6 h-6" />
                        <input
                          type="text"
                          placeholder="Search rules, patterns, frameworks..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                        />
                        <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-delay-2">
                  <Link
                    href="/rules"
                    className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-lg">Explore Rules</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    href="/mcp"
                    className="group inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105"
                  >
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg">MCP Integration</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>



          {/* Featured Rules */}
          <div className="space-y-12 animate-fade-in-delay-3">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Featured <span className="text-gray-400">Rules</span>
              </h2>
              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                Handpicked coding patterns that will transform your development workflow
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredRules.map((rule, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${rule.delay}s both`
                  }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105" />

                  {/* Card */}
                  <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center mb-3 text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                      {rule.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-sm font-bold text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
                      {rule.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {rule.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-3 flex justify-end">
                      <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center pt-8">
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/30 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm">View All Rules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 p-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-lg flex items-center justify-center space-x-2">
            <span>© 2025 augmentcode.in. Built with</span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span>by the Augment community.</span>
          </p>
        </div>
      </footer>

      {/* Custom CSS Animations */}
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
          animation: fadeInUp 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .animate-slide-up {
          animation: slideUp 1.2s ease-out 0.2s both;
        }

        .animate-scale-in {
          animation: scaleIn 1s ease-out 0.5s both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </main>
  )
}
