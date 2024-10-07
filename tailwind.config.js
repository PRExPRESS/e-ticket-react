/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#323433',
        'secondary': '#fd7c18',
      },

      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
      },

      backgroundImage: {
        'bg-enigma': "url('./src/assets/img/enigma-bg.png')",
      },

    },
  },
  plugins: [],
}

