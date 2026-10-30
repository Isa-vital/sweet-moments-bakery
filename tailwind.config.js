import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F4',
        cream: '#F4EDE6',
        blush: '#F6DCE3',
        rose: '#B85472',
        chocolate: '#493129',
        gold: '#B18A50',
        ink: '#2F211D'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 55px rgba(73, 49, 41, 0.10)',
        card: '0 12px 30px rgba(73, 49, 41, 0.08)'
      }
    }
  },
  plugins: [typography]
};
