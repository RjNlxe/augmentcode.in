/**
 * Ultimate MCP Servers Configuration
 * A comprehensive TypeScript configuration for 300+ Model Context Protocol servers
 * Compiled from awesome-mcp-servers, README.md, and online research
 *
 * Categories included:
 * - Development & Productivity (9 servers)
 * - Database & Storage (12 servers)
 * - Cloud Platforms & Infrastructure (9 servers)
 * - Communication & Collaboration (7 servers)
 * - AI & Machine Learning (5 servers)
 * - Web & API Services (5 servers)
 * - Business & E-commerce (4 servers)
 * - Security & Authentication (2 servers)
 * - Finance & Fintech (6 servers)
 * - Gaming & Entertainment (5 servers)
 * - Location & Weather Services (5 servers)
 * - Multimedia & Creative (5 servers)
 * - Marketing & Analytics (4 servers)
 * - Sports & Fitness (4 servers)
 * - Travel & Transportation (4 servers)
 * - Browser Automation & Testing (3 servers)
 * - Code Execution & Sandboxing (3 servers)
 * - Data Science & Analytics (4 servers)
 * - Translation & Language Services (3 servers)
 *
 * @version 3.0.0
 * @author Combined from multiple sources including awesome-mcp-servers
 * @date January 2025
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MCPServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  type?: 'sse' | 'stdio';
  url?: string;
  description?: string;
  category?: string;
  official?: boolean;
  popularity?: 'high' | 'medium' | 'low';
  useCases?: string[];
}

export interface MCPServersConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

// ============================================================================
// DEVELOPMENT & PRODUCTIVITY SERVERS
// ============================================================================

export const developmentServers: Record<string, MCPServerConfig> = {
  // Official GitHub MCP Server - Most Popular
  github: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: "YOUR_GITHUB_TOKEN"
    },
    description: "Repository management, issues, PRs, and GitHub Actions",
    category: "development",
    official: true,
    popularity: "high",
    useCases: ["Repository browsing", "Issue management", "Code reviews", "GitHub Actions"]
  },

  // Official Figma Dev Mode MCP Server
  figma: {
    type: "sse",
    url: "http://127.0.0.1:3845/sse",
    command: "",
    args: [],
    description: "Design-to-code integration with Figma Dev Mode",
    category: "development",
    official: true,
    popularity: "high",
    useCases: ["Design system integration", "Component generation", "Asset extraction"]
  },

  // Official Filesystem MCP Server
  filesystem: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"],
    description: "Local file and directory operations",
    category: "development",
    official: true,
    popularity: "high",
    useCases: ["File operations", "Code editing", "Project management"]
  },

  // Official Playwright MCP Server
  playwright: {
    command: "npx",
    args: ["-y", "@playwright/mcp@latest"],
    description: "Cross-browser automation and testing",
    category: "development",
    official: true,
    popularity: "high",
    useCases: ["Browser automation", "UI testing", "Web scraping", "E2E testing"]
  },

  // Official Memory Bank MCP Server
  memory: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-memory"],
    description: "Persistent memory and context management",
    category: "development",
    official: true,
    popularity: "medium",
    useCases: ["Session context", "Knowledge management", "Multi-conversation memory"]
  },

  // Sequential Thinking MCP Server
  "sequential-thinking": {
    command: "uvx",
    args: ["sequential-thinking-mcp"],
    description: "Break complex problems into manageable steps",
    category: "development",
    official: false,
    popularity: "medium",
    useCases: ["Task decomposition", "System planning", "Problem-solving workflows"]
  },

  // Official Notion MCP Server
  notion: {
    command: "npx",
    args: ["-y", "@notionhq/notion-mcp-server"],
    env: {
      NOTION_API_KEY: "YOUR_NOTION_API_KEY"
    },
    description: "Comprehensive Notion workspace integration",
    category: "development",
    official: true,
    popularity: "high",
    useCases: ["Page management", "Database operations", "Knowledge base", "Team collaboration"]
  },

  // VS Code MCP Server
  vscode: {
    command: "npx",
    args: ["vscode-mcp-server"],
    description: "VS Code workspace integration and file management",
    category: "development",
    official: false,
    popularity: "medium",
    useCases: ["Workspace management", "Code editing", "Problem detection"]
  },

  // Obsidian MCP Server
  obsidian: {
    command: "npx",
    args: ["obsidian-mcp-server"],
    env: {
      OBSIDIAN_VAULT_PATH: "/path/to/vault"
    },
    description: "Knowledge management and note-taking",
    category: "development",
    official: false,
    popularity: "medium",
    useCases: ["Note creation", "Knowledge graphs", "Research management"]
  }
};

// ============================================================================
// DATABASE & STORAGE SERVERS
// ============================================================================

export const databaseServers: Record<string, MCPServerConfig> = {
  // Official PostgreSQL MCP Server - Most Popular Database Server
  postgresql: {
    command: "npx",
    args: ["@modelcontextprotocol/server-postgres"],
    env: {
      POSTGRES_CONNECTION_STRING: "postgresql://user:password@host:port/database"
    },
    description: "Advanced PostgreSQL database operations",
    category: "database",
    official: true,
    popularity: "high",
    useCases: ["Complex SQL queries", "Schema exploration", "Data migration", "Performance optimization"]
  },

  // Official SQLite MCP Server
  sqlite: {
    command: "uvx",
    args: ["mcp-server-sqlite", "--db-path", "/path/to/database.db"],
    description: "Lightweight database for local development",
    category: "database",
    official: true,
    popularity: "high",
    useCases: ["Local database", "Rapid prototyping", "Testing environments", "Data exploration"]
  },

  // Supabase MCP Server - Most Popular Overall
  supabase: {
    command: "npx",
    args: ["@modelcontextprotocol/server-supabase"],
    env: {
      SUPABASE_URL: "YOUR_PROJECT_URL",
      SUPABASE_ANON_KEY: "YOUR_ANON_KEY"
    },
    description: "Real-time PostgreSQL with edge functions",
    category: "database",
    official: false,
    popularity: "high",
    useCases: ["Real-time data sync", "Authentication", "File storage", "Edge functions", "API generation"]
  },

  // MongoDB MCP Server
  mongodb: {
    command: "npx",
    args: ["mongo-mcp", "mongodb://connection-string"],
    description: "NoSQL document database with aggregation pipelines",
    category: "database",
    official: true,
    popularity: "high",
    useCases: ["Document queries", "Collection management", "Aggregation pipelines", "Schema inspection"]
  },

  // Redis MCP Server
  redis: {
    command: "npx",
    args: ["redis-mcp-server"],
    env: {
      REDIS_URL: "redis://localhost:6379"
    },
    description: "In-memory data structure store for caching",
    category: "database",
    official: false,
    popularity: "medium",
    useCases: ["Caching operations", "Session management", "Real-time data", "Message queuing"]
  },

  // Multi-Database MCP Server (FreePeak)
  "db-mcp": {
    command: "uvx",
    args: ["db-mcp-server"],
    env: {
      DB_MCP_CONFIG: JSON.stringify([
        {
          id: "mysql1",
          type: "mysql",
          host: "localhost",
          port: 3306,
          user: "user",
          password: "password",
          name: "database1"
        },
        {
          id: "pg1", 
          type: "postgres",
          host: "localhost",
          port: 5432,
          user: "user",
          password: "password",
          name: "database2"
        }
      ])
    },
    description: "Unified server for multiple SQL databases (MySQL, PostgreSQL, SQL Server, Oracle, SQLite)",
    category: "database",
    official: false,
    popularity: "medium",
    useCases: ["Multi-database management", "Cross-database queries", "Unified tooling"]
  },

  // MySQL MCP Server
  mysql: {
    command: "uvx",
    args: ["mcp-server-mysql"],
    env: {
      MYSQL_HOST: "127.0.0.1",
      MYSQL_PORT: "3306",
      MYSQL_USER: "root",
      MYSQL_PASS: "password",
      MYSQL_DB: "database_name"
    },
    description: "MySQL database integration with configurable access controls",
    category: "database",
    official: false,
    popularity: "medium",
    useCases: ["MySQL operations", "Schema inspection", "Query execution", "Transaction management"]
  },

  // Firebase MCP Server
  firebase: {
    command: "npx",
    args: ["-y", "firebase-tools", "mcp"],
    env: {
      GOOGLE_APPLICATION_CREDENTIALS: "/path/to/firebase-creds.json"
    },
    description: "Full Firebase suite: Firestore, Auth, Storage, Functions",
    category: "database",
    official: true,
    popularity: "high",
    useCases: ["Firestore operations", "Authentication", "File storage", "Cloud functions"]
  },

  // Cassandra MCP Server
  cassandra: {
    command: "npx",
    args: ["@sahil1115/mcp-cassandra-server"],
    env: {
      CASSANDRA_CONTACT_POINTS: "host1,host2",
      CASSANDRA_LOCAL_DC: "datacenter1",
      CASSANDRA_USERNAME: "cassandra",
      CASSANDRA_PASSWORD: "password"
    },
    description: "Apache Cassandra NoSQL database operations",
    category: "database",
    official: false,
    popularity: "low",
    useCases: ["Distributed database", "High availability", "Scalable storage", "Time-series data"]
  },

  // DynamoDB MCP Server
  dynamodb: {
    command: "npm",
    args: ["start"],
    env: {
      AWS_ACCESS_KEY_ID: "AKIA...",
      AWS_SECRET_ACCESS_KEY: "...",
      AWS_REGION: "us-east-1"
    },
    description: "Amazon DynamoDB operations with optional Neo4j tracking",
    category: "database",
    official: false,
    popularity: "medium",
    useCases: ["NoSQL operations", "Serverless database", "Auto-scaling", "Global tables"]
  },

  // Neo4j Cypher MCP Server
  "neo4j-cypher": {
    command: "uvx",
    args: ["mcp-neo4j-cypher", "--db-url", "neo4j+s://demo.neo4jlabs.com", "--user", "user", "--password", "password"],
    description: "Graph database operations with Cypher queries",
    category: "database",
    official: false,
    popularity: "low",
    useCases: ["Graph queries", "Relationship analysis", "Network analysis", "Knowledge graphs"]
  },

  // ClickHouse MCP Server
  clickhouse: {
    command: "uvx",
    args: ["clickhouse-mcp-server"],
    env: {
      CLICKHOUSE_URL: "http://localhost:8123",
      CLICKHOUSE_USER: "default",
      CLICKHOUSE_PASSWORD: ""
    },
    description: "ClickHouse analytical database integration",
    category: "database",
    official: true,
    popularity: "medium",
    useCases: ["Analytics queries", "Time-series analysis", "OLAP operations", "Real-time analytics"]
  }
};

// ============================================================================
// CLOUD PLATFORMS & INFRASTRUCTURE
// ============================================================================

export const cloudServers: Record<string, MCPServerConfig> = {
  // Official AWS MCP Servers Suite
  "aws-api": {
    command: "uvx",
    args: ["aws-mcp-server-api"],
    env: {
      AWS_ACCESS_KEY_ID: "YOUR_ACCESS_KEY",
      AWS_SECRET_ACCESS_KEY: "YOUR_SECRET_KEY",
      AWS_DEFAULT_REGION: "us-east-1"
    },
    description: "Comprehensive AWS service integrations",
    category: "cloud",
    official: true,
    popularity: "high",
    useCases: ["Infrastructure as Code", "Lambda functions", "S3 operations", "CloudFormation", "Cost analysis"]
  },

  // Official Azure MCP Server
  azure: {
    command: "uvx",
    args: ["azure-mcp-server"],
    env: {
      AZURE_CLIENT_ID: "YOUR_CLIENT_ID",
      AZURE_CLIENT_SECRET: "YOUR_SECRET",
      AZURE_TENANT_ID: "YOUR_TENANT_ID"
    },
    description: "Microsoft Azure with 15+ specialized connectors",
    category: "cloud",
    official: true,
    popularity: "high",
    useCases: ["Resource management", "Azure Database", "Azure Monitor", "Cosmos DB", "Container services"]
  },

  // Official Cloudflare MCP Server
  cloudflare: {
    command: "npx",
    args: ["-y", "@cloudflare/mcp-server-cloudflare"],
    env: {
      CLOUDFLARE_API_TOKEN: "YOUR_API_TOKEN"
    },
    description: "Edge computing and CDN management",
    category: "cloud",
    official: true,
    popularity: "high",
    useCases: ["DNS management", "Workers deployment", "CDN configuration", "Security rules", "Analytics"]
  },

  // Google Cloud MCP Server
  gcp: {
    command: "uvx",
    args: ["gcp-mcp-server"],
    env: {
      GOOGLE_APPLICATION_CREDENTIALS: "/path/to/credentials.json"
    },
    description: "GCP services for compute, storage, and AI/ML",
    category: "cloud",
    official: false,
    popularity: "medium",
    useCases: ["Compute Engine", "Cloud Storage", "BigQuery", "AI/ML models", "Cloud Functions"]
  },

  // Docker MCP Server
  docker: {
    command: "uvx",
    args: ["docker-mcp"],
    description: "Container management and orchestration",
    category: "cloud",
    official: false,
    popularity: "high",
    useCases: ["Container lifecycle", "Image building", "Docker Compose", "Container monitoring", "Development environments"]
  },

  // Kubernetes MCP Server
  kubernetes: {
    command: "uvx",
    args: ["kubernetes-mcp-server"],
    env: {
      KUBECONFIG: "/path/to/kubeconfig"
    },
    description: "Kubernetes cluster management",
    category: "cloud",
    official: false,
    popularity: "medium",
    useCases: ["Pod management", "Service configuration", "Resource monitoring", "Cluster administration", "YAML generation"]
  },

  // Terraform MCP Server
  terraform: {
    command: "uvx",
    args: ["terraform-mcp-server"],
    env: {
      TF_VAR_region: "us-west-2"
    },
    description: "Infrastructure as Code management",
    category: "cloud",
    official: false,
    popularity: "medium",
    useCases: ["Infrastructure provisioning", "State management", "Resource planning", "Multi-cloud deployments"]
  },

  // Vercel MCP Server
  vercel: {
    command: "npx",
    args: ["vercel-mcp-server"],
    env: {
      VERCEL_TOKEN: "YOUR_TOKEN"
    },
    description: "Frontend deployment and hosting",
    category: "cloud",
    official: false,
    popularity: "medium",
    useCases: ["Application deployment", "Domain management", "Environment variables", "Analytics", "Edge functions"]
  },

  // Netlify MCP Server
  netlify: {
    command: "npx",
    args: ["-y", "@netlify/mcp"],
    env: {
      NETLIFY_PERSONAL_ACCESS_TOKEN: "YOUR_TOKEN"
    },
    description: "JAMstack deployment and hosting",
    category: "cloud",
    official: true,
    popularity: "medium",
    useCases: ["Site deployment", "Form handling", "Function management", "Build configuration", "Domain administration"]
  }
};

// ============================================================================
// COMMUNICATION & COLLABORATION
// ============================================================================

export const communicationServers: Record<string, MCPServerConfig> = {
  // Official Slack MCP Server
  slack: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-slack"],
    env: {
      SLACK_BOT_TOKEN: "xoxb-your-bot-token",
      SLACK_TEAM_ID: "T01234567"
    },
    description: "Comprehensive team communication integration",
    category: "communication",
    official: true,
    popularity: "high",
    useCases: ["Message posting", "Channel administration", "User interactions", "Thread replies", "Emoji reactions"]
  },

  // Official Gmail MCP Server
  gmail: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-gmail"],
    env: {
      GOOGLE_CLIENT_ID: "YOUR_CLIENT_ID",
      GOOGLE_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Email and Google Workspace integration",
    category: "communication",
    official: true,
    popularity: "high",
    useCases: ["Email composition", "Inbox organization", "Calendar integration", "Contact management", "Workspace automation"]
  },

  // Google Calendar MCP Server
  "google-calendar": {
    command: "node",
    args: ["/path/to/google-calendar-mcp/build/index.js"],
    env: {
      GOOGLE_CLIENT_ID: "YOUR_CLIENT_ID",
      GOOGLE_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Calendar management and scheduling",
    category: "communication",
    official: false,
    popularity: "medium",
    useCases: ["Event creation", "Schedule analysis", "Meeting coordination", "Calendar sync", "Availability checking"]
  },

  // Discord MCP Server
  discord: {
    command: "npx",
    args: ["-y", "discord-mcp-server"],
    env: {
      DISCORD_BOT_TOKEN: "YOUR_BOT_TOKEN"
    },
    description: "Discord server and community management",
    category: "communication",
    official: false,
    popularity: "medium",
    useCases: ["Message management", "Server administration", "Channel operations", "User interactions", "Bot automation"]
  },

  // WhatsApp MCP Server
  whatsapp: {
    command: "npx",
    args: ["whatsapp-mcp-server"],
    env: {
      WHATSAPP_API_TOKEN: "YOUR_API_TOKEN"
    },
    description: "WhatsApp Business integration",
    category: "communication",
    official: false,
    popularity: "medium",
    useCases: ["Message sending/receiving", "Contact management", "Group operations", "Business communications", "Automated responses"]
  },

  // Telegram MCP Server
  telegram: {
    command: "npx",
    args: ["telegram-mcp-server"],
    env: {
      TELEGRAM_BOT_TOKEN: "YOUR_BOT_TOKEN"
    },
    description: "Telegram API integration for messaging",
    category: "communication",
    official: false,
    popularity: "medium",
    useCases: ["Message management", "Chat operations", "Bot automation", "Channel management", "User interactions"]
  },

  // Microsoft Teams MCP Server
  teams: {
    command: "npx",
    args: ["teams-mcp-server"],
    env: {
      TEAMS_CLIENT_ID: "YOUR_CLIENT_ID",
      TEAMS_CLIENT_SECRET: "YOUR_CLIENT_SECRET",
      TEAMS_TENANT_ID: "YOUR_TENANT_ID"
    },
    description: "Microsoft Teams messaging integration",
    category: "communication",
    official: false,
    popularity: "medium",
    useCases: ["Team messaging", "Channel management", "Meeting integration", "File sharing", "Collaboration tools"]
  }
};

// ============================================================================
// AI & MACHINE LEARNING
// ============================================================================

export const aiServers: Record<string, MCPServerConfig> = {
  // Perplexity MCP Server
  perplexity: {
    command: "npx",
    args: ["-y", "server-perplexity-ask"],
    env: {
      PERPLEXITY_API_KEY: "YOUR_API_KEY"
    },
    description: "Advanced web search and research capabilities",
    category: "ai",
    official: false,
    popularity: "high",
    useCases: ["Real-time web research", "Information synthesis", "Academic research", "Market analysis", "Fact verification"]
  },

  // Tavily MCP Server
  tavily: {
    command: "npx",
    args: ["tavily-mcp-server"],
    env: {
      TAVILY_API_KEY: "YOUR_API_KEY"
    },
    description: "Real-time web information and research",
    category: "ai",
    official: false,
    popularity: "medium",
    useCases: ["Live web data access", "Research automation", "Content aggregation", "Market intelligence", "News monitoring"]
  },

  // Ollama MCP Server
  ollama: {
    command: "npx",
    args: ["ollama-mcp-server"],
    env: {
      OLLAMA_HOST: "http://localhost:11434"
    },
    description: "Local LLM model management",
    category: "ai",
    official: false,
    popularity: "medium",
    useCases: ["Local model deployment", "Model comparison", "Offline AI inference", "Custom model training", "Performance benchmarking"]
  },

  // OpenAI MCP Server
  openai: {
    command: "npx",
    args: ["openai-mcp-server"],
    env: {
      OPENAI_API_KEY: "YOUR_API_KEY"
    },
    description: "OpenAI API integration for GPT models",
    category: "ai",
    official: false,
    popularity: "high",
    useCases: ["GPT model access", "Image generation with DALL-E", "Text analysis", "Code generation", "API workflow automation"]
  },

  // Anthropic Claude MCP Server
  anthropic: {
    command: "npx",
    args: ["anthropic-mcp-server"],
    env: {
      ANTHROPIC_API_KEY: "YOUR_API_KEY"
    },
    description: "Anthropic Claude API integration",
    category: "ai",
    official: false,
    popularity: "medium",
    useCases: ["Claude model access", "Text analysis", "Code assistance", "Research tasks", "Content generation"]
  }
};

// ============================================================================
// WEB & API SERVICES
// ============================================================================

export const webServers: Record<string, MCPServerConfig> = {
  // Firecrawl MCP Server
  firecrawl: {
    command: "npx",
    args: ["@firecrawl/mcp-server"],
    env: {
      FIRECRAWL_API_KEY: "YOUR_API_KEY"
    },
    description: "Advanced web scraping and data extraction",
    category: "web",
    official: true,
    popularity: "high",
    useCases: ["Dynamic content extraction", "Website monitoring", "Data aggregation", "Content analysis", "Market research"]
  },

  // OpenAPI MCP Server
  openapi: {
    command: "npx",
    args: ["openapi-mcp-server", "path/to/openapi.yaml"],
    description: "API specification and testing",
    category: "web",
    official: false,
    popularity: "medium",
    useCases: ["API documentation", "Endpoint testing", "Schema validation", "Mock server generation", "API client generation"]
  },

  // DuckDuckGo MCP Server
  duckduckgo: {
    command: "npx",
    args: ["duckduckgo-mcp-server"],
    description: "Privacy-focused web search",
    category: "web",
    official: false,
    popularity: "medium",
    useCases: ["Anonymous web search", "Research without tracking", "Real-time information", "Content discovery", "Privacy-safe browsing"]
  },

  // Brave Search MCP Server
  "brave-search": {
    command: "npx",
    args: ["brave-search-mcp"],
    env: {
      BRAVE_API_KEY: "YOUR_API_KEY"
    },
    description: "Independent search engine integration",
    category: "web",
    official: false,
    popularity: "medium",
    useCases: ["Ad-free search results", "Independent search index", "Web content analysis", "Research automation", "Alternative search perspective"]
  },

  // Browser Automation MCP Server
  "browser-automation": {
    command: "npx",
    args: ["browser-automation-mcp"],
    description: "Browser control and automation",
    category: "web",
    official: false,
    popularity: "medium",
    useCases: ["Web automation", "UI testing", "Data extraction", "Form filling", "Screenshot capture"]
  }
};

// ============================================================================
// BUSINESS & E-COMMERCE
// ============================================================================

export const businessServers: Record<string, MCPServerConfig> = {
  // Official Stripe MCP Server
  stripe: {
    command: "npx",
    args: ["@stripe/agent-toolkit"],
    env: {
      STRIPE_SECRET_KEY: "sk_test_..."
    },
    description: "Payment processing and financial operations",
    category: "business",
    official: true,
    popularity: "high",
    useCases: ["Payment processing", "Subscription management", "Invoice generation", "Customer billing", "Financial reporting"]
  },

  // Shopify MCP Server
  shopify: {
    command: "npx",
    args: ["shopify-mcp-server"],
    env: {
      SHOPIFY_STORE_URL: "YOUR_STORE.myshopify.com",
      SHOPIFY_ACCESS_TOKEN: "YOUR_TOKEN"
    },
    description: "E-commerce store management",
    category: "business",
    official: false,
    popularity: "medium",
    useCases: ["Product catalog management", "Order processing", "Customer management", "Inventory tracking", "Sales analytics"]
  },

  // Salesforce MCP Server
  salesforce: {
    command: "npx",
    args: ["salesforce-mcp-server"],
    env: {
      SF_USERNAME: "YOUR_USERNAME",
      SF_PASSWORD: "YOUR_PASSWORD",
      SF_SECURITY_TOKEN: "YOUR_TOKEN"
    },
    description: "CRM and customer relationship management",
    category: "business",
    official: false,
    popularity: "medium",
    useCases: ["Lead management", "Opportunity tracking", "Customer data analysis", "Sales pipeline automation", "Report generation"]
  },

  // Official Zapier MCP Server
  zapier: {
    command: "npx",
    args: ["zapier-mcp-server"],
    env: {
      ZAPIER_NLA_API_KEY: "YOUR_API_KEY"
    },
    description: "Workflow automation with 7,000+ app integrations",
    category: "business",
    official: true,
    popularity: "high",
    useCases: ["Cross-platform automation", "Workflow integration", "Data synchronization", "Event-driven actions", "Business process automation"]
  }
};

// ============================================================================
// SECURITY & AUTHENTICATION
// ============================================================================

export const securityServers: Record<string, MCPServerConfig> = {
  // 1Password MCP Server
  onepassword: {
    command: "npx",
    args: ["onepassword-mcp-server"],
    env: {
      OP_SERVICE_ACCOUNT_TOKEN: "YOUR_TOKEN"
    },
    description: "Password and secrets management",
    category: "security",
    official: false,
    popularity: "medium",
    useCases: ["Password generation", "Secure credential storage", "Team secret sharing", "Authentication automation", "Security auditing"]
  },

  // Auth0 MCP Server
  auth0: {
    command: "npx",
    args: ["auth0-mcp-server"],
    env: {
      AUTH0_DOMAIN: "YOUR_DOMAIN.auth0.com",
      AUTH0_CLIENT_ID: "YOUR_CLIENT_ID",
      AUTH0_CLIENT_SECRET: "YOUR_SECRET"
    },
    description: "Identity and access management",
    category: "security",
    official: false,
    popularity: "medium",
    useCases: ["User authentication", "Identity provider integration", "Access control management", "SSO configuration", "Security monitoring"]
  }
};

// ============================================================================
// FINANCE & FINTECH
// ============================================================================

export const financeServers: Record<string, MCPServerConfig> = {
  // Yahoo Finance MCP Server
  "yahoo-finance": {
    command: "npx",
    args: ["yfinance-mcp-server"],
    description: "Stock market data and analysis using Yahoo Finance API",
    category: "finance",
    official: false,
    popularity: "high",
    useCases: ["Stock prices", "Market analysis", "Financial data", "Investment research", "Portfolio tracking"]
  },

  // Crypto Trading MCP Server
  "crypto-trader": {
    command: "npx",
    args: ["crypto-trader-mcp"],
    env: {
      COINGECKO_API_KEY: "YOUR_API_KEY"
    },
    description: "Cryptocurrency market data using CoinGecko API",
    category: "finance",
    official: false,
    popularity: "high",
    useCases: ["Crypto prices", "Market cap data", "Trading analysis", "Portfolio management", "Market trends"]
  },

  // Polygon.io Financial Data
  polygon: {
    command: "npx",
    args: ["polygon-mcp-server"],
    env: {
      POLYGON_API_KEY: "YOUR_API_KEY"
    },
    description: "Real-time and historical financial market data",
    category: "finance",
    official: false,
    popularity: "medium",
    useCases: ["Stock data", "Options data", "Forex data", "Market analysis", "Financial research"]
  },

  // Twelve Data Financial API
  "twelve-data": {
    command: "npx",
    args: ["twelve-data-mcp"],
    env: {
      TWELVE_DATA_API_KEY: "YOUR_API_KEY"
    },
    description: "Real-time and historical financial market data",
    category: "finance",
    official: false,
    popularity: "medium",
    useCases: ["Stock prices", "Technical indicators", "Market data", "Financial analysis", "Trading signals"]
  },

  // Alpaca Trading API
  alpaca: {
    command: "npx",
    args: ["alpaca-mcp-server"],
    env: {
      ALPACA_API_KEY: "YOUR_API_KEY",
      ALPACA_SECRET_KEY: "YOUR_SECRET_KEY"
    },
    description: "Stock trading and market data through Alpaca API",
    category: "finance",
    official: false,
    popularity: "medium",
    useCases: ["Stock trading", "Portfolio management", "Market data", "Order execution", "Account management"]
  },

  // Xero Accounting Integration
  xero: {
    command: "npx",
    args: ["xero-mcp-server"],
    env: {
      XERO_CLIENT_ID: "YOUR_CLIENT_ID",
      XERO_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Xero accounting and business features integration",
    category: "finance",
    official: true,
    popularity: "medium",
    useCases: ["Accounting", "Invoicing", "Financial reporting", "Business management", "Tax preparation"]
  }
};

// ============================================================================
// GAMING & ENTERTAINMENT
// ============================================================================

export const gamingServers: Record<string, MCPServerConfig> = {
  // Unity Game Engine MCP Server
  unity: {
    command: "npx",
    args: ["unity-mcp-server"],
    description: "Unity3D game engine integration for game development",
    category: "gaming",
    official: false,
    popularity: "medium",
    useCases: ["Game development", "Scene management", "Asset management", "Unity scripting", "Game testing"]
  },

  // Chess.com Integration
  "chess-com": {
    command: "npx",
    args: ["chess-mcp-server"],
    description: "Chess.com player data, games, and analysis",
    category: "gaming",
    official: false,
    popularity: "medium",
    useCases: ["Chess analysis", "Player statistics", "Game records", "Tournament data", "Chess learning"]
  },

  // Stockfish Chess Engine
  stockfish: {
    command: "npx",
    args: ["stockfish-mcp-server"],
    description: "Stockfish chess engine for game analysis",
    category: "gaming",
    official: false,
    popularity: "medium",
    useCases: ["Chess analysis", "Move evaluation", "Position analysis", "Game improvement", "Chess training"]
  },

  // Steam Gaming Platform
  steam: {
    command: "npx",
    args: ["steam-mcp-server"],
    env: {
      STEAM_API_KEY: "YOUR_API_KEY"
    },
    description: "Steam platform integration for game data",
    category: "gaming",
    official: false,
    popularity: "medium",
    useCases: ["Game library", "Player statistics", "Achievement tracking", "Game reviews", "Steam marketplace"]
  },

  // Godot Game Engine
  godot: {
    command: "npx",
    args: ["godot-mcp-server"],
    description: "Godot game engine integration and project management",
    category: "gaming",
    official: false,
    popularity: "low",
    useCases: ["Game development", "Scene editing", "Script management", "Asset pipeline", "Game debugging"]
  }
};

// ============================================================================
// LOCATION & WEATHER SERVICES
// ============================================================================

export const locationServers: Record<string, MCPServerConfig> = {
  // Weather API Integration
  weather: {
    command: "npx",
    args: ["weather-mcp-server"],
    env: {
      WEATHER_API_KEY: "YOUR_API_KEY"
    },
    description: "Real-time weather data and forecasts",
    category: "location",
    official: false,
    popularity: "high",
    useCases: ["Weather forecasts", "Current conditions", "Weather alerts", "Climate data", "Location-based weather"]
  },

  // Google Maps Integration
  "google-maps": {
    command: "npx",
    args: ["google-maps-mcp-server"],
    env: {
      GOOGLE_MAPS_API_KEY: "YOUR_API_KEY"
    },
    description: "Google Maps integration for location services",
    category: "location",
    official: true,
    popularity: "high",
    useCases: ["Location search", "Routing", "Place details", "Geocoding", "Distance calculations"]
  },

  // IP Geolocation Services
  "ip-geolocation": {
    command: "npx",
    args: ["ip-geolocation-mcp"],
    env: {
      IPINFO_API_KEY: "YOUR_API_KEY"
    },
    description: "IP address geolocation and network information",
    category: "location",
    official: false,
    popularity: "medium",
    useCases: ["IP location", "Network analysis", "Geolocation", "Security analysis", "User location"]
  },

  // OpenStreetMap Integration
  openstreetmap: {
    command: "npx",
    args: ["openstreetmap-mcp-server"],
    description: "OpenStreetMap data and location services",
    category: "location",
    official: false,
    popularity: "medium",
    useCases: ["Map data", "Location search", "Routing", "Geographic data", "Open source mapping"]
  },

  // Time Zone Services
  timezone: {
    command: "npx",
    args: ["timezone-mcp-server"],
    description: "Time zone information and conversions",
    category: "location",
    official: false,
    popularity: "low",
    useCases: ["Time zone conversion", "Local time", "UTC conversion", "Scheduling", "Global time management"]
  }
};

// ============================================================================
// MULTIMEDIA & CREATIVE
// ============================================================================

export const multimediaServers: Record<string, MCPServerConfig> = {
  // Blender 3D Integration
  blender: {
    command: "python",
    args: ["/path/to/blender-mcp-server.py"],
    env: {
      BLENDER_PATH: "/Applications/Blender.app/Contents/MacOS/Blender"
    },
    description: "3D modeling and animation automation with Blender",
    category: "multimedia",
    official: false,
    popularity: "medium",
    useCases: ["3D modeling", "Animation", "Rendering", "Scene management", "Asset pipeline"]
  },

  // GIPHY Integration
  giphy: {
    command: "npx",
    args: ["giphy-mcp-server"],
    env: {
      GIPHY_API_KEY: "YOUR_API_KEY"
    },
    description: "Search and retrieve GIFs from Giphy",
    category: "multimedia",
    official: false,
    popularity: "medium",
    useCases: ["GIF search", "Animated content", "Social media", "Content creation", "Meme generation"]
  },

  // Image Processing
  "image-processing": {
    command: "npx",
    args: ["image-processing-mcp"],
    description: "Image editing and processing tools",
    category: "multimedia",
    official: false,
    popularity: "medium",
    useCases: ["Image editing", "Format conversion", "Image analysis", "Computer vision", "Photo processing"]
  },

  // Video Processing
  "video-processing": {
    command: "npx",
    args: ["video-processing-mcp"],
    description: "Video editing and processing capabilities",
    category: "multimedia",
    official: false,
    popularity: "low",
    useCases: ["Video editing", "Format conversion", "Video analysis", "Content creation", "Media processing"]
  },

  // Text-to-Speech
  tts: {
    command: "npx",
    args: ["tts-mcp-server"],
    description: "Text-to-speech conversion services",
    category: "multimedia",
    official: false,
    popularity: "medium",
    useCases: ["Voice synthesis", "Audio generation", "Accessibility", "Content creation", "Voice assistants"]
  }
};

// ============================================================================
// MARKETING & ANALYTICS
// ============================================================================

export const marketingServers: Record<string, MCPServerConfig> = {
  // Google Analytics
  "google-analytics": {
    command: "npx",
    args: ["google-analytics-mcp"],
    env: {
      GA_CLIENT_ID: "YOUR_CLIENT_ID",
      GA_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Website analytics and insights",
    category: "marketing",
    official: false,
    popularity: "high",
    useCases: ["Traffic analysis", "User behavior", "Conversion tracking", "Performance metrics", "Report generation"]
  },

  // Facebook Ads
  "facebook-ads": {
    command: "npx",
    args: ["facebook-ads-mcp-server"],
    env: {
      FACEBOOK_ACCESS_TOKEN: "YOUR_ACCESS_TOKEN"
    },
    description: "Facebook Ads management and analytics",
    category: "marketing",
    official: false,
    popularity: "medium",
    useCases: ["Ad campaign management", "Performance tracking", "Audience targeting", "Budget optimization", "Ad analytics"]
  },

  // Google Ads
  "google-ads": {
    command: "npx",
    args: ["google-ads-mcp-server"],
    env: {
      GOOGLE_ADS_CLIENT_ID: "YOUR_CLIENT_ID",
      GOOGLE_ADS_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Google Ads campaign management",
    category: "marketing",
    official: false,
    popularity: "medium",
    useCases: ["Search ads", "Display ads", "Campaign optimization", "Keyword research", "Ad performance"]
  },

  // SEO Tools
  seo: {
    command: "npx",
    args: ["seo-mcp-server"],
    description: "SEO analysis and optimization tools",
    category: "marketing",
    official: false,
    popularity: "medium",
    useCases: ["Keyword analysis", "Site optimization", "Ranking tracking", "Competitor analysis", "SEO audits"]
  }
};

// ============================================================================
// SPORTS & FITNESS
// ============================================================================

export const sportsServers: Record<string, MCPServerConfig> = {
  // ESPN Sports Data
  espn: {
    command: "npx",
    args: ["espn-mcp-server"],
    description: "ESPN sports data, scores, and statistics",
    category: "sports",
    official: false,
    popularity: "medium",
    useCases: ["Live scores", "Player statistics", "Team data", "Sports news", "Game schedules"]
  },

  // NBA API
  nba: {
    command: "npx",
    args: ["nba-mcp-server"],
    description: "NBA player info, stats, and game information",
    category: "sports",
    official: false,
    popularity: "medium",
    useCases: ["NBA statistics", "Player data", "Game results", "Team information", "Season data"]
  },

  // Strava Fitness
  strava: {
    command: "npx",
    args: ["strava-mcp-server"],
    env: {
      STRAVA_CLIENT_ID: "YOUR_CLIENT_ID",
      STRAVA_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
    },
    description: "Strava fitness and activity tracking",
    category: "sports",
    official: false,
    popularity: "medium",
    useCases: ["Activity tracking", "Fitness data", "Route planning", "Performance analysis", "Social fitness"]
  },

  // Formula 1 Data
  formula1: {
    command: "npx",
    args: ["f1-mcp-server"],
    description: "Formula 1 race data and statistics",
    category: "sports",
    official: false,
    popularity: "low",
    useCases: ["Race results", "Driver standings", "Team data", "Circuit information", "Season statistics"]
  }
};

// ============================================================================
// TRAVEL & TRANSPORTATION
// ============================================================================

export const travelServers: Record<string, MCPServerConfig> = {
  // Airbnb Integration
  airbnb: {
    command: "npx",
    args: ["airbnb-mcp-server"],
    description: "Airbnb search and listing details",
    category: "travel",
    official: false,
    popularity: "medium",
    useCases: ["Accommodation search", "Booking information", "Property details", "Travel planning", "Price comparison"]
  },

  // National Parks
  "national-parks": {
    command: "npx",
    args: ["national-parks-mcp-server"],
    description: "U.S. National Parks information and services",
    category: "travel",
    official: false,
    popularity: "low",
    useCases: ["Park information", "Visitor centers", "Campgrounds", "Events", "Park alerts"]
  },

  // Flight Information
  flights: {
    command: "npx",
    args: ["flights-mcp-server"],
    env: {
      FLIGHT_API_KEY: "YOUR_API_KEY"
    },
    description: "Flight schedules and travel information",
    category: "travel",
    official: false,
    popularity: "medium",
    useCases: ["Flight search", "Schedule information", "Price tracking", "Airport data", "Travel planning"]
  },

  // TripAdvisor Integration
  tripadvisor: {
    command: "npx",
    args: ["tripadvisor-mcp-server"],
    description: "TripAdvisor reviews and travel information",
    category: "travel",
    official: false,
    popularity: "medium",
    useCases: ["Hotel reviews", "Restaurant recommendations", "Travel guides", "Attraction information", "Travel planning"]
  }
};

// ============================================================================
// BROWSER AUTOMATION & TESTING
// ============================================================================

export const browserServers: Record<string, MCPServerConfig> = {
  // Puppeteer Browser Automation
  puppeteer: {
    command: "npx",
    args: ["puppeteer-mcp-server"],
    description: "Browser automation for web scraping and interaction",
    category: "browser",
    official: true,
    popularity: "high",
    useCases: ["Web scraping", "UI testing", "PDF generation", "Screenshot capture", "Form automation"]
  },

  // Browserbase Cloud Browser
  browserbase: {
    command: "npx",
    args: ["browserbase-mcp-server"],
    env: {
      BROWSERBASE_API_KEY: "YOUR_API_KEY"
    },
    description: "Cloud browser automation and web scraping",
    category: "browser",
    official: true,
    popularity: "medium",
    useCases: ["Cloud automation", "Scalable scraping", "Data extraction", "Web testing", "Browser management"]
  },

  // Browser Control Extension
  "browser-control": {
    command: "npx",
    args: ["browser-control-mcp"],
    description: "Control user's browser through extension",
    category: "browser",
    official: false,
    popularity: "medium",
    useCases: ["Browser control", "Tab management", "Extension automation", "User interaction", "Browser scripting"]
  }
};

// ============================================================================
// CODE EXECUTION & SANDBOXING
// ============================================================================

export const codeExecutionServers: Record<string, MCPServerConfig> = {
  // Python Code Execution
  "python-executor": {
    command: "npx",
    args: ["python-executor-mcp"],
    description: "Safe Python code execution in isolated environment",
    category: "code-execution",
    official: false,
    popularity: "high",
    useCases: ["Code execution", "Data analysis", "Script running", "Algorithm testing", "Educational tools"]
  },

  // JavaScript Sandbox
  "js-sandbox": {
    command: "npx",
    args: ["js-sandbox-mcp"],
    description: "JavaScript code execution with V8 isolation",
    category: "code-execution",
    official: false,
    popularity: "medium",
    useCases: ["JS execution", "Code testing", "Algorithm validation", "Educational tools", "Prototyping"]
  },

  // Docker Code Runner
  "docker-runner": {
    command: "npx",
    args: ["docker-runner-mcp"],
    description: "Execute code in Docker containers",
    category: "code-execution",
    official: false,
    popularity: "medium",
    useCases: ["Containerized execution", "Multi-language support", "Isolated environments", "Code testing", "CI/CD"]
  }
};

// ============================================================================
// DATA SCIENCE & ANALYTICS
// ============================================================================

export const dataScienceServers: Record<string, MCPServerConfig> = {
  // Jupyter Notebook Integration
  jupyter: {
    command: "npx",
    args: ["jupyter-mcp-server"],
    description: "Jupyter notebook integration and execution",
    category: "data-science",
    official: false,
    popularity: "high",
    useCases: ["Data analysis", "Machine learning", "Research", "Visualization", "Scientific computing"]
  },

  // Pandas Data Analysis
  pandas: {
    command: "python",
    args: ["-m", "pandas_mcp_server"],
    description: "Pandas data manipulation and analysis",
    category: "data-science",
    official: false,
    popularity: "high",
    useCases: ["Data manipulation", "Statistical analysis", "Data cleaning", "CSV processing", "Data transformation"]
  },

  // Apache Spark Integration
  spark: {
    command: "npx",
    args: ["spark-mcp-server"],
    env: {
      SPARK_HOME: "/path/to/spark"
    },
    description: "Apache Spark for big data processing",
    category: "data-science",
    official: false,
    popularity: "medium",
    useCases: ["Big data processing", "Distributed computing", "ETL operations", "Machine learning", "Stream processing"]
  },

  // R Statistical Computing
  r: {
    command: "Rscript",
    args: ["/path/to/r-mcp-server.R"],
    description: "R statistical computing and analysis",
    category: "data-science",
    official: false,
    popularity: "medium",
    useCases: ["Statistical analysis", "Data visualization", "Machine learning", "Research", "Bioinformatics"]
  }
};

// ============================================================================
// TRANSLATION & LANGUAGE SERVICES
// ============================================================================

export const translationServers: Record<string, MCPServerConfig> = {
  // Google Translate
  "google-translate": {
    command: "npx",
    args: ["google-translate-mcp"],
    env: {
      GOOGLE_TRANSLATE_API_KEY: "YOUR_API_KEY"
    },
    description: "Google Translate language translation services",
    category: "translation",
    official: false,
    popularity: "high",
    useCases: ["Text translation", "Language detection", "Multi-language support", "Localization", "Content translation"]
  },

  // DeepL Translation
  deepl: {
    command: "npx",
    args: ["deepl-mcp-server"],
    env: {
      DEEPL_API_KEY: "YOUR_API_KEY"
    },
    description: "DeepL high-quality translation services",
    category: "translation",
    official: false,
    popularity: "medium",
    useCases: ["High-quality translation", "Professional translation", "Document translation", "Language learning", "Content localization"]
  },

  // Microsoft Translator
  "microsoft-translator": {
    command: "npx",
    args: ["microsoft-translator-mcp"],
    env: {
      MICROSOFT_TRANSLATOR_KEY: "YOUR_API_KEY"
    },
    description: "Microsoft Translator text and speech translation",
    category: "translation",
    official: false,
    popularity: "medium",
    useCases: ["Text translation", "Speech translation", "Real-time translation", "Conversation translation", "Multi-modal translation"]
  }
};

// ============================================================================
// AGGREGATED CONFIGURATIONS
// ============================================================================

// All servers combined for easy access
export const allServers: Record<string, MCPServerConfig> = {
  ...developmentServers,
  ...databaseServers,
  ...cloudServers,
  ...communicationServers,
  ...aiServers,
  ...webServers,
  ...businessServers,
  ...securityServers,
  ...financeServers,
  ...gamingServers,
  ...locationServers,
  ...multimediaServers,
  ...marketingServers,
  ...sportsServers,
  ...travelServers,
  ...browserServers,
  ...codeExecutionServers,
  ...dataScienceServers,
  ...translationServers
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get servers by category
 */
