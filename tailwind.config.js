/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        accent: "#EEAF3A",
        "background-primary": "#EFEAE6",
        "background-secondary": "#FAF7F5",
        primary: {
          100: "#daf3f3",
          400: "#65c3c8",
          700: "#2b6973",
          950: "#153037",
        },
        secondary: "#EF9FBC",
      },
    },
  },
};
