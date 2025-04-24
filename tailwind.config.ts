import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      sky: "#0CB6F4",
      indigo: {
        500: "#3C3EA6",
        600: "#302D8B",
        700: "#31338D",
      },
      gray: {
        40: "#F6F8F9",
        50: "#F3F6F9",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#C3C4DB",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      yellow: {
        50: "#FDFDEA",
        100: "#FDF6B2",
        200: "#FCE96A",
        300: "#FACA15",
        400: "#E3A008",
        500: "#C27803",
        600: "#9F580A",
        700: "#8E4B10",
        800: "#723B13",
        900: "#633112",
      },
      red: {
        50: "#FDF2F2",
        100: "#FDE8E8",
        200: "#FBD5D5",
        300: "#F8B4B4",
        400: "#F98080",
        500: "#F05252",
        600: "#E02424",
        700: "#C81E1E",
        800: "#9B1C1C",
        900: "#771D1D",
      },
      green: {
        50: "#F3FAF7",
        100: "#DEF7EC",
        200: "#BCF0DA",
        300: "#84E1BC",
        400: "#31C48D",
        500: "#0E9F6E",
        600: "#057A55",
        700: "#046C4E",
        800: "#03543F",
        900: "#014737",
      },
      white: "#ffffff",
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      screens: {
        xs: [{ min: "320px", max: "668px" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {
      display: ["responsive"],
    },
  },
  plugins: [],
};
export default config;
