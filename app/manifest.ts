import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Augment Code - #1 AI Coding Assistant | Best AI Programming Tools 2025',
    short_name: 'Augment Code AI',
    description: '🚀 World\'s #1 AI Coding Assistant! 🔥 Best AI Programming Tools 2025 ⭐ Free AI Developer Tools ⚡ AI Code Completion 🎯 Smart Programming Assistant 💻 Join 1M+ Developers!',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#22c55e',
    orientation: 'portrait',
    categories: ['productivity', 'developer', 'utilities', 'education'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ],
    shortcuts: [
      {
        name: 'AI Coding Assistant',
        short_name: 'AI Assistant',
        description: 'Access AI coding assistant tools',
        url: '/ai-coding-assistant',
        icons: [{ src: '/shortcut-ai.png', sizes: '96x96' }]
      },
      {
        name: 'Programming Tools',
        short_name: 'Tools',
        description: 'Access programming tools',
        url: '/programming-tools',
        icons: [{ src: '/shortcut-tools.png', sizes: '96x96' }]
      }
    ]
  }
}
