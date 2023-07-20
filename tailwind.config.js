module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-image' : "url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')",
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
