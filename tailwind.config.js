/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#ff5b06",
        whiteSmoke: "#F0F0F0",
        lightBg: "#fff8f5",
        accent: "#ffe5d8",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
