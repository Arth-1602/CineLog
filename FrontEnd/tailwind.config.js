/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cinelog-bg': '#080B0F',
        'cinelog-card': '#151A22',
        'cinelog-surface': '#222833',
        'cinelog-surface-hover': '#2C3443',
        'cinelog-accent': '#D6A65D',
        'cinelog-accent-hover': '#E5B870',
        'cinelog-accent-muted': 'rgba(214, 166, 93, 0.2)',
        'cinelog-text': '#F5F6F8',
        'cinelog-muted': '#9CA3AF',
        'cinelog-subtle': '#6B7280',
        'cinelog-border': 'rgba(214, 166, 93, 0.18)',
        'cinelog-border-subtle': 'rgba(255, 255, 255, 0.07)'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        cinematic: ['Cinzel', 'Playfair Display', 'serif']
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(214, 166, 93, 0.25)',
        'glow-lg': '0 0 35px -5px rgba(214, 166, 93, 0.35)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.6)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3D08A 0%, #D6A65D 50%, #B48338 100%)',
        'hero-gradient': 'linear-gradient(to top, #080B0F 0%, rgba(8, 11, 15, 0.8) 40%, rgba(8, 11, 15, 0.3) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(21, 26, 34, 0.6) 0%, #151A22 100%)'
      }
    },
  },
  plugins: [],
}
