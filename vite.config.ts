import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base: "./"' ensures assets are linked relatively, 
  // preventing 404 errors when deploying to GitHub Pages subdirectories.
  base: './', 
  build: {
    outDir: 'dist',
  },
});