'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Code, Zap, Users, BookOpen, ArrowRight, Star, Filter } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Best Rules Collection",
      description: "Discover the most powerful Augment Code rules that make coding 10x faster",
      link: "/rules"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Find exactly what you need with our intelligent search and filtering system",
      link: "/rules"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "MCP Integration",
      description: "Seamless Model Context Protocol integration for enhanced AI capabilities",
      link: "/mcp"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by developers, for developers. Share and discover the best practices",
      link: "/community"
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white font-space">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-space">
              <span className="gradient-text shimmer">Augment Code</span>
              <br />
              <span className="text-white">Community Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              The ultimate destination for Augment Code rules, best practices, and community knowledge.
              Discover powerful rules that make your coding experience extraordinary.
            </p>

            {/* Quick Search */}
            <motion.div
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search rules, languages, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 px-6 py-2 rounded-xl transition-colors">
                  Search
                </button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 glow-effect"
              >
                <span>Explore Rules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/mcp"
                className="group inline-flex items-center space-x-2 glass-effect hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 border border-primary-500/30"
              >
                <span>MCP Integration</span>
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to master Augment Code and boost your productivity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-effect p-8 rounded-2xl text-center group hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-primary-400 mb-4 group-hover:text-primary-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {feature.description}
                </p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-300">Powerful Rules</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-300">Programming Languages</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-gray-300">Community Members</div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
