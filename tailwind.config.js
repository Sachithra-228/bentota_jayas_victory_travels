/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0F766E",
          lightTeal: "#14B8A6",
          beige: "#F5E9DA",
          dark: "#0B1120",
        },
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 118, 110, 0.12)",
      },
    },
  },
  plugins: [],
};

