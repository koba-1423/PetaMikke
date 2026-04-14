import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  "#fdf8f7",
          100: "#f5ecea",
          200: "#e8d5d1",
          300: "#d4b0aa",
          400: "#bc8880",
          500: "#a06860",
          600: "#855049",
          700: "#6b3f39",
          800: "#57332d",
          900: "#482b26",
        },
        stone: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
