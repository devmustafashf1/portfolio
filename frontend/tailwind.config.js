/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f0f0f',
        card: '#141414',
        purple: {
          DEFAULT: '#7B5CF6',
          hover: '#6B4EF0',
          muted: 'rgba(123,92,246,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.07)',
        medium: 'rgba(255,255,255,0.12)',
      },
    },
  },
  plugins: [],
};
