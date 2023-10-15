import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: "#13192A",
        secondary: "#192439",
        purple: "#353A8E",
        purpleHover: "#272c70",
        green: "#009F7D",
        greenHover: "#00755C",
      },
    },
  },
  plugins: [],
}
export default config
