/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {
      colors: {
        // Color primario verde #009640
        primary: {
          50: "#e6f4ec",
          100: "#cce9da",
          200: "#99d3b5",
          300: "#66bd90",
          400: "#33a76b",
          500: "#009640",  // Verde corporativo oficial
          600: "#007a33",
          700: "#005f26",
          800: "#00451a",
          900: "#002c10"
        },

        // Fondos blancos y grises claros
        'secondary': {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f4f4f5',
          300: '#e4e4e7',
          400: '#d4d4d8',
          500: '#a1a1aa',
          600: '#71717a',
          700: '#52525b',
          800: '#3f3f46',
          900: '#27272a',
        },
        // Textos oscuros
        'accent': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Colores de energía/accent
        'energy': {
          400: '#009640',  // Mismo verde para consistencia
          500: '#008238',
          600: '#006b2f',
        },
        cta: {
          500: "#FF6B35",
          600: "#E85E2F",
          700: "#CC522A",
        },


      },


      // Fuentes
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Oswald', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },

      // Sombras para tema claro
      boxShadow: {
        'gym': '0 10px 25px -5px rgba(0, 150, 64, 0.1), 0 10px 10px -5px rgba(0, 150, 64, 0.04)',
        'gym-lg': '0 20px 50px -12px rgba(0, 150, 64, 0.15)',
        'gym-card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },

      // Gradientes con el nuevo verde
      backgroundImage: {
        'gym-gradient': 'linear-gradient(135deg, #009640 0%, #006b2f 100%)',
        'energy-gradient': 'linear-gradient(135deg, #009640 0%, #004520 100%)',
        'light-gradient': 'linear-gradient(135deg, #ffffff 0%, #f0f9f4 100%)',
        'green-gradient': 'linear-gradient(135deg, #009640 0%, #52b87d 100%)',
      },
    },
  },

  plugins: [],
}