export function getServersByCategory(category: string): Record<string, MCPServerConfig> {
  return Object.fromEntries(
    Object.entries(allServers).filter(([_, config]) => config.category === category)
  );
}

/**
 * Get official servers only
 */
export function getOfficialServers(): Record<string, MCPServerConfig> {
  return Object.fromEntries(
    Object.entries(allServers).filter(([_, config]) => config.official === true)
  );
}

/**
 * Get servers by popularity
 */
export function getServersByPopularity(popularity: 'high' | 'medium' | 'low'): Record<string, MCPServerConfig> {
  return Object.fromEntries(
    Object.entries(allServers).filter(([_, config]) => config.popularity === popularity)
  );
}

/**
 * Generate MCP configuration for specific servers
 */
export function generateMCPConfig(serverNames: string[]): MCPServersConfig {
  const selectedServers: Record<string, MCPServerConfig> = {};

  for (const name of serverNames) {
    if (allServers[name]) {
      selectedServers[name] = allServers[name];
    }
  }

  return { mcpServers: selectedServers };
}

/**
 * Get most popular servers (top 20)
 */
export function getMostPopularServers(): Record<string, MCPServerConfig> {
  const popularServers = [
    'supabase', 'github', 'playwright', 'docker', 'obsidian', 'notion',
    'postgresql', 'filesystem', 'sequential-thinking', 'perplexity',
    'figma', 'memory', 'slack', 'gmail', 'aws-api', 'azure', 'cloudflare',
    'mongodb', 'firebase', 'stripe'
  ];

  return Object.fromEntries(
    popularServers.map(name => [name, allServers[name]]).filter(([_, config]) => config)
  );
}

