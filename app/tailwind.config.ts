import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          foreground: '#FFFFFF',
          dark: '#27692B'
        },
        secondary: {
          DEFAULT: '#00A6A6',
          dark: '#008F8F',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#F59E0B',
          foreground: '#1A1304'
        },
        success: '#16A34A',
        error: '#DC2626',
        warning: '#D97706',
        slate: {
          50: '#F1F5F9',
          400: '#94A3B8',
          700: '#334155',
          900: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem'
      },
      boxShadow: {
        card: '0 10px 25px -15px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
