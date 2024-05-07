import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Specify the output directory (Netlify default is 'publish')
    rollupOptions: {
      output: {
        // Set proper paths in the production build
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      // Resolve paths to your src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // Set the base to the root, adjust if necessary for subpaths
});
