/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/{index.html,wather.html}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'ico-avo': "url('../img/avo.png')"
      }
    }
  },
  plugins: [],
}

