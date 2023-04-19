/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "secondary": "rgb(74,85,140)",
        "box-background": "rgb(38,42,61)"
      },
      fontFamily: {
        "header": ["Alfa Slab One"]
      }
    },
  },
  plugins: [],
}
