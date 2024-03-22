import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'eventshub.js',
        chunkFileNames: 'eventshub-chunk.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
