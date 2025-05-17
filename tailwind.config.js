/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        secondary: '#8B5CF6',
        tertiary: '#A78BFA',
        muted: '#EDE9FE',

        border: '#27272a',
        offwhite: '#FAF9FF',
        offblack: '#333333',

        background: '#18191c',
      },
    },
  },
  plugins: [],
};
