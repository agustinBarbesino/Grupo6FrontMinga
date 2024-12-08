/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      clipPath: {
        'footer': 'ellipse(60% 80% at 50% 20%)',
      },
      backgroundImage: {
        'footer': "url('/src/assets/bg.jpg')",    
        'pink-gradient': 'linear-gradient(to bottom right, #F9A8D4, #F797CA, #F794C9,#F792C8, #F78FC6, #F581BE, #F57BBB, #F577B9, #F476B8, #F472B6)',
        'dark-pink-gradient': 'linear-gradient(to bottom right, #831843, #9d174d, #be185d, #db2777, #ec4899)', // Versión oscura del gradiente
      },
      colors: {
        'rose-light': '#F9A8D4',
        'rose-dark': '#F472B6',
        
        dark: {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#2d2d2d',
          'text-primary': '#ffffff',
          'text-secondary': '#e0e0e0',
          'rose-light': '#be185d',  
          'rose-dark': '#831843',   
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
      
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '150': '150ms',
      },
  
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.35)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}