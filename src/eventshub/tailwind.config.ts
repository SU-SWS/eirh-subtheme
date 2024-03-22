/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('decanter')],
  prefix: 'er-',
  content: [
    'index.html',
    './src/*.{html,js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
};
