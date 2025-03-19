import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
          './HelloWorld': './src/components/HelloWorld.vue',
      },
      shared: {
        vue: {
          generate:false
        }
      }
  }),
  mkcert()],
  preview: {
    host: 'localhost',
    port: 5001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  build: {
    target: 'esnext'
  }
})
