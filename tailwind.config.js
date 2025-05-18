/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dragon: {
          primary: '#10B981', // Esmeralda vibrante
          secondary: '#059669', // Esmeralda profunda
          tertiary: '#ECFDF5', // Esmeralda pálida (clara)
          accent: '#064E3B', // Jade sombrio
          danger: '#EF4444', // Vermelho

          100: '#F3F4F6', // Prata claro
          200: '#E5E7EB', // Prata fosco
          300: '#D1D5DB', // Aço
          400: '#9CA3AF', // Ferro
          500: '#6B7280', // Grafite
          600: '#4B5563', // Pedra
          700: '#3f3f46', // Obsidiana
          800: '#27272A', // Asas de dragão
          900: '#18181A', // Escuro absoluto
        },

        white: '#ffffff',
        black: '#000000',
        offwhite: '#FAF9FF',
        offblack: '#333333',
      },
    },
  },
  plugins: [],
};
