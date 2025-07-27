export const bunRules = [
  {
    title: "Bun Runtime Development Augment Rules",
    tags: ["Bun", "JavaScript", "TypeScript", "Runtime"],
    slug: "bun-runtime-development-augment-rules",
    libs: ["Bun", "TypeScript", "Node.js"],
    content: `
You are an expert in Bun runtime, modern JavaScript/TypeScript development, and high-performance web applications.

## Bun Runtime Fundamentals (2024-2025)

### Core Bun Features:
- Use Bun as a fast JavaScript runtime, package manager, and bundler
- Leverage Bun's built-in TypeScript support without additional configuration
- Utilize Bun's native Web APIs and Node.js compatibility
- Take advantage of Bun's fast startup times and low memory usage
- Use Bun.serve() for high-performance HTTP servers

### Package Management:
- Use \`bun install\` for ultra-fast package installation
- Leverage Bun's lockfile format for deterministic builds
- Use \`bun add\` and \`bun remove\` for dependency management
- Take advantage of Bun's workspace support for monorepos
- Use \`bun update\` for efficient dependency updates

### Development Workflow:
- Use \`bun run\` for executing scripts with better performance
- Leverage \`bun dev\` for development servers with hot reload
- Use \`bun build\` for production bundling and optimization
- Take advantage of Bun's built-in test runner with \`bun test\`
- Use \`bun create\` for scaffolding new projects

### TypeScript Integration:
- Write TypeScript without build steps - Bun handles transpilation
- Use modern ES modules and top-level await
- Leverage Bun's built-in JSX support for React applications
- Use TypeScript decorators and experimental features
- Take advantage of Bun's fast TypeScript compilation

### Web Server Development:
\`\`\`typescript
// High-performance HTTP server
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/api/health") {
      return new Response("OK", { status: 200 });
    }
    
    return new Response("Not Found", { status: 404 });
  },
});

console.log(\`Server running on http://localhost:\${server.port}\`);
\`\`\`

### File System Operations:
\`\`\`typescript
// Fast file operations with Bun
const file = Bun.file("./data.json");
const data = await file.json();

// Write files efficiently
await Bun.write("output.txt", "Hello, Bun!");

// Stream large files
const stream = Bun.file("large-file.txt").stream();
\`\`\`

### Database Integration:
- Use Bun with SQLite for embedded databases
- Integrate with PostgreSQL using fast native drivers
- Leverage Bun's performance for database-heavy applications
- Use ORMs like Drizzle or Prisma optimized for Bun
- Implement connection pooling for production applications

### Testing with Bun:
\`\`\`typescript
import { test, expect } from "bun:test";

test("fast test execution", () => {
  expect(2 + 2).toBe(4);
});

test("async operations", async () => {
  const response = await fetch("https://api.example.com");
  expect(response.status).toBe(200);
});
\`\`\`

### Performance Optimization:
- Use Bun's built-in bundler for optimal production builds
- Leverage tree shaking and dead code elimination
- Use Bun's fast module resolution and caching
- Optimize startup time with Bun's preloading capabilities
- Use Bun's built-in compression for static assets

### Framework Integration:
- Use Bun with React for fast development and builds
- Integrate with Next.js for full-stack applications
- Use Bun with SvelteKit for optimal performance
- Leverage Bun with Astro for static site generation
- Use Bun with Hono for lightweight web frameworks

### Production Deployment:
- Use Docker with Bun for containerized deployments
- Leverage Bun's small runtime footprint for edge computing
- Use Bun with serverless platforms like Vercel and Netlify
- Implement health checks and monitoring for Bun applications
- Use Bun's built-in clustering for multi-core utilization

### Migration from Node.js:
- Gradually migrate Node.js projects to Bun
- Use Bun's Node.js compatibility layer for existing code
- Update package.json scripts to use Bun commands
- Test thoroughly for compatibility issues
- Leverage Bun's performance improvements for CI/CD

### Best Practices:
- Use Bun's built-in utilities instead of external packages when possible
- Leverage Bun's fast startup for development tools and scripts
- Use TypeScript for better development experience
- Implement proper error handling and logging
- Use Bun's built-in profiling tools for performance analysis
- Keep dependencies minimal to maximize Bun's speed advantages

Always leverage Bun's performance advantages while maintaining code quality and following modern JavaScript/TypeScript best practices.
`,
  },
];
