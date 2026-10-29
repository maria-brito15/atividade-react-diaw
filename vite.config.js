import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL || 'http://localhost:3000';

  const proxyOptions = {
    target,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyRes', (proxyRes) => {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
            cookie.replace(/;\s*secure/i, '')
          );
        }
      });
    }
  };

  const apiPaths = ['/produtos', '/auth', '/login', '/register', '/style.css'];

  return {
    plugins: [react()],
    server: {
      proxy: Object.fromEntries(apiPaths.map((path) => [path, proxyOptions]))
    }
  };
});
