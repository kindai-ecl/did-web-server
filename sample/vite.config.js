import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import * as dotenv from 'dotenv';
import inject from '@rollup/plugin-inject';
import { createRequire } from 'module';
import stdLibBrowser from 'node-stdlib-browser';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

dotenv.config();
const require = createRequire(import.meta.url);

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
        theme_color: '#3cb371',
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
    }),
    {
      ...inject({
        global: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'global',
        ],
        process: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'process',
        ],
        Buffer: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'Buffer',
        ],
      }),
      enforce: 'post',
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
      // crypto: 'crypto-browserify',
      ...stdLibBrowser,
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: ['buffer', 'crypto', 'process'],
  },
  server: {
    proxy: {
      '/host':{
        target: 'https://did.lcyou.org/v0/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/host/, ''),
      },
      '/ecl':{
        target: 'https://ecls.info.kindai.ac.jp/did/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ecl/, ''),
      },
      '/dev':{
        target: 'http://localhost:8080/did/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    }
  },
})