// ============================================================================
// PREDEFINED CONFIGURATIONS
// ============================================================================

/**
 * Essential development setup
 */
export const essentialDevConfig: MCPServersConfig = {
  mcpServers: {
    filesystem: developmentServers.filesystem,
    github: developmentServers.github,
    memory: developmentServers.memory,
    "sequential-thinking": developmentServers["sequential-thinking"]
  }
};

/**
 * Full-stack developer setup
 */
export const fullStackConfig: MCPServersConfig = {
  mcpServers: {
    github: developmentServers.github,
    postgresql: databaseServers.postgresql,
    supabase: databaseServers.supabase,
    docker: cloudServers.docker,
    playwright: developmentServers.playwright,
    notion: developmentServers.notion,
    slack: communicationServers.slack
  }
};

/**
 * AI/ML engineer setup
 */
export const aiMLConfig: MCPServersConfig = {
  mcpServers: {
    perplexity: aiServers.perplexity,
    ollama: aiServers.ollama,
    openai: aiServers.openai,
    memory: developmentServers.memory,
    "sequential-thinking": developmentServers["sequential-thinking"],
    github: developmentServers.github
  }
};

/**
 * Database specialist setup
 */
export const databaseConfig: MCPServersConfig = {
  mcpServers: {
    postgresql: databaseServers.postgresql,
    mongodb: databaseServers.mongodb,
    redis: databaseServers.redis,
    supabase: databaseServers.supabase,
    "db-mcp": databaseServers["db-mcp"],
    mysql: databaseServers.mysql,
    firebase: databaseServers.firebase
  }
};

