// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: './dist',
  },
  server: {
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
