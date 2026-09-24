/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orbix-navy':    '#091231',
        'orbix-ts':      '#223F7C',
        'orbix-tagline': '#3371AF',
        'orbix-cyan':    '#29DDDA',
        'orbix-grey':    '#ECF0F5',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
