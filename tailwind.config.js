/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        koulen: ["Koulen", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
