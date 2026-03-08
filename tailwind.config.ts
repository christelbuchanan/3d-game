import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4E8',
        mist: '#DCE7DD',
        pine: '#27423A',
        peach: '#F2D4C8',
        mint: '#B8D7B6'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(39, 66, 58, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
