// Import all rule files
import { nextjsRules } from '../rules/nextjs'
import { pythonRules } from '../rules/python'
import { reactNativeRules } from '../rules/react-native'
import { typescriptRules } from '../rules/typescript'
import { goRules } from '../rules/go'
import { rustRules } from '../rules/rust'
import { javaRules } from '../rules/java'
import { cppRules } from '../rules/cpp'
import { cRules } from '../rules/c'
import { swiftRules } from '../rules/swift'
import { flutterRules } from '../rules/flutter'
import { angularRules } from '../rules/angular'
import { vueRules } from '../rules/vue'
import { svelteRules } from '../rules/svelte'
import { svelteKitRules } from '../rules/sveltekit'
import { astroRules } from '../rules/astro'
import { remixRules } from '../rules/remix'
import { nuxtjsRules } from '../rules/nuxtjs'
import { djangoRules } from '../rules/django'
import { fastApiRules } from '../rules/fastapi'
import { flaskRules } from '../rules/flask'
import { laravelRules } from '../rules/laravel'
import { railsRules } from '../rules/rails'
import { nestjsRules } from '../rules/nestjs'
import { fastifyRules } from '../rules/fastify'
import { dotnetRules } from '../rules/dotnet'
import { blazorRules } from '../rules/blazor'
import { ionicRules } from '../rules/ionic'
import { expoRules } from '../rules/expo'
import { tauriRules } from '../rules/tauri'
import { elixirRules } from '../rules/elixir'
import { luaRules } from '../rules/lua'
import { juliaRules } from '../rules/julia'
import { solidityRules } from '../rules/solidity'
import { solanaRules } from '../rules/solana'
import { cosmwasmRules } from '../rules/cosmwasm'
import { onchainKitRules } from '../rules/onchainkit'
import { terraformRules } from '../rules/terraform'
import { cloudflareRules } from '../rules/cloudflare'
import { devopsBackendRules } from '../rules/devops-backend'
import { edgeComputingRules } from '../rules/edge-computing'
import { aiMl2025Rules } from '../rules/ai-ml-2025'
import { deepLearningRules } from '../rules/deep-learning'
import { jaxRules } from '../rules/jax'
import { dataAnalystRules } from '../rules/data-analyst'
import { pythonDataScienceRules } from '../rules/python-data-science'
import { pythonMachineLearningRules } from '../rules/python-machine-learning'
import { pythonDataProcessingRules } from '../rules/python-data-processing'
import { pythonWebModernRules } from '../rules/python-web-modern'
import { webDevelopmentRules } from '../rules/web-development'
import { frontEndRules } from '../rules/front-end'
import { modernCssRules } from '../rules/modern-css'
import { htmlAndCssRules } from '../rules/htmlandcss'
import { htmxRules } from '../rules/htmx'
import { bootstrapRules } from '../rules/bootstrap'
import { ghostTailwindCssRules } from '../rules/ghost-tailwindcss'
import { wordpressRules } from '../rules/wordpress'
import { wordpressWoocommerceRules } from '../rules/wordpress-woocommerce'
import { drupalRules } from '../rules/drupal'
import { jekyllRules } from '../rules/jekyll'
import { gatsbyRules } from '../rules/gastby'
import { chromeExtensionRules } from '../rules/chrome-extension'
import { androidRules } from '../rules/android'
import { unityCSharpRules } from '../rules/unity-c-sharp'
import { pixijsRules } from '../rules/pixijs'
import { viewComfyRules } from '../rules/viewcomfy'
import { playwrightRules } from '../rules/playwright'
import { webScrapingRules } from '../rules/web-scraping'
import { prismaRules } from '../rules/prisma'
import { convexRules } from '../rules/convex'
import { sanityRules } from '../rules/sanity'
import { bunRules } from '../rules/bun'
import { denoRules } from '../rules/deno'
import { autohotkeyRules } from '../rules/autohotkey'
import { arduinoFrameworkRules } from '../rules/arduino-framework'
import { vivadoRules } from '../rules/vivado'
import { abapRules } from '../rules/abap'
import { abapFundamentalsRules } from '../rules/abap-fundamentals'
import { abapPerformanceRules } from '../rules/abap-performance'
import { alRules } from '../rules/al'
import { salesforceRules } from '../rules/salesforce'
import { odooRules } from '../rules/odoo'
import { robocorpRules } from '../rules/robocorp'
import { rspecRules } from '../rules/rspec'
import { railsApiRules } from '../rules/rails-api'
import { rustWasmRules } from '../rules/rust-wasm'
import { techStackRules } from '../rules/tech-stack'
import { technicalTutorialsRules } from '../rules/technical-tutorials'
import { uiuxDesignRules } from '../rules/uiux-design'
import { metaPromptRules } from '../rules/meta-prompt'
import { openApiUserStoryRules } from '../rules/open-api-user-story'
import { globalRules } from '../rules/global'
import { manifestRules } from '../rules/manifest'
import { angularIonicFirebaseFirestoreRules } from '../rules/angular-ionic-firebase-firestore'
import { monorepoTamaguiRules } from '../rules/monorepo-tamagui'

