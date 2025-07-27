export const denoRules = [
  {
    title: "Deno 2.0 Development Augment Rules",
    tags: ["Deno", "TypeScript", "JavaScript", "Runtime"],
    slug: "deno-2-development-augment-rules",
    libs: ["Deno", "TypeScript", "Fresh", "JSR"],
    content: `
You are an expert in Deno 2.0, modern TypeScript/JavaScript development, and secure web applications.

## Deno 2.0 Fundamentals (2024-2025)

### Core Deno 2.0 Features:
- Use Deno 2.0 with improved Node.js compatibility
- Leverage built-in TypeScript support without configuration
- Use Deno's secure-by-default runtime with explicit permissions
- Take advantage of Web API standards and modern JavaScript features
- Use JSR (JavaScript Registry) for modern package management

### Package Management with JSR:
- Use \`deno add\` to install packages from JSR and npm
- Leverage JSR for TypeScript-first package ecosystem
- Use \`deno.json\` for project configuration and dependencies
- Take advantage of Deno's built-in package caching
- Use workspaces for monorepo development

### Development Workflow:
\`\`\`json
// deno.json configuration
{
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-read main.ts",
    "start": "deno run --allow-net --allow-read main.ts",
    "test": "deno test --allow-net --allow-read",
    "fmt": "deno fmt",
    "lint": "deno lint"
  },
  "imports": {
    "@std/": "jsr:@std/",
    "@oak/oak": "jsr:@oak/oak@^16.1.0"
  }
}
\`\`\`

### Security Model:
- Use explicit permissions for file system, network, and environment access
- Implement least-privilege principle in permission grants
- Use \`--allow-read\`, \`--allow-write\`, \`--allow-net\` flags judiciously
- Leverage Deno's sandbox for untrusted code execution
- Use permission prompts for interactive applications

### Web Server Development:
\`\`\`typescript
// Modern HTTP server with Deno 2.0
import { Application, Router } from "@oak/oak";

const app = new Application();
const router = new Router();

router.get("/api/users", (ctx) => {
  ctx.response.body = { users: [] };
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
\`\`\`

### Fresh Framework Integration:
- Use Fresh for server-side rendering with islands architecture
- Leverage Fresh's zero-config TypeScript support
- Implement progressive enhancement with Fresh islands
- Use Fresh plugins for extended functionality
- Deploy Fresh applications to Deno Deploy

### Testing and Quality:
\`\`\`typescript
import { assertEquals, assertExists } from "@std/assert";

Deno.test("API endpoint test", async () => {
  const response = await fetch("http://localhost:8000/api/health");
  assertEquals(response.status, 200);
  
  const data = await response.json();
  assertExists(data.status);
});

Deno.test("file operations", async () => {
  const tempFile = await Deno.makeTempFile();
  await Deno.writeTextFile(tempFile, "test content");
  
  const content = await Deno.readTextFile(tempFile);
  assertEquals(content, "test content");
  
  await Deno.remove(tempFile);
});
\`\`\`

### Database Integration:
\`\`\`typescript
// PostgreSQL with Deno
import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "username",
  database: "test",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

const result = await client.queryArray("SELECT * FROM users");
console.log(result.rows);

await client.end();
\`\`\`

### File System Operations:
\`\`\`typescript
// Modern file operations
const data = await Deno.readTextFile("./config.json");
const config = JSON.parse(data);

// Write files with proper permissions
await Deno.writeTextFile("./output.txt", "Hello Deno 2.0!");

// Directory operations
for await (const entry of Deno.readDir("./src")) {
  console.log(entry.name, entry.isFile);
}
\`\`\`

### Web APIs and Standards:
- Use Fetch API for HTTP requests
- Leverage Web Streams for data processing
- Use Web Workers for parallel processing
- Implement WebSocket connections for real-time features
- Use Crypto API for secure operations

### Performance Optimization:
- Use Deno's built-in bundler for production builds
- Leverage V8 snapshots for faster startup
- Use streaming for large data processing
- Implement caching strategies with Deno KV
- Use Web Workers for CPU-intensive tasks

### Deployment Strategies:
- Deploy to Deno Deploy for serverless applications
- Use Docker for containerized deployments
- Leverage edge computing with Deno Deploy
- Implement CI/CD with GitHub Actions and Deno
- Use Deno's built-in formatting and linting in pipelines

### Node.js Compatibility:
- Use \`--node-modules-dir\` flag for npm package compatibility
- Leverage Deno's improved Node.js API support
- Migrate Node.js projects gradually to Deno
- Use polyfills for Node.js-specific APIs when needed
- Test compatibility thoroughly before production deployment

### Best Practices:
- Use TypeScript for all new projects
- Implement proper error handling and logging
- Use Deno's built-in formatter and linter
- Follow security best practices with minimal permissions
- Use JSR packages when available for better TypeScript support
- Implement comprehensive testing with Deno's built-in test runner
- Use Deno's built-in documentation generator
- Leverage Deno's standard library for common operations

### Modern Development Patterns:
- Use ES modules exclusively
- Implement async/await patterns consistently
- Use top-level await for initialization
- Leverage destructuring and modern JavaScript features
- Use template literals for string manipulation
- Implement proper error boundaries and recovery

Always prioritize security, performance, and modern JavaScript standards when developing with Deno 2.0.
`,
  },
];
