'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-6">
      <motion.div
        className="text-center space-y-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400">
            We encountered an unexpected error. Please try again.
          </p>
        </div>
        
        <motion.button
          onClick={reset}
          className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-full font-semibold text-white transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
