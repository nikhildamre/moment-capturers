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
        accentYellow: '#FFC50F',
        yellowLight: '#FFD84D',
        yellowDark: '#E6B00E',
        graphite: '#2B2B2B',
        graphiteLight: '#3D3D3D',
        graphiteDark: '#1A1A1A',
        floralWhite: '#F8F5EE',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FFC50F 0%, #FF8C00 100%)',
        'gradient-overlay': 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
        'gradient-text': 'linear-gradient(90deg, #FFC50F 0%, #FFD84D 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0,0,0,0.08)',
        'md': '0 4px 16px rgba(0,0,0,0.12)',
        'lg': '0 8px 32px rgba(0,0,0,0.16)',
        'xl': '0 16px 48px rgba(0,0,0,0.20)',
        '2xl': '0 24px 64px rgba(0,0,0,0.24)',
        'colored': '0 8px 32px rgba(255,197,15,0.3)',
        'colored-lg': '0 16px 48px rgba(255,197,15,0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255,197,15,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}