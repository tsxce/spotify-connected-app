import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { config } from 'dotenv'
import path from 'path'
const envPath = path.resolve(__dirname, '../.env')
config({ path: envPath })
// import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // svgLoader({ defaultImport: 'component' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', port: process.env.FRONTENDPORT || 5173, https: false, open: true,
    hmr: {
      protocol: 'ws', host: '0.0.0.0'
    }
  }
})