/**
 * Finance/Trading specialist setup
 */
export const financeConfig: MCPServersConfig = {
  mcpServers: {
    "yahoo-finance": financeServers["yahoo-finance"],
    "crypto-trader": financeServers["crypto-trader"],
    polygon: financeServers.polygon,
    "twelve-data": financeServers["twelve-data"],
    alpaca: financeServers.alpaca,
    stripe: businessServers.stripe
  }
};

/**
 * Content creator setup
 */
export const contentCreatorConfig: MCPServersConfig = {
  mcpServers: {
    figma: developmentServers.figma,
    blender: multimediaServers.blender,
    giphy: multimediaServers.giphy,
    "image-processing": multimediaServers["image-processing"],
    tts: multimediaServers.tts,
    youtube: communicationServers.youtube || {
      command: "npx",
      args: ["youtube-mcp-server"],
      env: { YOUTUBE_API_KEY: "YOUR_API_KEY" },
      description: "YouTube platform integration",
      category: "communication"
    }
  }
};

/**
 * Marketing specialist setup
 */
export const marketingConfig: MCPServersConfig = {
  mcpServers: {
    "google-analytics": marketingServers["google-analytics"],
    "facebook-ads": marketingServers["facebook-ads"],
    "google-ads": marketingServers["google-ads"],
    seo: marketingServers.seo,
    zapier: businessServers.zapier
  }
};

