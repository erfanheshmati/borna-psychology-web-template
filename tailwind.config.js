/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#096E1C",
          light: "#8CFFAB",
          dark: "#00FF44",
        },
        secondary: "#3C3D45",
        text: {
          dark: "#2E2E2E",
          gray: "#575757",
          "light-gray": "#444444",
        },
        bg: {
          light: "#FAFAFA",
          "light-green": "#E1FFD8",
          gray: "#EEEEEE",
        },
      },
      fontFamily: {
        "iran-sans": ["IRANSansX", "sans-serif"],
        "iran-sans-num": ["IRANSansXFaNum", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "10px 17px 26px 0px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        card: "14.36px",
        inner: "10.6px",
      },
      backgroundImage: {
        "gradient-side":
          "linear-gradient(to bottom, rgba(230, 255, 222, 0.76) 9.66%, #FFFFFF 20.83%)",
        "gradient-footer":
          "linear-gradient(to bottom, #FFFFFF 32%, #E1FFD8 100%)",
      },
    },
  },
  plugins: [],
};
