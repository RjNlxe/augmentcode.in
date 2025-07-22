import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Augment Code - #1 AI Coding Assistant | Best AI Programming Tools 2025 | Free AI Developer Tools | AI Code Completion | Smart Programming Assistant',
  description: '🚀 Augment Code - The World\'s #1 AI Coding Assistant! 🔥 Best AI Programming Tools 2025 ⭐ Free AI Developer Tools ⚡ AI Code Completion 🎯 Smart Programming Assistant 💻 AI Code Generator 🛠️ Developer Productivity Tools 📈 Boost Coding Speed 10x! Join 1M+ Developers Using AI Coding Tools. Download Free Now!',
  keywords: [
    // Primary AI Keywords (Ultra High Volume)
    'AI', 'artificial intelligence', 'AI tools', 'AI software', 'AI platform', 'AI assistant', 'AI helper',
    'AI coding assistant', 'AI programming assistant', 'AI code completion', 'AI code generator', 'AI developer tools',
    'AI programming tools', 'AI coding tools', 'AI development platform', 'AI code helper', 'AI pair programming',

    // Augment Code Brand Keywords
    'Augment Code', 'augmentcode', 'augment code ai', 'augment code assistant', 'augment code tools',
    'augment code platform', 'augment code community', 'augment code free', 'augment code download',

    // Programming & Coding Keywords
    'programming tools', 'coding tools', 'developer tools', 'development tools', 'programming assistant',
    'coding assistant', 'code completion', 'code generator', 'programming productivity', 'coding productivity',
    'developer productivity', 'programming help', 'coding help', 'programming software', 'coding software',

    // Technology Keywords
    'machine learning', 'deep learning', 'neural networks', 'natural language processing', 'automation',
    'productivity tools', 'software development', 'web development', 'app development', 'programming',

    // Competitive Keywords
    'github copilot alternative', 'tabnine alternative', 'kite alternative', 'codex alternative',
    'best ai coding assistant', 'best programming tools', 'best developer tools', 'best ai tools',

    // Long-tail Keywords
    'free ai coding assistant', 'best free programming tools', 'ai code completion free',
    'programming assistant free', 'ai developer tools free', 'coding tools for developers',
    'ai programming help', 'smart code completion', 'intelligent code suggestions',

    // Industry Keywords
    'software engineering', 'computer programming', 'web development tools', 'mobile development',
    'full stack development', 'frontend development', 'backend development', 'devops tools'
  ],
  authors: [{ name: 'Augment Code Community', url: 'https://augmentcode.in' }],
  creator: 'Augment Code Community',
  publisher: 'Augment Code Community',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://augmentcode.in',
    languages: {
      'en-US': 'https://augmentcode.in',
      'en-GB': 'https://augmentcode.in/en-gb',
      'en-CA': 'https://augmentcode.in/en-ca',
      'en-AU': 'https://augmentcode.in/en-au',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
    other: {
      'msvalidate.01': 'bing-verification-code',
      'p:domain_verify': 'pinterest-verification-code',
    },
  },
  openGraph: {
    title: '🚀 Augment Code - #1 AI Coding Assistant | Best AI Programming Tools 2025',
    description: '⭐ World\'s Best AI Coding Assistant! 🔥 Free AI Programming Tools 💻 AI Code Completion ⚡ Smart Programming Assistant 🎯 Join 1M+ Developers! Download Free AI Developer Tools Now! 🚀',
    url: 'https://augmentcode.in',
    siteName: 'Augment Code - AI Coding Assistant',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://augmentcode.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Augment Code - #1 AI Coding Assistant & Best AI Programming Tools 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚀 Augment Code - #1 AI Coding Assistant | Best AI Programming Tools 2025',
    description: '⭐ World\'s Best AI Coding Assistant! 🔥 Free AI Programming Tools 💻 AI Code Completion ⚡ Join 1M+ Developers! Download Free Now! 🚀',
    creator: '@augmentcode',
    images: ['https://augmentcode.in/twitter-image.jpg'],
  },
  category: 'Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = [
    // Website Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Augment Code - AI Coding Assistant",
      "alternateName": ["AI Coding Assistant", "AI Programming Tools", "AI Developer Tools", "Augment Code"],
      "url": "https://augmentcode.in",
      "description": "The world's #1 AI coding assistant and programming tools platform. Best AI developer tools for enhanced productivity.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://augmentcode.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://github.com/augmentcode",
        "https://twitter.com/augmentcode",
        "https://linkedin.com/company/augmentcode",
        "https://www.augmentcode.com"
      ]
    },
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Augment Code",
      "alternateName": "AI Coding Assistant Platform",
      "url": "https://augmentcode.in",
      "logo": "https://augmentcode.in/logo.png",
      "description": "Leading AI coding assistant and programming tools provider. Helping millions of developers code faster with AI.",
      "foundingDate": "2024",
      "industry": "Software Development",
      "keywords": "AI coding assistant, programming tools, AI developer tools, code completion, AI programming assistant",
      "sameAs": [
        "https://github.com/augmentcode",
        "https://twitter.com/augmentcode",
        "https://linkedin.com/company/augmentcode"
      ]
    },
    // Software Application Schema
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Augment Code AI Assistant",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": ["Windows", "macOS", "Linux"],
      "description": "The world's most advanced AI coding assistant. Features AI code completion, smart programming assistance, and developer productivity tools.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "50000",
        "bestRating": "5"
      },
      "keywords": "AI coding assistant, programming tools, code completion, AI developer tools, programming assistant"
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Augment Code AI Assistant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Augment Code is the world's #1 AI coding assistant that helps developers write better code faster with AI-powered code completion, smart suggestions, and programming assistance."
          }
        },
        {
          "@type": "Question",
          "name": "Is Augment Code free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Augment Code offers free AI coding assistant tools and programming assistance for developers worldwide."
          }
        }
      ]
    }
  ]

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://augmentcode.in" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="p:domain_verify" content="your-pinterest-verification-code" />
        <meta name="alexaVerifyID" content="your-alexa-verification-code" />

        {/* Advanced SEO Meta Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="expires" content="never" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="en" href="https://augmentcode.in" />
        <link rel="alternate" hrefLang="en-US" href="https://augmentcode.in" />
        <link rel="alternate" hrefLang="en-GB" href="https://augmentcode.in/en-gb" />
        <link rel="alternate" hrefLang="x-default" href="https://augmentcode.in" />

        {/* Rich Snippets Meta */}
        <meta property="product:price:amount" content="0" />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:retailer_item_id" content="augment-code-ai" />

        {/* Business Information */}
        <meta property="business:contact_data:street_address" content="Global" />
        <meta property="business:contact_data:locality" content="Worldwide" />
        <meta property="business:contact_data:region" content="Global" />
        <meta property="business:contact_data:postal_code" content="00000" />
        <meta property="business:contact_data:country_name" content="Global" />
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
