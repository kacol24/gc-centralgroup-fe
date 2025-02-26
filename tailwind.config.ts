import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        aboreto: ['Aboreto', 'cursive'],
        marcellus: ['Marcellus', 'serif'],
      },
      colors: {
        primary: '#016241',
        textPrimary: '#233F3F',
        textSecondary: '#514231',
        textTertiary: '#7AAF1C',
        backgroundWhite: '#FAFAFA',
        backgroundGray: '#2E2E2E',
      },
      boxShadow: {
        custom: '0px 15px 30px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