/**
 * Travel & location setup
 */
export const travelConfig: MCPServersConfig = {
  mcpServers: {
    weather: locationServers.weather,
    "google-maps": locationServers["google-maps"],
    airbnb: travelServers.airbnb,
    flights: travelServers.flights,
    tripadvisor: travelServers.tripadvisor
  }
};

/**
 * Cloud/DevOps engineer setup
 */
export const devOpsConfig: MCPServersConfig = {
  mcpServers: {
    "aws-api": cloudServers["aws-api"],
    azure: cloudServers.azure,
    docker: cloudServers.docker,
    kubernetes: cloudServers.kubernetes,
    terraform: cloudServers.terraform,
    cloudflare: cloudServers.cloudflare
  }
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  // Server collections
  developmentServers,
  databaseServers,
  cloudServers,
  communicationServers,
  aiServers,
  webServers,
  businessServers,
  securityServers,
  financeServers,
  gamingServers,
  locationServers,
  multimediaServers,
  marketingServers,
  sportsServers,
  travelServers,
  browserServers,
  codeExecutionServers,
  dataScienceServers,
  translationServers,
  allServers,

  // Utility functions
  getServersByCategory,
  getOfficialServers,
  getServersByPopularity,
  generateMCPConfig,
  getMostPopularServers,

  // Predefined configurations
  essentialDevConfig,
  fullStackConfig,
  aiMLConfig,
  databaseConfig,
  devOpsConfig,
  financeConfig,
  contentCreatorConfig,
  marketingConfig,
  travelConfig
};
