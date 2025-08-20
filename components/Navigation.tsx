'use client'

import { useAuth } from '@/lib/auth-context'
import { User, LogOut, Settings, FolderOpen, Home } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <nav className="bg-zinc-900/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg shadow-emerald-500/5">
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
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5 shadow-lg shadow-emerald-500/10">
              <Link
                href="/"
                className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <Home size={16} />
                  <span>Home</span>
                </div>
              </Link>

              <Link
                href="/projects"
                className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <FolderOpen size={16} />
                  <span>Projects</span>
                </div>
              </Link>

              {user && (
                <Link
                  href="/my-projects"
                  className="group relative px-4 py-2 rounded-xl font-semibold text-white/90 hover:text-white transition-all duration-300 hover:scale-105 font-space text-sm"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-2">
                    <User size={16} />
                    <span>My Projects</span>
                  </div>
                </Link>
              )}

              {user?.is_admin && (
                <>
                  <div className="w-px h-6 bg-emerald-500/20 mx-2" />
                  <Link
                    href="/admin"
                    className="group relative px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30"
                  >
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2">
                      <Settings size={16} />
                      <span>Admin</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 text-white/90 hover:text-white hover:bg-zinc-800/60 transition-all duration-300 font-space"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-500/20 py-2 z-50">
                    <div className="px-4 py-3 border-b border-emerald-500/20">
                      <p className="text-sm font-medium text-white font-space">
                        {user.name}
                      </p>
                      {user.x_profile && (
                        <p className="text-xs text-emerald-400 font-space">
                          {user.x_profile}
                        </p>
                      )}
                      {user.is_admin && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-lg border border-emerald-500/30 font-space">
                          Admin
                        </span>
                      )}
                    </div>

                    <Link
                      href="/my-projects"
                      className="block px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-emerald-500/10 rounded-lg mx-2 transition-all duration-200 font-space"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Projects
                    </Link>

                    {user.is_admin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 rounded-lg mx-2 transition-all duration-200 font-space"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    {!user.is_admin && (
                      <Link
                        href="/a-access"
                        className="block px-4 py-2 text-sm text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-lg mx-2 transition-all duration-200 font-space"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Access
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-red-500/10 rounded-lg mx-2 transition-all duration-200 flex items-center gap-2 font-space"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="group relative px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-space text-sm border border-emerald-500/30"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-emerald-500/20 bg-zinc-900/60 backdrop-blur-sm">
        <div className="px-4 py-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 text-white/90 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all duration-200 font-space"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="block px-3 py-2 text-white/90 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all duration-200 font-space"
          >
            Projects
          </Link>
          {user && (
            <Link
              href="/my-projects"
              className="block px-3 py-2 text-white/90 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all duration-200 font-space"
            >
              My Projects
            </Link>
          )}
          {user?.is_admin && (
            <Link
              href="/admin"
              className="block px-3 py-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 font-space"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
