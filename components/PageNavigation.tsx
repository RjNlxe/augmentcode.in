'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export default function PageNavigation() {
  const { user } = useAuth()

  return (
    <nav className="bg-zinc-900/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg shadow-emerald-500/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-sm font-space">AC</span>
              </div>
              <span className="text-xl font-bold text-white font-space tracking-wide">
                augmentcode
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center">
            <div className="flex items-center bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5 shadow-lg shadow-emerald-500/10">
              <Link
                href="/"
                className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Home</span>
              </Link>

              <Link
                href="/projects"
                className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Projects</span>
              </Link>

              {user && (
                <Link
                  href="/my-projects"
                  className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">My Projects</span>
                </Link>
              )}

              {user?.is_admin && (
                <Link
                  href="/admin"
                  className="group relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Admin</span>
                </Link>
              )}

              {!user && (
                <Link
                  href="/login"
                  className="group relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
