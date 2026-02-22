/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [
    require("nativewind/preset"),
  ],
  theme: {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#B98ECC',
                light: "#B99BBB",
                dark: "#B95BBB",
            },
            background: {
                DEFAULT: '#121212',
                light: "#181818",
                lighter: "#282828",
            },
            surface: {
                DEFAULT: '#282828',
                light: "#3E3E3E",
            },
            text: {
                primary: "#FFFFFF",
                secondary: "#B3B3B3",
                tertiary: "#6A6A6A",
            },
            accent: {
                DEFAULT: '#1D8954',
                red: "#F44336",
                yellow: "#FFC107",
            },
        },
    },
  },
  plugins: [],
  }
