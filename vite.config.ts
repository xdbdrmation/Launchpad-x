import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../priv/static',
    emptyOutDir: true,
    assetsDir: 'js_assets',
    manifest: true
  },
  base: '/'
})