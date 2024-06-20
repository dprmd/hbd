/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jersey20: ["'Jersey 20'", "sans-serif"],
      jersey25: ["'Jersey 25'", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      josefin: ["'Josefin Sans'", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