export interface Rule {
  id: string
  title: string
  description: string
  language: string
  category: string
  tags: string[]
  libs: string[]
  slug: string
  content: string
}

// Helper function to extract language from tags or filename
function extractLanguage(tags: string[], slug: string): string {
  // Common language mappings
  const languageMap: { [key: string]: string } = {
    'nextjs': 'Next.js',
    'react': 'React',
    'python': 'Python',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'go': 'Go',
    'rust': 'Rust',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'swift': 'Swift',
    'flutter': 'Flutter',
    'angular': 'Angular',
    'vue': 'Vue.js',
    'svelte': 'Svelte',
    'astro': 'Astro',
    'remix': 'Remix',
    'nuxt': 'Nuxt.js',
    'django': 'Django',
    'fastapi': 'FastAPI',
    'flask': 'Flask',
    'laravel': 'Laravel',
    'rails': 'Ruby on Rails',
    'nestjs': 'NestJS',
    'dotnet': '.NET',
    'blazor': 'Blazor',
    'ionic': 'Ionic',
    'expo': 'Expo',
    'tauri': 'Tauri',
    'elixir': 'Elixir',
    'lua': 'Lua',
    'julia': 'Julia',
    'solidity': 'Solidity',
    'solana': 'Solana',
    'terraform': 'Terraform',
    'css': 'CSS',
    'html': 'HTML',
    'htmx': 'HTMX',
    'bootstrap': 'Bootstrap',
    'wordpress': 'WordPress',
    'drupal': 'Drupal',
    'jekyll': 'Jekyll',
    'gatsby': 'Gatsby',
    'android': 'Android',
    'unity': 'Unity',
    'pixijs': 'PixiJS',
    'playwright': 'Playwright',
    'prisma': 'Prisma',
    'bun': 'Bun',
    'deno': 'Deno',
    'autohotkey': 'AutoHotkey',
    'arduino': 'Arduino',
    'abap': 'ABAP',
    'salesforce': 'Salesforce',
    'odoo': 'Odoo'
  }

  // Check tags first
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase()
    if (languageMap[lowerTag]) {
      return languageMap[lowerTag]
    }
  }

  // Check slug
  for (const [key, value] of Object.entries(languageMap)) {
    if (slug.toLowerCase().includes(key)) {
      return value
    }
  }

  return 'General'
}

// Helper function to extract category
function extractCategory(tags: string[], libs: string[], slug: string): string {
  const categoryKeywords = {
    'Frontend': ['react', 'vue', 'angular', 'svelte', 'frontend', 'ui', 'css', 'html'],
    'Backend': ['django', 'fastapi', 'flask', 'rails', 'nestjs', 'backend', 'api'],
    'Mobile': ['react-native', 'flutter', 'ionic', 'expo', 'android', 'swift'],
    'Web Framework': ['nextjs', 'nuxt', 'remix', 'astro', 'sveltekit'],
    'Database': ['prisma', 'mongodb', 'postgresql', 'mysql', 'database'],
    'DevOps': ['terraform', 'docker', 'kubernetes', 'cloudflare', 'devops'],
    'AI/ML': ['ai', 'ml', 'machine-learning', 'deep-learning', 'data-science'],
    'Blockchain': ['solidity', 'solana', 'cosmwasm', 'blockchain', 'web3'],
    'Desktop': ['tauri', 'electron', 'unity', 'desktop'],
    'Testing': ['playwright', 'jest', 'testing', 'rspec'],
    'Styling': ['css', 'tailwind', 'bootstrap', 'styling', 'design'],
    'CMS': ['wordpress', 'drupal', 'sanity', 'cms'],
    'Tools': ['webpack', 'vite', 'bundler', 'tools', 'automation']
  }

  const allText = [...tags, ...libs, slug].join(' ').toLowerCase()

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => allText.includes(keyword))) {
      return category
    }
  }

  return 'General'
}

