import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Si el repo se llama distinto, cambia BASE.
// Para usuario.github.io/sintonia-unam → "/sintonia-unam/"
// Para dominio personalizado o root  → "/"
const BASE = process.env.VITE_BASE_PATH || '/sintonia-unam/';

export default defineConfig({
  base: BASE,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
