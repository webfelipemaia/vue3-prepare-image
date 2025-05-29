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
      },
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'ALLOWALL',
      },
    },
  };
});
