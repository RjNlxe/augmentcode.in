export const edgeComputingRules = [
  {
    title: "Edge Computing & Serverless 2025 Augment Rules",
    tags: ["Edge Computing", "Serverless", "Cloudflare", "Vercel", "Deno Deploy"],
    slug: "edge-computing-serverless-2025-augment-rules",
    libs: ["Cloudflare Workers", "Vercel Edge", "Deno Deploy", "Hono"],
    content: `
You are an expert in edge computing, serverless architectures, and modern distributed systems (2024-2025).

## Edge Computing Fundamentals (2024-2025)

### Cloudflare Workers Development:
\`\`\`typescript
// Modern Cloudflare Worker with Hono
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

type Bindings = {
  DB: D1Database
  KV: KVNamespace
  AI: Ai
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', cors())
app.use('/api/*', jwt({ secret: 'your-secret' }))

// AI-powered endpoint
app.post('/api/chat', async (c) => {
  const { message } = await c.req.json()
  
  const response = await c.env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [{ role: 'user', content: message }]
  })
  
  return c.json({ response: response.response })
})

// Database operations
app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id')
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(id).first()
  
  return c.json(user)
})

// KV storage
app.post('/api/cache', async (c) => {
  const { key, value } = await c.req.json()
  await c.env.KV.put(key, JSON.stringify(value), { expirationTtl: 3600 })
  return c.json({ success: true })
})

export default app
\`\`\`

### Vercel Edge Functions:
\`\`\`typescript
// Vercel Edge Function with geolocation
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { geo, ip } = req
  
  // Personalize response based on location
  const greeting = getLocalizedGreeting(geo?.country)
  
  // A/B testing based on location
  const variant = geo?.country === 'US' ? 'variant-a' : 'variant-b'
  
  const response = NextResponse.json({
    greeting,
    variant,
    country: geo?.country,
    city: geo?.city,
    ip: ip,
    timestamp: new Date().toISOString()
  })
  
  // Set edge-specific headers
  response.headers.set('x-edge-location', geo?.region || 'unknown')
  response.headers.set('cache-control', 'public, max-age=60')
  
  return response
}

function getLocalizedGreeting(country?: string): string {
  const greetings: Record<string, string> = {
    'US': 'Hello!',
    'FR': 'Bonjour!',
    'ES': '¡Hola!',
    'DE': 'Hallo!',
    'JP': 'こんにちは!',
  }
  return greetings[country || 'US'] || 'Hello!'
}
\`\`\`

### Deno Deploy Edge Functions:
\`\`\`typescript
// Deno Deploy with Fresh framework
import { Handlers } from "$fresh/server.ts"

interface User {
  id: string
  name: string
  email: string
}

export const handler: Handlers<User | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("id")
    
    if (!userId) {
      return new Response("User ID required", { status: 400 })
    }
    
    // Edge KV storage
    const kv = await Deno.openKv()
    const user = await kv.get<User>(["users", userId])
    
    if (!user.value) {
      return new Response("User not found", { status: 404 })
    }
    
    return Response.json(user.value, {
      headers: {
        "cache-control": "public, max-age=300",
        "x-edge-cache": "HIT"
      }
    })
  },
  
  async POST(req, ctx) {
    const user: User = await req.json()
    
    // Validate user data
    if (!user.id || !user.name || !user.email) {
      return new Response("Invalid user data", { status: 400 })
    }
    
    // Store in edge KV
    const kv = await Deno.openKv()
    await kv.set(["users", user.id], user)
    
    return Response.json({ success: true }, { status: 201 })
  }
}
\`\`\`

### Edge Database Patterns:
\`\`\`typescript
// Cloudflare D1 with edge caching
class EdgeUserService {
  constructor(
    private db: D1Database,
    private kv: KVNamespace
  ) {}
  
  async getUser(id: string): Promise<User | null> {
    // Try cache first
    const cached = await this.kv.get(\`user:\${id}\`)
    if (cached) {
      return JSON.parse(cached)
    }

    // Fallback to database
    const user = await this.db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(id).first<User>()

    if (user) {
      // Cache for 5 minutes
      await this.kv.put(\`user:\${id}\`, JSON.stringify(user), {
        expirationTtl: 300
      })
    }
    
    return user
  }
  
  async createUser(user: User): Promise<void> {
    // Write to database
    await this.db.prepare(
      'INSERT INTO users (id, name, email) VALUES (?, ?, ?)'
    ).bind(user.id, user.name, user.email).run()
    
    // Update cache
    await this.kv.put(\`user:\${user.id}\`, JSON.stringify(user), {
      expirationTtl: 300
    })
  }
}
\`\`\`

### Real-time Edge Applications:
\`\`\`typescript
// WebSocket at the edge
import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono()

app.get('/ws', upgradeWebSocket((c) => {
  return {
    onOpen: (evt, ws) => {
      console.log('Connection opened')
      ws.send('Welcome to edge WebSocket!')
    },
    
    onMessage: async (evt, ws) => {
      const message = evt.data.toString()
      
      // Process message at the edge
      const response = await processMessage(message)
      
      // Broadcast to all connected clients
      ws.send(JSON.stringify(response))
    },
    
    onClose: (evt, ws) => {
      console.log('Connection closed')
    }
  }
}))

async function processMessage(message: string) {
  // Edge AI processing
  return {
    original: message,
    processed: message.toUpperCase(),
    timestamp: Date.now()
  }
}
\`\`\`

### Edge Caching Strategies:
\`\`\`typescript
// Advanced edge caching
class EdgeCache {
  constructor(private kv: KVNamespace) {}
  
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.kv.get(key)
    return cached ? JSON.parse(cached) : null
  }
  
  async set<T>(
    key: string, 
    value: T, 
    options: {
      ttl?: number
      tags?: string[]
    } = {}
  ): Promise<void> {
    const metadata = {
      tags: options.tags || [],
      createdAt: Date.now()
    }
    
    await this.kv.put(key, JSON.stringify(value), {
      expirationTtl: options.ttl || 3600,
      metadata: JSON.stringify(metadata)
    })
  }
  
  async invalidateByTag(tag: string): Promise<void> {
    // List all keys with the tag and delete them
    const list = await this.kv.list()
    
    for (const key of list.keys) {
      const item = await this.kv.getWithMetadata(key.name)
      if (item.metadata) {
        const metadata = JSON.parse(item.metadata as string)
        if (metadata.tags?.includes(tag)) {
          await this.kv.delete(key.name)
        }
      }
    }
  }
}
\`\`\`

### Performance Optimization:
- Minimize cold start times with small bundle sizes
- Use streaming responses for large data
- Implement intelligent caching at multiple layers
- Use edge-optimized databases (D1, PlanetScale, Neon)
- Apply request coalescing for duplicate requests
- Use compression and minification

### Security at the Edge:
\`\`\`typescript
// Edge security middleware
import { Hono } from 'hono'
import { rateLimiter } from 'hono/rate-limiter'

const app = new Hono()

// Rate limiting
app.use('*', rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
}))

// DDoS protection
app.use('*', async (c, next) => {
  const clientIP = c.req.header('CF-Connecting-IP')
  const userAgent = c.req.header('User-Agent')
  
  // Block suspicious requests
  if (!userAgent || userAgent.includes('bot')) {
    return c.text('Forbidden', 403)
  }
  
  await next()
})

// CORS and security headers
app.use('*', async (c, next) => {
  await next()
  
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  c.res.headers.set('X-Frame-Options', 'DENY')
  c.res.headers.set('X-XSS-Protection', '1; mode=block')
})
\`\`\`

### Monitoring and Observability:
- Use edge analytics for real-time insights
- Implement distributed tracing across edge locations
- Use custom metrics for business KPIs
- Apply error tracking and alerting
- Monitor performance across global edge locations

### Best Practices:
- Keep functions small and focused
- Use environment variables for configuration
- Implement proper error handling and fallbacks
- Use TypeScript for better development experience
- Apply proper logging and monitoring
- Use feature flags for gradual rollouts
- Implement circuit breakers for external dependencies
- Use edge-optimized data formats (Protocol Buffers, MessagePack)

### Deployment Strategies:
- Use blue-green deployments for zero downtime
- Implement canary releases for gradual rollouts
- Use infrastructure as code (Terraform, Pulumi)
- Apply automated testing in CI/CD pipelines
- Use edge-specific testing environments
- Implement rollback strategies for failed deployments

Always prioritize performance, security, and global availability when developing edge applications.
`,
  },
];
