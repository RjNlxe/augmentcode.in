'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Users, Clock, Sparkles, Code, Brain, Rocket, Server } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function MCPPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden font-space">
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
            <Link href="/generate" className="text-zinc-400 hover:text-emerald-400 transition-colors font-space">Generate</Link>
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

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Coming Soon Container */}
          <div className="relative">
            {/* Hero Background with subtle emerald glow */}
            <div className="hero-mono" />

            {/* Content */}
            <div className="relative p-12 md:p-16 space-y-12">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Server className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight font-space">
                    <span className="inline-block visible-text animate-slide-up text-shadow-lg">
                      Best MCP Servers
                    </span>
                    <br />
                    <span className="inline-block gradient-text force-visible animate-slide-up shimmer">
                      Coming Soon
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-delay font-space">
                    We are bringing the best MCP servers to the community.
                    Get ready for powerful Model Context Protocol integrations and enhanced AI workflows.
                  </p>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-delay-2">
                  <div className="card-emerald text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Server className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Curated Servers</h3>
                    <p className="text-sm text-zinc-400">Hand-picked MCP servers for optimal performance</p>
                  </div>

                  <div className="card-emerald text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Community Driven</h3>
                    <p className="text-sm text-zinc-400">Built by developers, for developers</p>
                  </div>

                  <div className="card-emerald text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Rocket className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Production Ready</h3>
                    <p className="text-sm text-zinc-400">Enterprise-grade MCP server solutions</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delay-3">
                  <Link
                    href="/rules"
                    className="group relative inline-flex items-center space-x-3 btn-emerald"
                  >
                    <Code className="w-5 h-5" />
                    <span className="text-lg font-space">Explore Rules</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    href="/generate"
                    className="group inline-flex items-center space-x-3 btn-mono-outline"
                  >
                    <Brain className="w-5 h-5" />
                    <span className="text-lg font-space">Generate PRD</span>
                  </Link>
                </div>

                {/* Notify Section */}
                <div className="mt-12 p-6 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl animate-fade-in-delay-3">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Stay Updated</span>
                  </div>
                  <p className="text-zinc-300 text-sm mb-4">
                    Be the first to know when our curated MCP servers launch
                  </p>
                  <a
                    href="https://augment.community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Users className="w-4 h-4" />
                    <span>Join Community</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-8 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-400 text-lg flex items-center justify-center space-x-2 font-space">
            <span>© 2025 augmentcode.in. Best MCP servers</span>
            <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span>coming soon.</span>
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
      `}</style>
    </div>
  )
}
