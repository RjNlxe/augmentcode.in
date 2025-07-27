
// Simple slugify function to avoid external dependency
function slugify(text: string, _options?: { lower: boolean }): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

import { ABAPRules } from "./abap";
import { abapFundamentalsRules } from "./abap-fundamentals";
import { abapPerformanceRules } from "./abap-performance";
import { aiMl2025Rules } from "./ai-ml-2025";
import { ALRules } from "./al";
import { androidRules } from "./android";
import { angularRules } from "./angular";
import { angularIonicFirebaseFirestoreRules } from "./angular-ionic-firebase-firestore";
import { arduinoFrameworkRules } from "./arduino-framework";
import { astroRules } from "./astro";
import { autohotkeyRules } from "./autohotkey";
import { blazorRules } from "./blazor";
import { bootstrapRules } from "./bootstrap";
import { bunRules } from "./bun";
import { cRules } from "./c";
import { chromeExtensionRules } from "./chrome-extension";
import { convexRules } from "./convex";
import { cosmwasmRules } from "./cosmwasm";
import { cppRules } from "./cpp";
import { dataAnalystRules } from "./data-analyst";
import { deepLearningRules } from "./deep-learning";
import { denoRules } from "./deno";
import { devopsRules } from "./devops-backend";
import { djangoRules } from "./django";
import { dotnetRules } from "./dotnet";
import { drupalRules } from "./drupal";
import { edgeComputingRules } from "./edge-computing";
import { elixirRules } from "./elixir";
import { expoReactNativeRules } from "./expo";
import { fastapiRules } from "./fastapi";
import { fastifyRules } from "./fastify";
import { flaskRules } from "./flask";
import { flutterRules } from "./flutter";
import { frontEndRules } from "./front-end";
import { gatsbyRules } from "./gastby";
import { ghostTailwindcssRules } from "./ghost-tailwindcss";
import { globalRules } from "./global";
import { goRules } from "./go";
import { htmlAndCssRules } from "./htmlandcss";
import { htmxRules } from "./htmx";
import { ionicRules } from "./ionic";
import { javaRules } from "./java";
import { jaxRules } from "./jax";
import { juliaRules } from "./julia";
import { laravelRules } from "./laravel";
import { luaRules } from "./lua";
import { manifestRules } from "./manifest";
import { metaPromptRules } from "./meta-prompt";
import { modernCssRules } from "./modern-css";
import { monorepoTamagui } from "./monorepo-tamagui";
import { nestjsRules } from "./nestjs";
import { nextjsRules } from "./nextjs";
import { nuxtJsRules } from "./nuxtjs";
import { odooRules } from "./odoo";
import { onchainkitRules } from "./onchainkit";
import { openApiUserStoryRules } from "./open-api-user-story";
import { pixiJsRules } from "./pixijs";
import { playwrightRules } from "./playwright";
import { prismaRules } from "./prisma";
import { pythonRules } from "./python";
import { pythonDataScienceRules } from "./python-data-science";
import { pythonDataProcessingRules } from "./python-data-processing";
import { pythonMachineLearningRules } from "./python-machine-learning";
import { pythonWebModernRules } from "./python-web-modern";
import { railsRules } from "./rails";
import { reactNativeRules } from "./react-native";
import { remixRules } from "./remix";
import { robocorpRules } from "./robocorp";
import { rspecRules } from "./rspec";
import { rustRules } from "./rust";
import { rustWasmRules } from "./rust-wasm";
import { salesforceRules } from "./salesforce";
import { sanityRules } from "./sanity";
import { solanaRules } from "./solana";
import { solidityRules } from "./solidity";
import { svelteRules } from "./svelte";
import { svelteKitRules } from "./sveltekit";
import { swiftuiRules } from "./swift";
import { tauriRules } from "./tauri";
import { technicalTutorialsRules } from "./technical-tutorials";
import { terraformRules } from "./terraform";
import { typescriptRules } from "./typescript";
import { uiuxRules } from "./uiux-design";
import { unityCSharpRules } from "./unity-c-sharp";
import { viewComfyRules } from "./viewcomfy";
import { vivadoRules } from "./vivado";
import { vueTsRules } from "./vue";
import { webDevelopmentRules } from "./web-development";
import { webScrapingRules } from "./web-scraping";
import { wordpressRules } from "./wordpress";
import { wordpressWoocommerce } from "./wordpress-woocommerce";

