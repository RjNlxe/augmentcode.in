import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Main Pages - Ultra High Priority
    {
      url: 'https://augmentcode.in',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },

    // AI Keywords Pages - Maximum Priority
    {
      url: 'https://augmentcode.in/ai-coding-assistant',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: 'https://augmentcode.in/ai-programming-tools',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: 'https://augmentcode.in/ai-developer-tools',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: 'https://augmentcode.in/ai-code-completion',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: 'https://augmentcode.in/ai-programming-assistant',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },

    // Programming Tools Pages
    {
      url: 'https://augmentcode.in/programming-tools',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://augmentcode.in/coding-tools',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://augmentcode.in/developer-tools',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://augmentcode.in/code-completion',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Competitive Pages
    {
      url: 'https://augmentcode.in/github-copilot-alternative',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://augmentcode.in/tabnine-alternative',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://augmentcode.in/best-ai-coding-assistant',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // Community & Resources
    {
      url: 'https://augmentcode.in/developer-community',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://augmentcode.in/coding-tutorials',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://augmentcode.in/programming-tips',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Free Tools Pages
    {
      url: 'https://augmentcode.in/free-ai-coding-assistant',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://augmentcode.in/free-programming-tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://augmentcode.in/free-developer-tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
