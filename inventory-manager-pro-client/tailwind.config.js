/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class',],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [

      {
        mytheme: {

          "primary": "#5a66f1",

          "secondary": "#282A42",

          "accent": "rgba(234, 234, 255, 0.87)",

          "neutral": "#30334E",

          "base-100": "#ffffff",

          "info": "#3abff8",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },

    ],
  },
  plugins: [require("daisyui")],
}
