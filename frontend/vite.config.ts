import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'
import Inspect from 'vite-plugin-inspect'

/*
https://vitejs.dev/config/
path alias per https://ui.shadcn.com/docs/installation/vite

Configuration conditional upon development vs. production.

Note on the 'serve' script command below:
  You won't find 'serve' in frontend/package.json scripts; In the cli 'vite', 'vite dev', and 'vite serve' are aliases for it. In Vite's API the command value is 'serve' during dev (in the cli vite, vite dev, and vite serve are aliases), and 'build' when building for production (vite build).
  */

export default defineConfig(({ command, mode }) => {
  // During local development.
  if (command === 'serve') {
    return {
      //Plugins.
      plugins: [
        react(),
        Inspect(),
      ],
      // Define path aliases.
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
    }
    // During production.
  } else if (command === 'build') {
    return {
      plugins: [
        react(),
        Inspect(),
        // Rollup bundle visualizer identifies large modules for performance optimization via code splitting and tree shaking.
        visualizer({
          open: true, // Automatically open the visualization
          filename: 'stats.html', // Output file
          gzipSize: true, // Show gzipped sizes
          brotliSize: true, // Show brotli sizes
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      // Directory to output build files to for production.
      build: {
        outDir: 'dist',
      },
    }
  }
})

/*
Original configuration for development:

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
