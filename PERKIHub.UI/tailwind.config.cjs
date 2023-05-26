/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        maragsa: ["Maragsa", "sans-serif"],
        inter: ["Inter", "serif"],
        satoshi: ["Inter", "serif"],
      },
      colors: {
        "falu-red": {
          50: "#fef2f2",
          100: "#ffe1e1",
          200: "#ffc8c8",
          300: "#ffa2a2",
          400: "#fd6c6c",
          500: "#f53e3e",
          600: "#e22020",
          700: "#bf1616",
          800: "#9d1717",
          900: "#851a1a",
        },
        tundora: {
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#4d4d4d",
          700: "#434343",
          800: "#383838",
          900: "#313131",
        },
        parchment: {
          50: "#f9f7ed",
          100: "#f3eed9",
          200: "#e3d5a5",
          300: "#d3b871",
          400: "#c59f4a",
          500: "#b68b3c",
          600: "#9c6f32",
          700: "#7d532b",
          800: "#69442a",
          900: "#5b3b28",
        },
        maroon: "#851A1A",
        lightmaroon: "#B3735A",
        cream: "#F3EED9",
        lightcream: "#F7F4E7",
      },
      backgroundSize: {
        "400%": "400%",
      },
      animation: {
        gradient: "gradient 3s ease infinite",
        marquee: "marquee 10s linear infinite",
        marquee2: "marquee2 10s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },

  plugins: [],
};
