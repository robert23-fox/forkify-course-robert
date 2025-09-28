module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './dist/**/*.html'],
  important: true,
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
        fontFamily: {
        },
        letterSpacing: {
          widest: ".3em"
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
