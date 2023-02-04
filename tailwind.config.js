/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Serif', 'serif'],
        viga: ['Viga', 'sans-serif'],
      },
    },
  },
  plugins: [],
}