import { assets } from "./src/assets/assets";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit"],
        poppins: ["Poppins"],
        montserrat: ["Montserrat"],
        nunito: ["Nunito"],
      },
      backgroundImage: {
        abstract: "url('../src/assets/bg_img.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
