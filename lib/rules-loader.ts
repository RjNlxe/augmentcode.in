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
import { swiftuiRules as swiftRules } from '../rules/swift'
import { flutterRules } from '../rules/flutter'
import { angularRules } from '../rules/angular'
import { vueTsRules as vueRules } from '../rules/vue'
import { svelteRules } from '../rules/svelte'
import { svelteKitRules } from '../rules/sveltekit'
import { astroRules } from '../rules/astro'
import { remixRules } from '../rules/remix'
import { nuxtJsRules as nuxtjsRules } from '../rules/nuxtjs'
import { djangoRules } from '../rules/django'
import { fastapiRules as fastApiRules } from '../rules/fastapi'
import { flaskRules } from '../rules/flask'
import { laravelRules } from '../rules/laravel'
import { railsRules } from '../rules/rails'
import { nestjsRules } from '../rules/nestjs'
import { fastifyRules } from '../rules/fastify'
import { dotnetRules } from '../rules/dotnet'
import { blazorRules } from '../rules/blazor'
import { ionicRules } from '../rules/ionic'
import { tauriRules } from '../rules/tauri'
import { elixirRules } from '../rules/elixir'
import { luaRules } from '../rules/lua'
import { juliaRules } from '../rules/julia'
import { solidityRules } from '../rules/solidity'
import { solanaRules } from '../rules/solana'
import { cosmwasmRules } from '../rules/cosmwasm'
import { terraformRules } from '../rules/terraform'
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
import { htmlAndCssRules } from '../rules/htmlandcss'
import { modernCssRules } from '../rules/modern-css'
import { htmxRules } from '../rules/htmx'
import { bootstrapRules } from '../rules/bootstrap'
import { techStackRules } from '../rules/tech-stack'
import { wordpressRules } from '../rules/wordpress'
import { drupalRules } from '../rules/drupal'
import { sanityRules } from '../rules/sanity'
import { jekyllRules } from '../rules/jekyll'
import { playwrightRules } from '../rules/playwright'
import { webScrapingRules } from '../rules/web-scraping'
import { chromeExtensionRules } from '../rules/chrome-extension'
import { salesforceRules } from '../rules/salesforce'
import { odooRules } from '../rules/odoo'
import { bunRules } from '../rules/bun'
import { denoRules } from '../rules/deno'
import { convexRules } from '../rules/convex'
import { prismaRules } from '../rules/prisma'
import { robocorpRules } from '../rules/robocorp'
import { rspecRules } from '../rules/rspec'
import { abapFundamentalsRules } from '../rules/abap-fundamentals'
import { abapPerformanceRules } from '../rules/abap-performance'
import { androidRules } from '../rules/android'
import { arduinoFrameworkRules } from '../rules/arduino-framework'
import { angularIonicFirebaseFirestoreRules } from '../rules/angular-ionic-firebase-firestore'
import { unityCSharpRules } from '../rules/unity-c-sharp'
import { vivadoRules } from '../rules/vivado'
import { technicalTutorialsRules } from '../rules/technical-tutorials'
import { rustWasmRules } from '../rules/rust-wasm'
import { openApiUserStoryRules } from '../rules/open-api-user-story'
import { metaPromptRules } from '../rules/meta-prompt'
import { globalRules } from '../rules/global'

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

// Helper function to extract rules from various formats
function extractRules(rulesData: any, collectionName: string): Rule[] {
  if (Array.isArray(rulesData)) {
    return rulesData.map((rule, index) => normalizeRule(rule, index, collectionName))
  }
  if (rulesData && typeof rulesData === 'object') {
    // Handle different export formats
    const values = Object.values(rulesData)
    const firstValue = values[0]
    if (Array.isArray(firstValue)) {
      return firstValue.map((rule, index) => normalizeRule(rule, index, collectionName))
    }
  }
  return []
}

// Helper function to normalize rule data with unique IDs
function normalizeRule(rule: any, index: number, collectionName: string): Rule {
  // Create a more unique ID by combining collection name, index, and a cleaned title
  const titleSlug = rule.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'untitled'
  const uniqueId = `${collectionName}-${index}-${titleSlug.substring(0, 30)}`

  const normalizedRule: Rule = {
    id: uniqueId,
    title: rule.title || 'Untitled Rule',
    description: rule.description || (rule.content ? rule.content.substring(0, 200).replace(/\n+/g, ' ').trim() + '...' : 'No description available'),
    language: extractLanguageFromRule(rule),
    category: extractCategoryFromRule(rule),
    tags: Array.isArray(rule.tags) ? rule.tags : [],
    libs: Array.isArray(rule.libs) ? rule.libs : [],
    slug: rule.slug || `${collectionName}-rule-${index}`,
    content: rule.content || ''
  }
  return normalizedRule
}

