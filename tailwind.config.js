/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FFDD00',
        'neo-cyan': '#00FFFF',
        'neo-magenta': '#FF00FF',
        'neo-red': '#FF3333',
        'neo-green': '#00FF66',
        'neo-orange': '#FF9933',
        'neo-blue': '#3366FF',
        'neo-white': '#FFFFFF',
        'neo-black': '#000000',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-pressed': '2px 2px 0px 0px #000000',
      },
      fontFamily: {
        'mono': ['Space Mono', 'Courier New', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}
