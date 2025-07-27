'use client'

import { motion } from 'framer-motion'
import { Zap, Code, Database, Cloud, Shield, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function MCPPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized protocol for real-time AI model communication"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with robust error handling"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Context Aware",
      description: "Maintains conversation context across multiple interactions"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Native",
      description: "Built for modern cloud infrastructure and scaling"
    }
  ]

  const integrations = [
    {
      name: "OpenAI GPT-4",
      status: "Active",
      description: "Full integration with OpenAI's latest models"
    },
    {
      name: "Anthropic Claude",
      status: "Active", 
      description: "Seamless Claude integration for enhanced reasoning"
    },
    {
      name: "Google Gemini",
      status: "Beta",
      description: "Early access to Google's multimodal AI"
    },
    {
      name: "Local Models",
      status: "Coming Soon",
      description: "Support for locally hosted AI models"
    }
  ]

  return (
    <main className="min-h-screen bg-dark-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">MCP Integration</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Model Context Protocol - The future of AI model communication.
              Seamlessly connect with multiple AI providers through a unified interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 glow-effect">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <Link
                href="https://github.com/modelcontextprotocol/specification"
                target="_blank"
                className="group inline-flex items-center space-x-2 glass-effect hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 border border-primary-500/30"
              >
                <span>View Specification</span>
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
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
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why MCP?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Model Context Protocol revolutionizes how AI models communicate and share context
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-effect p-8 rounded-2xl text-center group hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-primary-400 mb-4 group-hover:text-primary-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Status */}
      <section className="py-20 px-6 md:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              AI Model Integrations
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with the world's leading AI models through our unified MCP interface
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                className="glass-effect p-6 rounded-2xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{integration.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    integration.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400'
                      : integration.status === 'Beta'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-gray-400">{integration.description}</p>
                
                {integration.status === 'Active' && (
                  <div className="flex items-center space-x-2 mt-4 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Ready to use</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Simple Integration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started with MCP in just a few lines of code
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="glass-effect p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">MCP Client Example</h3>
                <button className="text-primary-400 hover:text-primary-300 transition-colors">
                  <Code className="w-5 h-5" />
                </button>
              </div>
              
              <pre className="bg-dark-900 p-6 rounded-lg text-sm text-gray-300 overflow-x-auto">
                <code>{`import { MCPClient } from '@augmentcode/mcp'

// Initialize MCP client
const client = new MCPClient({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY
})

// Send a message with context
const response = await client.chat({
  message: "Help me optimize this code",
  context: {
    language: "javascript",
    codebase: "./src",
    rules: ["performance", "readability"]
  }
})

console.log(response.message)
// AI response with full context awareness`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers already using MCP to enhance their AI workflows
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 glow-effect">
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <Link
                href="/rules"
                className="group inline-flex items-center space-x-2 glass-effect hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 border border-primary-500/30"
              >
                <span>Browse Rules</span>
                <Code className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