// Helper function to extract language from rule
function extractLanguageFromRule(rule: any): string {
  if (rule.tags && Array.isArray(rule.tags)) {
    const languageMap: { [key: string]: string } = {
      'JavaScript': 'JavaScript',
      'TypeScript': 'TypeScript',
      'Python': 'Python',
      'React': 'React',
      'Next.js': 'Next.js',
      'Vue.js': 'Vue.js',
      'Vue': 'Vue.js',
      'Angular': 'Angular',
      'Django': 'Django',
      'FastAPI': 'FastAPI',
      'Go': 'Go',
      'Rust': 'Rust',
      'Java': 'Java',
      'C++': 'C++',
      'Swift': 'Swift',
      'PHP': 'PHP',
      'Ruby': 'Ruby',
      'C#': 'C#',
      'Kotlin': 'Kotlin',
      'Dart': 'Dart',
      'Flutter': 'Flutter',
      'React Native': 'React Native',
      'Node.js': 'Node.js',
      'Express': 'Node.js',
      'Svelte': 'Svelte',
      'Astro': 'Astro',
      'Remix': 'Remix',
      'Nuxt.js': 'Nuxt.js'
    }

    for (const tag of rule.tags) {
      if (languageMap[tag]) {
        return languageMap[tag]
      }
    }

    // If no exact match, return the first tag that looks like a language/framework
    const firstTag = rule.tags[0]
    if (firstTag && firstTag.length > 1) {
      return firstTag
    }
  }
  return 'General'
}

// Helper function to extract category from rule
function extractCategoryFromRule(rule: any): string {
  const content = (rule.content || '').toLowerCase()
  const tags = (rule.tags || []).join(' ').toLowerCase()
  const libs = (rule.libs || []).join(' ').toLowerCase()
  const title = (rule.title || '').toLowerCase()
  const allText = `${title} ${content} ${tags} ${libs}`

  // Frontend frameworks and libraries
  if (allText.includes('react') || allText.includes('vue') || allText.includes('angular') ||
      allText.includes('svelte') || allText.includes('frontend') || allText.includes('ui') ||
      allText.includes('component') || allText.includes('next.js') || allText.includes('nuxt') ||
      allText.includes('astro') || allText.includes('remix')) {
    return 'Frontend'
  }

  // Backend frameworks and technologies
  if (allText.includes('backend') || allText.includes('api') || allText.includes('server') ||
      allText.includes('django') || allText.includes('fastapi') || allText.includes('flask') ||
      allText.includes('express') || allText.includes('nestjs') || allText.includes('fastify') ||
      allText.includes('laravel') || allText.includes('rails')) {
    return 'Backend'
  }

  // Mobile development
  if (allText.includes('mobile') || allText.includes('ios') || allText.includes('android') ||
      allText.includes('flutter') || allText.includes('react native') || allText.includes('swift') ||
      allText.includes('kotlin') || allText.includes('ionic')) {
    return 'Mobile'
  }

  // Database and data storage
  if (allText.includes('database') || allText.includes('sql') || allText.includes('prisma') ||
      allText.includes('mongodb') || allText.includes('postgres') || allText.includes('mysql') ||
      allText.includes('redis') || allText.includes('orm')) {
    return 'Database'
  }

  // DevOps and infrastructure
  if (allText.includes('devops') || allText.includes('deploy') || allText.includes('infrastructure') ||
      allText.includes('terraform') || allText.includes('docker') || allText.includes('kubernetes') ||
      allText.includes('aws') || allText.includes('cloud') || allText.includes('ci/cd')) {
    return 'DevOps'
  }

  // AI/ML and data science
  if (allText.includes('machine learning') || allText.includes('ai') || allText.includes('neural') ||
      allText.includes('data science') || allText.includes('deep learning') || allText.includes('tensorflow') ||
      allText.includes('pytorch') || allText.includes('jax') || allText.includes('data analyst')) {
    return 'AI/ML'
  }

  // Testing
  if (allText.includes('test') || allText.includes('testing') || allText.includes('jest') ||
      allText.includes('cypress') || allText.includes('playwright') || allText.includes('rspec')) {
    return 'Testing'
  }

  // Security
  if (allText.includes('security') || allText.includes('auth') || allText.includes('encryption') ||
      allText.includes('oauth') || allText.includes('jwt')) {
    return 'Security'
  }

  return 'General'
}

