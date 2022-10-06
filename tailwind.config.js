/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '136': '34rem',
        '160': '40rem',
      },
      inset: {
        '235px': '235px',
        '65px' :'65px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'futura': ['Futura', 'sans-serif'],
        'nunito': ['nunito', 'sans-serif']
      },
    },
    
    plugins: [],
  }
}
