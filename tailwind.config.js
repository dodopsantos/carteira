const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontSize: {
      ...require('tailwindcss/defaultTheme').fontSize, // restaura TODOS os tamanhos
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32
    },

    // reaproveita TODAS as cores padrão do Tailwind e depois sobrescreve/expande as suas
    colors: {
      ...colors,

      // custom
      header: '#131416e6',

      shinigami: '#FF5E00',
      hollow: '#A6FE31',
      quincy: '#0052A2',
      ryoka: '#FFFB00'

      // sobrescrevendo gray e teal com a sua paleta
      // gray: {
      //   900: '#121214',
      //   800: '#202024',
      //   700: '#374151',
      //   600: '#4b5563',
      //   500: '#6b7280',
      //   400: '#7c7c8a',
      //   200: '#c4c4cc',
      //   100: '#e1e1e6'
      // }

      // teal: {
      //   900: '#134e4a',
      //   800: '#115e59',
      //   700: '#0f766e',
      //   600: '#0d9488',
      //   500: '#14b8a6',
      //   400: '#2DD4BF',
      //   300: '#5EEAD4'
      // }
    },

    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      keyframes: {
        arrow: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '40%': { opacity: '1', transform: 'translateY(6px)' },
          '80%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '0', transform: 'translateY(12px)' }
        }
      },
      animation: {
        arrow: 'arrow 2s infinite ease-out'
      }
    }
  },
  plugins: []
};
