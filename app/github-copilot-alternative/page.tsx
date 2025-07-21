import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitHub Copilot Alternative - Better AI Coding Assistant | Augment Code',
  description: '🔥 Best GitHub Copilot Alternative! Augment Code offers superior AI coding assistance, better code completion, and free AI programming tools. Switch to the #1 AI coding assistant today!',
  keywords: ['github copilot alternative', 'better than github copilot', 'free github copilot alternative', 'AI coding assistant', 'copilot competitor'],
  alternates: {
    canonical: 'https://augmentcode.in/github-copilot-alternative',
  },
}

export default function GitHubCopilotAlternative() {
  return (
    <div className="min-h-screen bg-dark-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 gradient-text">
          GitHub Copilot Alternative - Augment Code
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover why Augment Code is the superior alternative to GitHub Copilot. Better AI assistance, more features, and completely free for developers worldwide.
        </p>
        
        <div className="space-y-8">
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-primary-400">Why Choose Augment Code Over GitHub Copilot?</h2>
            <ul className="space-y-3 text-gray-300">
              <li>✅ <strong>100% Free</strong> - No subscription fees unlike GitHub Copilot</li>
              <li>✅ <strong>Better AI Models</strong> - More accurate code suggestions</li>
              <li>✅ <strong>Faster Performance</strong> - Lightning-fast code completion</li>
              <li>✅ <strong>More Languages</strong> - Support for 100+ programming languages</li>
              <li>✅ <strong>Privacy First</strong> - Your code stays private</li>
              <li>✅ <strong>Community Driven</strong> - Built by developers for developers</li>
            </ul>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-accent-400">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2">Feature</th>
                    <th className="py-2 text-primary-400">Augment Code</th>
                    <th className="py-2 text-gray-400">GitHub Copilot</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Price</td>
                    <td className="py-2 text-green-400">Free</td>
                    <td className="py-2 text-red-400">$10/month</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Code Quality</td>
                    <td className="py-2 text-green-400">Superior</td>
                    <td className="py-2 text-yellow-400">Good</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Speed</td>
                    <td className="py-2 text-green-400">Lightning Fast</td>
                    <td className="py-2 text-yellow-400">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.augmentcode.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-4 rounded-full font-semibold text-white hover:from-primary-400 hover:to-accent-400 transition-all duration-300"
          >
            Try Better Alternative Free
          </a>
        </div>
      </div>
    </div>
  )
}
