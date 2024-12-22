/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    container: {
      center: true, // Centers the container
      padding: "2rem", // Adds padding to the container
    },
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
