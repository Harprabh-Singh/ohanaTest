export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
      colors: {
        'teal-dark': '#000000',
        'teal-mid': '#1C1C1E',
        'teal-card': '#2C2C2E',
        cream: '#F5F5F7',
        'cream-dark': '#E8E8ED',
        magenta: '#FF9F0A',
        'magenta-dark': '#C77700',
        gold: '#FF9F0A',
        'text-dark': '#1D1D1F',
        'text-mid': '#6E6E73',
        white: '#FFFFFF',
      },
      boxShadow: {
        depth: '0 30px 80px rgba(0,0,0,0.24)',
      },
      backgroundImage: {
        'surface-texture': "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at 20% 90%, rgba(255,255,255,0.04), transparent 20%)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
