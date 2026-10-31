/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F0E7',
        'warm-ivory': '#F5F0E7',
        cream: '#EAE1D4',
        espresso: '#261B16',
        'dark-brown': '#3A2920',
        'muted-olive': '#777A58',
        'soft-beige': '#C9BBA8',
        beige: '#C9BBA8',
        gold: '#C59B63',
        'gold-light': '#DFC49B',
        terracotta: '#A6533A',
        charcoal: '#1A1412',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        manrope: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.22em',
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
