/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'open-sans': ['"Open Sans"'],
      'volkhov': ['"Volkhov"']
    },
    extend: {
      height: {
        '60px': '60px',
      }
    },
  },
  plugins: [],
}
