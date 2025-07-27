/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        mono: {
          50: '#ffffff',
          100: '#f8f8f8',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        space: ['Space Grotesk', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'Fira Code', 'monospace'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 8s ease-in-out infinite',
        'flip-in': 'flipIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'flip-out': 'flipOut 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'number-fall': 'numberFall 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s infinite',
        'morph': 'morph 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        flipIn: {
          '0%': {
            transform: 'rotateX(90deg) translateY(-30px)',
            opacity: '0',
            transformOrigin: 'center bottom'
          },
          '50%': {
            transform: 'rotateX(45deg) translateY(-15px)',
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
            transform: 'rotateX(-45deg) translateY(15px)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'rotateX(-90deg) translateY(30px)',
            opacity: '0',
            transformOrigin: 'center top'
          },
        },
        numberFall: {
          '0%': {
            transform: 'rotateX(90deg) scale(0.8) translateY(-40px)',
            opacity: '0',
            filter: 'blur(6px)'
          },
          '30%': {
            transform: 'rotateX(45deg) scale(0.9) translateY(-20px)',
            opacity: '0.7',
            filter: 'blur(3px)'
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
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        morph: {
          '0%, 100%': { borderRadius: '20px', transform: 'rotate(0deg)' },
          '33%': { borderRadius: '30px 10px', transform: 'rotate(1deg)' },
          '66%': { borderRadius: '10px 30px', transform: 'rotate(-1deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mono-gradient': 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        'mono-gradient-dark': 'linear-gradient(145deg, #0a0a0a, #050505)',
      },
      boxShadow: {
        'mono': '8px 8px 16px rgba(0, 0, 0, 0.9), -8px -8px 16px rgba(255, 255, 255, 0.02)',
        'mono-hover': '12px 12px 24px rgba(0, 0, 0, 0.8), -12px -12px 24px rgba(255, 255, 255, 0.03)',
        'mono-inset': '0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
