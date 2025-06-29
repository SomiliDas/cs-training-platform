import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // Ensures correct asset paths
  build: {
    outDir: 'dist', // Optional, but good to be explicit
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
