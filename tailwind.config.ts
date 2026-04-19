import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-card': 'rgba(18, 18, 26, 0.85)',
        'bg-glass': 'rgba(255, 255, 255, 0.03)',
        
        // Primary amethyst colors
        'amethyst': {
          DEFAULT: '#9966CC',
          light: '#b388eb',
          dark: '#7b4bb3',
          glow: '#bf5af2',
        },
        
        // Accent colors
        'accent': '#c084fc',
        
        // Text colors
        'text-primary': '#f5f5f7',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
        
        // Status colors
        'success': '#22c55e',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
        
        // Border colors
        'border-glass': 'rgba(255, 255, 255, 0.08)',
        'border-glow': 'rgba(153, 102, 204, 0.5)',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '44px', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        'glass': '16px',
        'card': '24px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(153, 102, 204, 0.5), 0 0 40px rgba(153, 102, 204, 0.3)',
        'glow-sm': '0 0 10px rgba(153, 102, 204, 0.3)',
        'glass': '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(153, 102, 204, 0.1)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'logo-zoom': 'logoZoomIn 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        logoZoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(153, 102, 204, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(153, 102, 204, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(0) translateX(20px)' },
          '75%': { transform: 'translateY(20px) translateX(10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config