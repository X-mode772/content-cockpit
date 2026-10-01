import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e8f1ff',
          200: '#cfe0ff',
          300: '#a8c3ff',
          400: '#7d9dff',
          500: '#5878ff',
          600: '#3d5ef0',
          700: '#2f49c5',
          800: '#243ba0',
          900: '#1f367b'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(61, 94, 240, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
