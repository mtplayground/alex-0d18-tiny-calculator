/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f7f5f0',
        surface: '#ffffff',
        charcoal: '#242424',
        muted: '#6f6a63',
        line: '#ded8cf',
        key: '#ece7df',
        accent: '#2563eb',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      borderRadius: {
        button: '0.75rem',
        shell: '1.5rem',
      },
    },
  },
  plugins: [],
};
