'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Code2, Sparkles, ArrowRight, Heart, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import CountdownTimer from '@/components/CountdownTimer'
import AnimatedBackground from '@/components/AnimatedBackground'
import FloatingElements from '@/components/FloatingElements'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Suspense fallback={<div className="fixed inset-0 bg-dark-950" />}>
        <AnimatedBackground />
        <FloatingElements />
      </Suspense>
      
      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 md:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Image
                src="/image.png"
                alt="Augment Code Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text">
              augmentcode
            </span>
          </motion.div>
          

        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Hero Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >

            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text text-shadow-lg">
                Launching Soon
              </span>
              <br />
              <span className="text-white text-shadow text-3xl md:text-4xl lg:text-5xl">
                Augment Code Community Platform
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Something special for Augment Code users.
              <br />
              Created by the community, for the community.
            </p>
          </motion.div>



          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Suspense fallback={<div className="h-32 bg-dark-900 rounded-2xl animate-pulse" />}>
              <CountdownTimer targetDate="2025-07-27T21:30:00+05:30" />
            </Suspense>
          </motion.div>

          {/* Visit Augment Code Button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href="https://www.augmentcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 glow-effect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>Visit Augment Code</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>


        </div>
      </div>



      {/* Footer */}
      <motion.footer 
        className="relative z-10 p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 augmentcode.in. Built with ❤️ by Augment fans.
          </p>
        </div>
      </motion.footer>
    </main>
  )
}
