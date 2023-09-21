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
          "primary": "#535CBB",
          "secondary": "#AE60EB",
          "disabled":"#D4D2D5"
      },
      minWidth: {
        'btn-min-w': '259px',
      },
      spacing: {
        '52px': '52px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
}
export default config
