/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-me-400': '#2C3333',
        'dark-me-300': '#2E4F4F',
        'dark-me-200': '#0E8388',
        'dark-me-100': '#CBE4DE',
      },
      screens: {
        xsm: { max: '720px' },
        xxsm: { max: '480px' },
        lgm: { max: '1080px' },
      },
    },
  },
  plugins: [],
};
