import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      target: 'esnext'
    },
    esbuild: {
      target: 'esnext'
    },
    define: {
      // Make sure environment variables are properly stringified
      'process.env': Object.keys(env).reduce((prev: { [key: string]: string }, key: string) => {
        prev[key] = JSON.stringify(env[key]);
        return prev;
      }, {})
    }
  };
});