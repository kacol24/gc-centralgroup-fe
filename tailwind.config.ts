import type { Config } from 'tailwindcss';

const config: Config = {
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
      },
    },
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			aboreto: [
  				'Aboreto',
  				'cursive'
  			],
  			marcellus: [
  				'Marcellus',
  				'serif'
  			]
  		},
  		colors: {
  			bgPrimary: '#FAFAFA',
  			primary: '#016241',
  			textPrimary: '#233F3F',
  			textSecondary: '#514231'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
};

export default config;
