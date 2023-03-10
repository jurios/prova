/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.tsx",
      "./resources/**/*.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
