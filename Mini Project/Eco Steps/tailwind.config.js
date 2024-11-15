module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('/src/assets/pattern.png')",
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('tailwindcss-bg-patterns'),
  ],
};
