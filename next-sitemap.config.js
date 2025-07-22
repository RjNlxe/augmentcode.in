/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://augmentcode.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0.5,
      },
    ],
    additionalSitemaps: [
      'https://augmentcode.in/sitemap.xml',
      'https://augmentcode.in/feed.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7
    let changefreq = 'weekly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('ai-coding-assistant') || path.includes('github-copilot-alternative')) {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.includes('programming-tools') || path.includes('developer-tools')) {
      priority = 0.8
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/ai-coding-assistant'),
    await config.transform(config, '/github-copilot-alternative'),
    await config.transform(config, '/programming-tools'),
    await config.transform(config, '/developer-tools'),
    await config.transform(config, '/ai-programming-tools'),
    await config.transform(config, '/best-ai-coding-assistant'),
    await config.transform(config, '/free-ai-developer-tools'),
  ],
}
