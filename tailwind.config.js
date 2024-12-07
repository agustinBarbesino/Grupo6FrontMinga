/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'footer': 'ellipse(60% 80% at 50% 20%)',
      },
      backgroundImage: {
        'footer': "url('/src/assets/bg.jpg')",    
        'pink-gradient': 'linear-gradient(to bottom right, #F9A8D4, #F797CA, #F794C9,#F792C8, #F78FC6, #F581BE, #F57BBB, #F577B9, #F476B8, #F472B6)',    
      },
      colors: {
        'rose-light': '#F9A8D4',
        'rose-dark': '#F472B6',
        
      },
      fontFamily:{
        'montserrat': ['Montserrat'],
        
   
      },
    },
  },
  plugins: [],
}

