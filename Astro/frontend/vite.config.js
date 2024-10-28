import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../src/main/resources/static', // Para servir os arquivos estáticos no Spring Boot
        emptyOutDir: true, // Limpa a pasta antes de construir
    },
    server: {
      proxy: {
          '/api': {
              target: 'http://localhost:8080',
              changeOrigin: true,
          },
      },
  },
});
