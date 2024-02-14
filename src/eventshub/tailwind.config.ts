/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('decanter')],
  content: [
    'index.html',
    './src/*.{html,js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
