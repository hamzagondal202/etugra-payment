/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
    },
    extend: {},
  },
  plugins: [],
}

