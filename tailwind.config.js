/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qua: {
          pink: {
            50: '#fff5f7',
            100: '#ffe3eb',
            200: '#ffc9dc',
            300: '#ffa0c1',
            400: '#ff6b9d',
            500: '#ff4785',
            600: '#f72585',
            700: '#d90368',
            800: '#b5005e',
            900: '#8a0051',
          },
          mint: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          lavender: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          }
        }
      },
      fontFamily: {
        'display': ['"Galmuri11"', '"Noto Sans KR"', 'sans-serif'],
        'body': ['"Pretendard Variable"', '"Noto Sans KR"', 'sans-serif'],
        'cute': ['"Gaegu"', 'cursive'],
      },
      backgroundImage: {
        'water-gradient': 'linear-gradient(135deg, #ffc9dc 0%, #ccfbf1 50%, #e9d5ff 100%)',
        'pink-gradient': 'linear-gradient(to right, #ff6b9d, #f72585)',
        'mint-gradient': 'linear-gradient(to right, #5eead4, #14b8a6)',
      },
      animation: {
        'water-drop': 'waterDrop 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        waterDrop: {
          '0%': { transform: 'translateY(-100vh) scale(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) scale(1)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
