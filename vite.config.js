import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./frontend/src', import.meta.url)),
      '@Form': fileURLToPath(new URL('./frontend/src/components/Form', import.meta.url)),
      '@Assets': fileURLToPath(new URL('./frontend/src/assets', import.meta.url))
    }
  }
})
