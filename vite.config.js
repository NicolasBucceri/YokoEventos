import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: 'dist', // Nota: El `./` es redundante, 'dist' es suficiente
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yokoeventos.onrender.com', // URL de tu backend en producción
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la URL para no incluir el prefijo /api
      },
    },
  },
  plugins: [vue()],
});
