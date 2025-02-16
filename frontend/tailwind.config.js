/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#3674B5",
      secondary: "#578FCA",
      tertiary: "#A1E3F9",
      quaternary: "#D1F8EF",
    },
  },
  plugins: ["@tailwindcss/forms"],
};
