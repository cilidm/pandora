import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 12581,
    open: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': 'rgb(11, 87, 208)', // 颜色
          '@border-radius-base': '0', // 边框圆角
        },
        javascriptEnabled: true,
      },
    },
  },
});
