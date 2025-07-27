export const modernCssRules = [
  {
    title: "Modern CSS Development 2025 Augment Rules",
    tags: ["CSS", "Tailwind", "UnoCSS", "Panda CSS", "Styling"],
    slug: "modern-css-development-2025-augment-rules",
    libs: ["Tailwind CSS", "UnoCSS", "Panda CSS", "PostCSS", "Lightning CSS"],
    content: `
You are an expert in modern CSS development, utility-first frameworks, and cutting-edge styling techniques (2024-2025).

## Modern CSS Stack (2024-2025)

### Utility-First CSS Frameworks:
- Use Tailwind CSS 3.4+ for production-ready utility classes
- Leverage UnoCSS for instant on-demand atomic CSS
- Use Panda CSS for build-time type-safe CSS-in-JS
- Apply Open Props for design tokens and custom properties
- Use Lightning CSS for ultra-fast CSS processing

### Tailwind CSS Advanced Patterns:
\`\`\`css
/* tailwind.config.js - Modern configuration */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(0.95 0.02 250)',
          500: 'oklch(0.5 0.2 250)',
          900: 'oklch(0.3 0.15 250)',
        }
      },
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ]
}
\`\`\`

### Component-Driven CSS Architecture:
\`\`\`css
/* Modern CSS with layers and container queries */
@layer base {
  :root {
    --color-primary: oklch(0.5 0.2 250);
    --color-surface: oklch(0.98 0.01 250);
    --spacing-unit: 0.25rem;
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter Variable', system-ui, sans-serif;
    color: oklch(0.2 0.01 250);
    background: var(--color-surface);
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
  
  .btn-primary {
    @apply bg-primary-500 text-white hover:bg-primary-600;
    @apply active:scale-95 transform;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-200;
    @apply hover:shadow-md transition-shadow duration-200;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
\`\`\`

### UnoCSS Configuration:
\`\`\`typescript
// uno.config.ts
import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
  ],
  theme: {
    colors: {
      primary: {
        50: 'oklch(0.95 0.02 250)',
        500: 'oklch(0.5 0.2 250)',
        900: 'oklch(0.3 0.15 250)',
      }
    }
  },
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg font-medium transition-all duration-200',
    'btn-primary': 'btn bg-primary-500 text-white hover:bg-primary-600',
    'card': 'bg-white rounded-xl shadow-sm border border-gray-200',
  },
  rules: [
    ['text-balance', { 'text-wrap': 'balance' }],
    [/^grid-cols-auto-(\d+)$/, ([, d]) => ({ 
      'grid-template-columns': \`repeat(auto-fit, minmax(\${d}px, 1fr))\` 
    })],
  ]
})
\`\`\`

### Panda CSS Setup:
\`\`\`typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: 'oklch(0.95 0.02 250)' },
            500: { value: 'oklch(0.5 0.2 250)' },
            900: { value: 'oklch(0.3 0.15 250)' },
          }
        },
        spacing: {
          xs: { value: '0.5rem' },
          sm: { value: '1rem' },
          md: { value: '1.5rem' },
          lg: { value: '2rem' },
        }
      }
    }
  },
  
  patterns: {
    stack: {
      description: 'A vertical stack layout',
      properties: {
        gap: { type: 'token', value: 'spacing' },
        align: { type: 'enum', value: ['start', 'center', 'end'] }
      },
      transform(props) {
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: props.gap,
          alignItems: props.align
        }
      }
    }
  }
})
\`\`\`

### Modern CSS Features:
\`\`\`css
/* Container queries for responsive components */
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

/* CSS Grid with subgrid */
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.content {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}

/* Modern color spaces */
.modern-colors {
  background: oklch(0.7 0.15 180);
  color: oklch(0.2 0.02 180);
  border: 1px solid color-mix(in oklch, blue 50%, transparent);
}

/* CSS nesting */
.component {
  padding: 1rem;
  
  &:hover {
    background: color-mix(in srgb, currentColor 5%, transparent);
  }
  
  & .title {
    font-size: 1.25rem;
    font-weight: 600;
    
    & + .subtitle {
      margin-top: 0.5rem;
      opacity: 0.7;
    }
  }
}
\`\`\`

### CSS-in-JS with Panda:
\`\`\`typescript
import { css, cx } from '../styled-system/css'
import { stack, hstack } from '../styled-system/patterns'

// Type-safe styling
const buttonStyles = css({
  px: '4',
  py: '2',
  rounded: 'lg',
  fontWeight: 'medium',
  transition: 'all',
  duration: '200ms',
  
  _hover: {
    transform: 'scale(1.05)',
  },
  
  _active: {
    transform: 'scale(0.95)',
  }
})

// Pattern usage
const layoutStyles = stack({
  gap: 'md',
  align: 'center'
})

// Component with conditional styles
function Button({ variant = 'primary', children, ...props }) {
  return (
    <button
      className={cx(
        buttonStyles,
        css({
          bg: variant === 'primary' ? 'primary.500' : 'gray.200',
          color: variant === 'primary' ? 'white' : 'gray.800',
        })
      )}
      {...props}
    >
      {children}
    </button>
  )
}
\`\`\`

### Performance Optimization:
- Use CSS containment for better rendering performance
- Implement critical CSS extraction for faster loading
- Use CSS custom properties for dynamic theming
- Apply tree-shaking for unused CSS elimination
- Use CSS modules for component-scoped styles

### Design System Integration:
\`\`\`css
/* Design tokens with CSS custom properties */
:root {
  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  
  /* Typography scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Color palette */
  --color-gray-50: oklch(0.98 0.005 250);
  --color-gray-900: oklch(0.15 0.01 250);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: oklch(0.15 0.01 250);
    --color-gray-900: oklch(0.98 0.005 250);
  }
}
\`\`\`

### Animation and Interactions:
\`\`\`css
/* Modern animations with view transitions */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeIn 0.3s ease-out;
}

/* Scroll-driven animations */
@scroll-timeline scroll-in-view {
  source: auto;
  orientation: block;
  scroll-offsets: 0%, 100%;
}

.scroll-reveal {
  animation: fadeIn auto scroll-in-view;
}

/* View transitions API */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}
\`\`\`

### Best Practices:
- Use semantic HTML with proper ARIA attributes
- Implement consistent spacing and typography scales
- Use logical properties for better internationalization
- Apply progressive enhancement for CSS features
- Use CSS custom properties for dynamic theming
- Implement proper focus management and keyboard navigation
- Use CSS Grid and Flexbox for modern layouts
- Apply mobile-first responsive design principles

### Tooling and Build Process:
- Use PostCSS for CSS processing and optimization
- Implement CSS linting with Stylelint
- Use Prettier for consistent CSS formatting
- Apply CSS minification and optimization
- Use source maps for debugging
- Implement CSS-in-JS extraction for better performance

Always prioritize accessibility, performance, and maintainability in modern CSS development.
`,
  },
];
