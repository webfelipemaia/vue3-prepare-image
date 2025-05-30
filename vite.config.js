import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env de acordo com o modo (development, production)
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_PUBLIC_PATH || '/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
         'pdfjs-dist': 'pdfjs-dist/es5'
      },
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'ALLOWALL',
      },
    },
    build: {
      target: "es2022"
    },
    esbuild: {
      target: "es2022"
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2022",
      }
    },
    worker: {
      format: 'es'
    }
  };
});
