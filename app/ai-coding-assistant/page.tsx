import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Coding Assistant - Best AI Programming Tools 2025 | Augment Code',
  description: '🚀 #1 AI Coding Assistant! Advanced AI programming tools, smart code completion, AI code generation. Free AI developer tools for 10x productivity. Try Augment Code AI Assistant now!',
  keywords: ['AI coding assistant', 'AI programming tools', 'AI code completion', 'AI code generator', 'smart programming assistant'],
  alternates: {
    canonical: 'https://augmentcode.in/ai-coding-assistant',
  },
}

export default function AICodingAssistant() {
  return (
    <div className="min-h-screen bg-dark-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 gradient-text">
          AI Coding Assistant - Augment Code
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Experience the world&apos;s most advanced AI coding assistant. Boost your programming productivity with intelligent code completion, smart suggestions, and AI-powered development tools.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-primary-400">AI Code Completion</h2>
            <p className="text-gray-300">
              Advanced AI-powered code completion that understands context and provides intelligent suggestions for faster development.
            </p>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-accent-400">Smart Programming Assistant</h2>
            <p className="text-gray-300">
              Your AI programming companion that helps write better code, debug issues, and optimize performance automatically.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.augmentcode.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-4 rounded-full font-semibold text-white hover:from-primary-400 hover:to-accent-400 transition-all duration-300"
          >
            Try AI Coding Assistant Free
          </a>
        </div>
      </div>
    </div>
  )
}
