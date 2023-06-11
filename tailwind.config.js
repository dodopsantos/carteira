/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32
    },
    colors: {
      transparent: 'transparent',

      black: '#000000',
      white: '#ffffff',
      yellow: '#ffc82c',
      header: '#131416e6',

      gray: {
        900: '#121214',
        800: '#202024',
        700: '#374151',
        600: '#4b5563',
        500: '#6b7280',
        400: '#7c7c8a',
        200: '#c4c4cc',
        100: '#e1e1e6'
      },

      teal: {
        900: '#134e4a',
        800: '#115e59',
        700: '#0f766e',
        600: '#0d9488',
        500: '#14b8a6',
        400: '#2DD4BF',
        300: '#5EEAD4'
      }
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      }
    }
  },
  plugins: []
};
