import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis', //<-- AWS SDK
      },
    },
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // <-- Fix from above
    },
  },
});
