'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import Image from 'next/image'
import { Download, X, BookOpen, Zap, Code2 } from 'lucide-react'

export default function MainNavigation() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
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

              <Link
                href="/projects"
                className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Projects</span>
              </Link>

              {user && (
                <Link
                  href="/my-projects"
                  className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">My Projects</span>
                </Link>
              )}

              {user?.is_admin && (
                <Link
                  href="/admin"
                  className="group relative px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30 whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Admin</span>
                </Link>
              )}

              {!user && (
                <Link
                  href="/login"
                  className="group relative px-5 py-2.5 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Sign In</span>
                </Link>
              )}

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
                  href="/projects"
                  className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Code2 className="w-5 h-5" />
                    <span>Projects</span>
                  </div>
                </Link>

                {user && (
                  <Link
                    href="/my-projects"
                    className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <Code2 className="w-5 h-5" />
                      <span>My Projects</span>
                    </div>
                  </Link>
                )}

                {user?.is_admin && (
                  <Link
                    href="/admin"
                    className="block px-4 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors border border-emerald-500/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <Code2 className="w-5 h-5" />
                      <span>Admin</span>
                    </div>
                  </Link>
                )}

                {!user && (
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-xl text-white hover:bg-emerald-500/20 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <Code2 className="w-5 h-5" />
                      <span>Sign In</span>
                    </div>
                  </Link>
                )}

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
    </>
  )
}
