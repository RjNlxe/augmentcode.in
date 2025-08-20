import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="relative z-10 text-center">
        <div className="w-24 h-24 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-emerald-400 font-bold text-2xl font-space">404</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 font-space">
          Page Not Found
        </h1>
        <p className="text-zinc-400 mb-8 font-space max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-space shadow-lg shadow-emerald-500/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
