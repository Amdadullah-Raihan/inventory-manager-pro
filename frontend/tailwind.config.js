/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#5a66f1", foreground: "#ffffff" },
        secondary: { DEFAULT: "#282A42", foreground: "#D2D3E8" },
        accent: { DEFAULT: "#D2D3E8", foreground: "#282A42" },
      },
    },
  },
  plugins: [],
};
