import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import * as dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'issuer sample app',
        short_name: 'issuer',
        description: 'issuer sample app ',
        theme_color: '#7fffbf',
        display: 'standalone',
        shart_url: '/'
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  server: {
    proxy: {
      '/host':{
        target: 'https://did.lcyou.org/',
        // target: JSON.stringify(process.env.VITE_API_URL),
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/host/, ''),
      },
      '/dev':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    }
  },
})