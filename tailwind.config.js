// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        paper: '#F9F5F1', // Warm bisque/off-white (heavy bond paper)
        ink: '#1C1917', // Warm charcoal
        purple: {
          50: '#F5F3FF', // Existing, but can be tweaked if needed
          100: '#EDE9FE',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#4C1D95',
        },
      },
    },
  },
  plugins: [],
}
