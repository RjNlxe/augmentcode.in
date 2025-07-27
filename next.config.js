/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimize for Vercel free tier
  output: 'standalone',

  // Webpack optimizations for better chunk loading
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunk splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Bundle all rules together to avoid chunk loading issues
          rules: {
            name: 'rules',
            chunks: 'all',
            test: /[\\/]rules[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Bundle components together
          components: {
            name: 'components',
            chunks: 'all',
            test: /[\\/]components[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Bundle lib together
          lib: {
            name: 'lib',
            chunks: 'all',
            test: /[\\/]lib[\\/]/,
            priority: 20,
            enforce: true,
          },
          // Common vendor chunks
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      }
    }
    return config
  },

  // SEO and Performance Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/copilot-alternative',
        destination: '/github-copilot-alternative',
        permanent: true,
      }
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/ai-assistant',
        destination: '/ai-coding-assistant',
      },
      {
        source: '/programming-assistant',
        destination: '/ai-coding-assistant',
      }
    ]
  }
}

module.exports = nextConfig
