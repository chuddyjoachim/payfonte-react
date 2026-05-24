import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  resolve: {
    alias: [
      {
        find: /^@payfonte\/payfonte-react\/(.*)$/,
        replacement: '@payfonte/payfonte-react/$1/index'
      }
    ]
  }
})