// Convert rule format to our interface
function convertRule(rule: any, index: number): Rule {
  const language = extractLanguage(rule.tags || [], rule.slug || '')
  const category = extractCategory(rule.tags || [], rule.libs || [], rule.slug || '')

  // Removed fake ratings and downloads for better performance

  // Normalize line endings to prevent hydration issues
  const normalizeText = (text: string) => text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  const normalizedContent = rule.content ? normalizeText(rule.content) : ''
  const description = normalizedContent
    ? normalizedContent.substring(0, 200).replace(/\n+/g, ' ').trim() + '...'
    : 'No description available'

  return {
    id: `${rule.slug || 'rule'}-${index}`,
    title: rule.title || 'Untitled Rule',
    description,
    language,
    category,
    tags: rule.tags || [],
    libs: rule.libs || [],
    slug: rule.slug || '',
    content: normalizedContent
  }
}

// Combine all rules
export function getAllRules(): Rule[] {
  const allRuleCollections = [
    nextjsRules, pythonRules, reactNativeRules, typescriptRules, goRules, rustRules,
    javaRules, cppRules, cRules, swiftRules, flutterRules, angularRules, vueRules,
    svelteRules, svelteKitRules, astroRules, remixRules, nuxtjsRules, djangoRules,
    fastApiRules, flaskRules, laravelRules, railsRules, nestjsRules, fastifyRules,
    dotnetRules, blazorRules, ionicRules, expoRules, tauriRules, elixirRules,
    luaRules, juliaRules, solidityRules, solanaRules, cosmwasmRules, onchainKitRules,
    terraformRules, cloudflareRules, devopsBackendRules, edgeComputingRules,
    aiMl2025Rules, deepLearningRules, jaxRules, dataAnalystRules, pythonDataScienceRules,
    pythonMachineLearningRules, pythonDataProcessingRules, pythonWebModernRules,
    webDevelopmentRules, frontEndRules, modernCssRules, htmlAndCssRules, htmxRules,
    bootstrapRules, ghostTailwindCssRules, wordpressRules, wordpressWoocommerceRules,
    drupalRules, jekyllRules, gatsbyRules, chromeExtensionRules, androidRules,
    unityCSharpRules, pixijsRules, viewComfyRules, playwrightRules, webScrapingRules,
    prismaRules, convexRules, sanityRules, bunRules, denoRules, autohotkeyRules,
    arduinoFrameworkRules, vivadoRules, abapRules, abapFundamentalsRules,
    abapPerformanceRules, alRules, salesforceRules, odooRules, robocorpRules,
    rspecRules, railsApiRules, rustWasmRules, techStackRules, technicalTutorialsRules,
    uiuxDesignRules, metaPromptRules, openApiUserStoryRules, globalRules,
    manifestRules, angularIonicFirebaseFirestoreRules, monorepoTamaguiRules
  ]

  const allRules: Rule[] = []
  
  allRuleCollections.forEach((collection, collectionIndex) => {
    if (Array.isArray(collection)) {
      collection.forEach((rule, ruleIndex) => {
        allRules.push(convertRule(rule, collectionIndex * 1000 + ruleIndex))
      })
    }
  })

  return allRules
}

// Get unique languages
export function getLanguages(): string[] {
  const rules = getAllRules()
  const languages = new Set(rules.map(rule => rule.language))
  return ['All', ...Array.from(languages).sort()]
}

// Get unique categories
export function getCategories(): string[] {
  const rules = getAllRules()
  const categories = new Set(rules.map(rule => rule.category))
  return ['All', ...Array.from(categories).sort()]
}
