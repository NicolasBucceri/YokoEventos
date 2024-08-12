import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: 'dist', // Asegúrate de que esté configurado como 'dist'
  },
  server: {
    port: 10000,
    proxy: {
      '/api': {
        target: 'https://yokoeventos.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [vue()],
});
