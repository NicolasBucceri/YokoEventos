import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: './dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yokoeventos.onrender.com', // URL de tu backend en producción
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [vue()],
});
