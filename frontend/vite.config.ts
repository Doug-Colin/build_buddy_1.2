import path from 'path'
// import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'

// Config for production.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});

/* Config for local development.
// https://vitejs.dev/config/
// & path alias per https://ui.shadcn.com/docs/installation/vite
export default defineConfig({
  // plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3150',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log(
              `Sending Request to the Target: Method: ${req.method}, URL: ${req.url}`,
            )
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url,
            )
          })
        },
      },
    },
  },
})
*/