// Pre-compute all rules at module load time for Vercel free tier optimization
const allRuleCollections = [
  { name: 'nextjs', rules: nextjsRules },
  { name: 'python', rules: pythonRules },
  { name: 'react-native', rules: reactNativeRules },
  { name: 'typescript', rules: typescriptRules },
  { name: 'go', rules: goRules },
  { name: 'rust', rules: rustRules },
  { name: 'java', rules: javaRules },
  { name: 'cpp', rules: cppRules },
  { name: 'c', rules: cRules },
  { name: 'swift', rules: swiftRules },
  { name: 'flutter', rules: flutterRules },
  { name: 'angular', rules: angularRules },
  { name: 'vue', rules: vueRules },
  { name: 'svelte', rules: svelteRules },
  { name: 'sveltekit', rules: svelteKitRules },
  { name: 'astro', rules: astroRules },
  { name: 'remix', rules: remixRules },
  { name: 'nuxtjs', rules: nuxtjsRules },
  { name: 'django', rules: djangoRules },
  { name: 'fastapi', rules: fastApiRules },
  { name: 'flask', rules: flaskRules },
  { name: 'laravel', rules: laravelRules },
  { name: 'rails', rules: railsRules },
  { name: 'nestjs', rules: nestjsRules },
  { name: 'fastify', rules: fastifyRules },
  { name: 'dotnet', rules: dotnetRules },
  { name: 'blazor', rules: blazorRules },
  { name: 'ionic', rules: ionicRules },
  { name: 'tauri', rules: tauriRules },
  { name: 'elixir', rules: elixirRules },
  { name: 'lua', rules: luaRules },
  { name: 'julia', rules: juliaRules },
  { name: 'solidity', rules: solidityRules },
  { name: 'solana', rules: solanaRules },
  { name: 'cosmwasm', rules: cosmwasmRules },
  { name: 'terraform', rules: terraformRules },
  { name: 'edge-computing', rules: edgeComputingRules },
  { name: 'ai-ml-2025', rules: aiMl2025Rules },
  { name: 'deep-learning', rules: deepLearningRules },
  { name: 'jax', rules: jaxRules },
  { name: 'data-analyst', rules: dataAnalystRules },
  { name: 'python-data-science', rules: pythonDataScienceRules },
  { name: 'python-machine-learning', rules: pythonMachineLearningRules },
  { name: 'python-data-processing', rules: pythonDataProcessingRules },
  { name: 'python-web-modern', rules: pythonWebModernRules },
  { name: 'web-development', rules: webDevelopmentRules },
  { name: 'front-end', rules: frontEndRules },
  { name: 'htmlandcss', rules: htmlAndCssRules },
  { name: 'modern-css', rules: modernCssRules },
  { name: 'htmx', rules: htmxRules },
  { name: 'bootstrap', rules: bootstrapRules },
  { name: 'tech-stack', rules: techStackRules },
  { name: 'wordpress', rules: wordpressRules },
  { name: 'drupal', rules: drupalRules },
  { name: 'sanity', rules: sanityRules },
  { name: 'jekyll', rules: jekyllRules },
  { name: 'playwright', rules: playwrightRules },
  { name: 'web-scraping', rules: webScrapingRules },
  { name: 'chrome-extension', rules: chromeExtensionRules },
  { name: 'salesforce', rules: salesforceRules },
  { name: 'odoo', rules: odooRules },
  { name: 'bun', rules: bunRules },
  { name: 'deno', rules: denoRules },
  { name: 'convex', rules: convexRules },
  { name: 'prisma', rules: prismaRules },
  { name: 'robocorp', rules: robocorpRules },
  { name: 'rspec', rules: rspecRules },
  { name: 'abap-fundamentals', rules: abapFundamentalsRules },
  { name: 'abap-performance', rules: abapPerformanceRules },
  { name: 'android', rules: androidRules },
  { name: 'arduino-framework', rules: arduinoFrameworkRules },
  { name: 'angular-ionic-firebase-firestore', rules: angularIonicFirebaseFirestoreRules },
  { name: 'unity-c-sharp', rules: unityCSharpRules },
  { name: 'vivado', rules: vivadoRules },
  { name: 'technical-tutorials', rules: technicalTutorialsRules },
  { name: 'rust-wasm', rules: rustWasmRules },
  { name: 'open-api-user-story', rules: openApiUserStoryRules },
  { name: 'meta-prompt', rules: metaPromptRules },
  { name: 'global', rules: globalRules },
]

// Pre-compute all rules at module initialization with performance optimization
const precomputedRules: Rule[] = (() => {
  const startTime = performance.now()
  const allRules: Rule[] = []
  const usedIds = new Set<string>()

  for (const collection of allRuleCollections) {
    if (collection.rules) {
      try {
        const rules = extractRules(collection.rules, collection.name)
        // Ensure unique IDs with optimized loop
        for (const rule of rules) {
          let finalId = rule.id
          let counter = 1
          while (usedIds.has(finalId)) {
            finalId = `${rule.id}-${counter}`
            counter++
          }
          rule.id = finalId
          usedIds.add(finalId)
          allRules.push(rule)
        }
      } catch (error) {
        console.warn(`Failed to load rules from ${collection.name}:`, error)
      }
    }
  }

  const endTime = performance.now()
  console.log(`Pre-loaded ${allRules.length} total rules in ${(endTime - startTime).toFixed(2)}ms for Vercel optimization`)
  return allRules
})()

// Pre-compute languages and categories for instant access
const precomputedLanguages: string[] = (() => {
  const languages = new Set<string>()
  precomputedRules.forEach(rule => {
    languages.add(rule.language)
  })
  return ['All', ...Array.from(languages).sort()]
})()

const precomputedCategories: string[] = (() => {
  const categories = new Set<string>()
  precomputedRules.forEach(rule => {
    categories.add(rule.category)
  })
  return ['All', ...Array.from(categories).sort()]
})()

export function getAllRules(): Rule[] {
  // Return pre-computed rules for instant access
  return precomputedRules
}

export function getLanguages(): string[] {
  // Return pre-computed languages for instant access
  return precomputedLanguages
}

export function getCategories(): string[] {
  // Return pre-computed categories for instant access
  return precomputedCategories
}
