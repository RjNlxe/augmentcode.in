'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

interface LoginFormProps {
  onSuccess?: () => void
  isAdmin?: boolean
}

export default function LoginForm({ onSuccess, isAdmin = false }: LoginFormProps) {
  const [name, setName] = useState('')
  const [xProfile, setXProfile] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(name, xProfile, isAdmin ? email : undefined)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-emerald-300 font-space">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white font-space"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="xProfile" className="block text-sm font-medium text-emerald-300 font-space">
          X Profile (optional)
        </label>
        <input
          type="text"
          id="xProfile"
          value={xProfile}
          onChange={(e) => setXProfile(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white font-space"
          placeholder="@username"
        />
      </div>

      {isAdmin && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-emerald-300 font-space">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={isAdmin}
            className="mt-1 block w-full px-3 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white font-space"
            placeholder="admin@augmentcode.in"
          />
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm font-space">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-300 font-space"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
