/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'flip-in': 'flipIn 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'flip-out': 'flipOut 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'number-fall': 'numberFall 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flipIn: {
          '0%': {
            transform: 'rotateX(90deg) translateY(-20px)',
            opacity: '0',
            transformOrigin: 'center bottom'
          },
          '50%': {
            transform: 'rotateX(45deg) translateY(-10px)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'rotateX(0deg) translateY(0px)',
            opacity: '1',
            transformOrigin: 'center bottom'
          },
        },
        flipOut: {
          '0%': {
            transform: 'rotateX(0deg) translateY(0px)',
            opacity: '1',
            transformOrigin: 'center top'
          },
          '50%': {
            transform: 'rotateX(-45deg) translateY(10px)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'rotateX(-90deg) translateY(20px)',
            opacity: '0',
            transformOrigin: 'center top'
          },
        },
        numberFall: {
          '0%': {
            transform: 'rotateX(90deg) scale(0.8) translateY(-30px)',
            opacity: '0',
            filter: 'blur(4px)'
          },
          '30%': {
            transform: 'rotateX(45deg) scale(0.9) translateY(-15px)',
            opacity: '0.7',
            filter: 'blur(2px)'
          },
          '70%': {
            transform: 'rotateX(-10deg) scale(1.05) translateY(5px)',
            opacity: '1',
            filter: 'blur(0px)'
          },
          '100%': {
            transform: 'rotateX(0deg) scale(1) translateY(0px)',
            opacity: '1',
            filter: 'blur(0px)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
