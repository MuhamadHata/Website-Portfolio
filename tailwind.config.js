/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p5: {
          red: '#E60012',
          crimson: '#D91424',
          darkred: '#8A000A',
          black: '#0A0A0C',
          dark: '#111115',
          card: '#18181F',
          yellow: '#FFE600',
          cyan: '#00F0FF',
          gray: '#2A2A35',
          border: '#3A3A48',
          textMuted: '#A0A0B0',
        }
      },
      fontFamily: {
        p5: ['"P5Hatty"', '"Bebas Neue"', 'sans-serif'],
        'p5-expose': ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        'p5-menu': ['"Bebas Neue"', '"Inter"', 'sans-serif'],
        'p5-ransom': ['"Persona5Menu"', '"Persona5Main"', 'sans-serif'],
        'p5-headline': ['"HeavyHeadline"', '"Bebas Neue"', 'sans-serif'],
        'p5-num': ['"Markin"', '"JetBrains Mono"', 'monospace'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        display: ['"Anton"', 'sans-serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'p5-solid': '6px 6px 0px #000000',
        'p5-solid-red': '6px 6px 0px #E60012',
        'p5-solid-white': '6px 6px 0px #FFFFFF',
        'p5-solid-lg': '10px 10px 0px #000000',
        'p5-glow': '0 0 25px rgba(230, 0, 18, 0.5)',
      },
      animation: {
        'float-slow': 'p5Float 4s ease-in-out infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        p5Float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
