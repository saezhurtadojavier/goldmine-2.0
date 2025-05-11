import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react'
    }),
    // Análisis del bundle solo en CI o cuando se solicite explícitamente
    process.env.ANALYZE === 'true' && visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'bundle-analysis.html',
      open: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Deshabilitar sourcemaps en producción
    reportCompressedSize: false, // Mejora el rendimiento de construcción
    cssCodeSplit: true, // Divide el CSS en chunks
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
          ],
          vendor: ['@tanstack/react-query'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
