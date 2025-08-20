'use client'


import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import LoginForm from '@/components/LoginForm'

import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()

  const handleLoginSuccess = () => {
    router.push('/projects')
  }

  // Redirect if already logged in
  if (user) {
    router.push('/projects')
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

      <div className="relative z-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-400 font-bold text-xl font-space">AC</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-space">
            Sign in to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Augment Code</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400 font-space">
            Join the community and share your projects
          </p>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl py-8 px-6 shadow-2xl shadow-emerald-500/10">
          <LoginForm onSuccess={handleLoginSuccess} />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-500/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900/60 text-zinc-400 font-space">
                  Simple authentication
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-zinc-500 text-center font-space">
            No password required. Just enter your name and optional X profile.
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium font-space transition-colors duration-300"
          >
            Browse projects without signing in →
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
