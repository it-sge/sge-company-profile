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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          light: '#1e405f',
          DEFAULT: '#0B2A43',
          dark: '#05192b',
        },
        gold: {
          light: '#f7bd54',
          DEFAULT: '#F5A623',
          dark: '#d48806',
        },
        sky: {
          DEFAULT: '#4A9FD8',
        },
        white: '#FFFFFF',
        offwhite: '#F7FAFC',
        slate: {
          DEFAULT: '#4A5568',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-eurostile)', 'sans-serif'],
        display: ['var(--font-eurostile-ext)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
