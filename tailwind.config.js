/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      height: {
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

