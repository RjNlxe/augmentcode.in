'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

import Link from 'next/link'

export default function AdminAccessPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Check admin credentials
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        await login('Admin', undefined, email)
        router.push('/admin')
      } else {
        throw new Error('Invalid admin credentials')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid admin credentials')
    } finally {
      setLoading(false)
    }
  }

  // Redirect if already logged in as admin
  if (user?.is_admin) {
    router.push('/admin')
    return null
  }

  // Redirect non-admin users
  if (user && !user.is_admin) {
    router.push('/projects')
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white font-space">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-space">
              Restricted access for administrators only
            </p>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl py-8 px-6 shadow-2xl shadow-emerald-500/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-emerald-300 font-space">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white font-space"
                  placeholder="admin@augmentcode.in"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-emerald-300 font-space">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white font-space"
                  placeholder="Enter admin password"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <div className="text-red-400 text-sm font-space">{error}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-300 font-space"
              >
                {loading ? 'Verifying...' : 'Access Admin Panel'}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-emerald-500/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900/60 text-zinc-400 font-space">
                    Authorized personnel only
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-500 text-center font-space">
              Only admin@augmentcode.in has access to this panel.
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/projects"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium font-space transition-colors duration-300"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
