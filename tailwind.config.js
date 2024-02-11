/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      width: {
        "1/10": "10%",
        "3/10": "30%",
        "3/20": "15%",
        "1/7": "14.285714285%",
        "7/10": "70%",
        "9/10": "90%",
        88: "22rem",
      },
      height: {
        "6/7": "85.71%",
        "7/8": "87.50%",
        "9/10": "90%",
        68: "16rem",
      },
      padding: {
        22: "5.9rem",
      },

      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      screens: {
        small: { raw: "(max-height: 940px)" },
        xs: { raw: "(max-width: 520px)" },
      },
      fontFamily: {
        mukta: ["Mukta", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
      },
      skew: {
        20: "20deg",
        24: "24deg",
      },
    },
    minWidth: {
      40: "40px",
      48: "12rem",
      70: "70px",
      80: "320px",
      352: "352px",
      88: "22rem",
    },
    maxWidth: {
      352: "352px",
      452: "452px",
      60: "60px",
      36: "36.5%",
      40: "50%",
      120: "120px",
    },
    minHeight: {
      400: "400px",
      600: "600px",
      800: "800px",
      screen2: "100vh",
      24: "6rem",
      38: "9.5rem",
      40: "10rem",
    },
    maxHeight: {
      38: "9.5rem",
      76: "19rem",
    },
  },
  plugins: [require("tailwindcss-filters"), require("@tailwindcss/forms")],
};
