import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'notes-spa-fallback',
      configureServer(server) {
        // Intercept /notes/ requests before Vite serves raw .md files from disk
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/notes/')) {
            req.url = '/'
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    port: 42211,
    proxy: {
      '/api': {
        target: 'http://localhost:42210',
        changeOrigin: true,
      },
    },
  },
})
