/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf6f2',
          100: '#f3e9df',
          200: '#e6d3c0',
          300: '#d4b594',
          400: '#b98a62',
          500: '#9a6a43',
          600: '#7d5233',
          700: '#633f27',
          800: '#4d3020',
          900: '#36221a',
        },
        accent: {
          50: '#fff8eb',
          100: '#fdeccb',
          400: '#e8a33d',
          500: '#d98c1f',
          600: '#b8701a',
        },
        secondary: {
          50: '#f3f6f1',
          100: '#e2ebdd',
          500: '#6b8f65',
          700: '#3f5d3a',
        },
        success: {
          50: '#ecfdf3',
          700: '#166534',
        },
        warning: {
          50: '#fffbeb',
          700: '#92400e',
        },
        error: {
          50: '#fef2f2',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 280ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
