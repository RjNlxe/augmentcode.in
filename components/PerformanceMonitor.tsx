'use client'

import { useEffect } from 'react'

// Performance monitoring for Vercel free tier optimization
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const { name, value } = entry as any
        
        // Log performance metrics for optimization
        console.log(`[Performance] ${name}: ${value}`)
        
        // Send to analytics if needed (optional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', name, {
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            event_category: 'Web Vitals',
            non_interaction: true,
          })
        }
      }
    })

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for older browsers
      console.log('[Performance] Observer not supported')
    }

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming
        
        // Log slow resources
        if (resource.duration > 1000) {
          console.warn(`[Performance] Slow resource: ${resource.name} (${resource.duration}ms)`)
        }
      }
    })

    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (e) {
      console.log('[Performance] Resource observer not supported')
    }

    // Cleanup
    return () => {
      observer.disconnect()
      resourceObserver.disconnect()
    }
  }, [])

  // Preload critical resources
  useEffect(() => {
    // Preload fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap'
    fontLink.as = 'style'
    document.head.appendChild(fontLink)

    // Preconnect to external domains
    const preconnectDomains = [
      'https://text.pollinations.ai',
      'https://integrate.api.nvidia.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      document.head.appendChild(link)
    })

    // Prefetch critical pages
    const prefetchPages = ['/rules', '/generate', '/mcp']
    prefetchPages.forEach(page => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = page
      document.head.appendChild(link)
    })
  }, [])

  return null // This component doesn't render anything
}
