import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        order: resolve(import.meta.dirname, 'order.html'),
        policies: resolve(import.meta.dirname, 'policies.html')
      }
    }
  }
});
