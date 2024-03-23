/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15AABF",
      },
    },
    screens: {
      lg: "1200px",
      md: "992px",
      sm: "768px",
      xl: "1408px",
      xs: "576px",
    },
  },
};
