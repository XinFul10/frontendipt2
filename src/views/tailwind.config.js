// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,js,php}", // adjust paths as needed
    ],
    theme: {
      extend: {
        fontFamily: {
          book: ['Merriweather', 'Georgia', 'serif'],
        },
        colors: {
          parchment: '#fbf6ef',
          leather: '#8B6D5C',
          brick: '#a74a3e',
          moss: '#726250',
          darkBrown: '#4B3B2B',
          tan: '#b19b7b',
        },
      },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  };
  