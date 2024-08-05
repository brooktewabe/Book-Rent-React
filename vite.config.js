import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target :'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

// docker exec -it FE-id85432a112e04 curl -X POST http://app:5000/profile/signup -H "Origin: http://localhost:80" -H "Content-Type: application/json" -d "{\"email\": \"Admin21@mail.com\", \"password\": \"Admin1@mail.com\", \"confirmPassword\": \"Admin1@mail.com\"}" 