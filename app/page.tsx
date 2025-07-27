'use client'

import { useState } from 'react'
import { Search, Code2, Sparkles, ArrowRight, Star, Users, Zap, BookOpen, Palette, Brain, Globe, Chrome } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const featuredRules = [
    {
      title: "Design System Rules",
      description: "Beautiful, consistent UI components and design patterns",
      icon: <Palette className="w-6 h-6" />,
      color: "from-pink-500 to-purple-600",
      category: "Design"
    },
    {
      title: "Deep Learning Patterns",
      description: "Advanced AI/ML patterns and neural network architectures",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
      category: "AI/ML"
    },
    {
      title: "Django Best Practices",
      description: "Scalable Python web development with Django framework",
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      category: "Backend"
    },
    {
      title: "Chrome Extension Dev",
      description: "Modern browser extension development patterns",
      icon: <Chrome className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600",
      category: "Browser"
    },
    {
      title: "Next.js Optimization",
      description: "Performance-first React applications with Next.js",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-600",
      category: "Frontend"
    },
    {
      title: "Python & Rust Integration",
      description: "High-performance systems with Python and Rust",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-red-500 to-pink-600",
      category: "Systems"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.02)_50%,transparent_75%)]" />

      {/* Header */}
      <header className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              augmentcode
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/rules" className="text-gray-300 hover:text-white transition-colors">
              Rules
            </Link>
            <Link href="/mcp" className="text-gray-300 hover:text-white transition-colors">
              MCP
            </Link>
            <Link href="/home" className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white transition-colors">
              Platform
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-16">

          {/* Main Hero */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Join the
              </span>
              <br />
              <span className="text-white">
                Augment Community
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Discover powerful coding rules, best practices, and cutting-edge patterns from the world's most innovative developers
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-emerald-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search rules, patterns, frameworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-dark-900/80 border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-xl text-white font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Rules</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/mcp"
                className="group inline-flex items-center space-x-3 bg-dark-800/50 hover:bg-dark-700/50 border border-emerald-500/30 hover:border-emerald-500/50 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
              >
                <Zap className="w-5 h-5 text-emerald-400" />
                <span>MCP Integration</span>
              </Link>
            </div>
          </div>



          {/* Featured Rules */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Rules & Patterns
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Handpicked coding rules and best practices from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRules.map((rule, index) => (
                <div
                  key={index}
                  className="group relative bg-dark-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${rule.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {rule.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {rule.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      {rule.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center pt-8">
              <Link
                href="/rules"
                className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors group"
              >
                <span>View All Rules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-400">Coding Rules</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
              <p className="text-gray-400">Developers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
              <p className="text-gray-400">Languages</p>
            </div>
          </div>
        </div>
      </div>



      {/* Footer */}
      <footer className="relative z-10 p-6 md:p-8 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 augmentcode.in. Built with ❤️ by the Augment community.
          </p>
        </div>
      </footer>
    </main>
  )
}