export const rules: Rule[] = [
  ...ABAPRules,
  ...abapFundamentalsRules,
  ...abapPerformanceRules,
  ...aiMl2025Rules,
  ...ALRules,
  ...androidRules,
  ...angularRules,
  ...astroRules,
  ...arduinoFrameworkRules,
  ...autohotkeyRules,
  ...blazorRules,
  ...bunRules,
  ...cosmwasmRules,
  ...bootstrapRules,
  ...chromeExtensionRules,
  ...convexRules,
  ...cppRules,
  ...cRules,
  ...dataAnalystRules,
  ...deepLearningRules,
  ...denoRules,
  ...devopsRules,
  ...djangoRules,
  ...dotnetRules,
  ...drupalRules,
  ...edgeComputingRules,
  ...elixirRules,
  ...expoReactNativeRules,
  ...fastapiRules,
  ...fastifyRules,
  ...flaskRules,
  ...flutterRules,
  ...frontEndRules,
  ...gatsbyRules,
  ...ghostTailwindcssRules,
  ...globalRules,
  ...goRules,
  ...htmlAndCssRules,
  ...htmxRules,
  ...ionicRules,
  ...angularIonicFirebaseFirestoreRules,
  ...javaRules,
  ...jaxRules,
  ...juliaRules,
  ...laravelRules,
  ...luaRules,
  ...manifestRules,
  ...metaPromptRules,
  ...modernCssRules,
  ...monorepoTamagui,
  ...nestjsRules,
  ...nextjsRules,
  ...nuxtJsRules,
  ...odooRules,
  ...onchainkitRules,
  ...openApiUserStoryRules,
  ...pixiJsRules,
  ...playwrightRules,
  ...prismaRules,
  ...pythonRules,
  ...pythonDataScienceRules,
  ...pythonDataProcessingRules,
  ...pythonMachineLearningRules,
  ...pythonWebModernRules,
  ...railsRules,
  ...reactNativeRules,
  ...remixRules,
  ...robocorpRules,
  ...rspecRules,
  ...rustRules,
  ...rustWasmRules,
  ...salesforceRules,
  ...sanityRules,
  ...solanaRules,
  ...solidityRules,
  ...svelteRules,
  ...svelteKitRules,
  ...swiftuiRules,
  ...tauriRules,
  ...technicalTutorialsRules,
  ...terraformRules,
  ...uiuxRules,
  ...unityCSharpRules,
  ...vivadoRules,
  ...vueTsRules,
  ...webDevelopmentRules,
  ...webScrapingRules,
  ...wordpressRules,
  ...wordpressWoocommerce,
  ...typescriptRules,
  ...viewComfyRules,
].map(
  (rule): Rule => ({
    ...rule,
    libs: "libs" in rule ? (rule.libs as string[]) : [],
  }),
);

export function getSections() {
  const categories = Array.from(new Set(rules.flatMap((rule) => rule.tags)));

  return categories
    .map((tag) => ({
      tag,
      rules: rules.filter((rule) => rule.tags.includes(tag)),
      slug: slugify(tag, { lower: true }),
    }))
    .sort((a, b) => b.rules.length - a.rules.length);
}

export function getSectionBySlug(slug: string) {
  return getSections().find((section) => section.slug === slug);
}

export function getRuleBySlug(slug: string) {
  return rules.find(
    (rule) => rule.slug === slug || rule.slug === `official/${slug}`,
  );
}

export interface Rule {
  title: string;
  slug: string;
  tags: string[];
  libs: string[];
  content: string;
}

export type Section = {
  tag: string;
  rules: Rule[];
};
