/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#15AAB0', dark: '#0E8A94', light: '#4DD0E1' },
        green: { DEFAULT: '#4CAF50', dark: '#2E7D32' },
        dark: { DEFAULT: '#1A1A1A', mid: '#2D2D2D' },
        cream: '#F5F7F6',
        muted: '#666666',
        border: '#E0E0E0',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        button: '22px',
      },
    },
  },
  plugins: [],
}
