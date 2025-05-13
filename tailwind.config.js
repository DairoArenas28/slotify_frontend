// tailwind.config.js
module.exports = {
  content: [
    "./app/**/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paloRosa: '#C08081',
        marfil: '#FDF6F0',
        salvia: '#A3B18A',
        topo: '#D8CAB8',
        chocolate: '#5C3A21',
        oroSuave: '#D4AF37',
      },
    },
  },
  plugins: [],
};