import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primaryLight: "#2E7AFF",
      primaryDefault: "#1D63FF",
      primaryDark: "#0043D9",
      primaryGray: "#052D41",

      auxiliaryGreen: "#35D9A8",
      auxiliaryYellow: "#FFD76F",
      auxiliaryRed: "#FF5C60",

      white: "#FFFFFF",

      neutral001: "#F2F5FC",
      neutral002: "#CBD6E2",

      neutral050: "#757385",
      neutral100: "#4C4A5E",
      neutral200: "#413E52",
      neutral300: "#353345",
      neutral400: "#2A2739",
      neutral500: "#1E1C2D",
      neutral600: "#131020",
      neutral700: "#0D0B1A",
      neutral800: "#070514",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
