/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        offWhite: "#F7F7F7",
        lightGray: "#F1F1F1",
        gray: "#E5E5E5",
        darkGray: "#CCCCCC",
        red: "#FF0000",
        redDark: "#B30000",
        blue: "#0077b6",
        green: "#00FF00",
        purple: "#800080",
        orange: "#FFA500",
      },
    },
  },
  plugins: [],
};
