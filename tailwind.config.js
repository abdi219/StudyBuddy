// tailwind.config.js
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {},
    screens: {
      xs: '480px',   // custom small devices
      sm: '680px',   // default
      md: '768px',   // default
      lg: '1024px',  // default
      xl: '1280px',  // default
      '2xl': '1536px', // default
    },
  },
})
