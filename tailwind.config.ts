import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    fontWeight: {
      extraLight: "100",
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    extend: {
      colors: {
        primary: "#535CBB",
        secondary: "#AE60EB",
        disabled: "#D4D2D5",
      },
      minWidth: {
        "btn-min-w": "259px",
      },
      spacing: {
        "52px": "52px",
      },
      fontSize: {
        headline: "128px",
        subheadline: "96px",
        title: "64px",
        heading: "48px",
        subheading: "40px",
        body: "36px",
        caption: "24px",
        small: "16px",
        tiny: "14px",
        micro: "10px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
});
export default config;
