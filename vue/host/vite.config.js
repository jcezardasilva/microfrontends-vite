import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host-app',
      remotes: {
          remote_app: "https://localhost:5001/assets/remoteEntry.js",
      },
      shared: {
        vue: {
          
        }
      }
  }),
  mkcert()],
  build: {
    target: 'esnext'
  }
})
