// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');
  
  // Warn if required environment variables are missing during build
  if (mode === 'production' && !env.VITE_NEON_DATABASE_URL) {
    console.warn('');
    console.warn('⚠️  WARNING: VITE_NEON_DATABASE_URL is not set!');
    console.warn('');
    console.warn('The application will not be able to connect to the database.');
    console.warn('Make sure to set this environment variable in your deployment platform.');
    console.warn('');
    console.warn('For Netlify:');
    console.warn('  Site Settings → Environment Variables → Add variable');
    console.warn('  Key: VITE_NEON_DATABASE_URL');
    console.warn('  Value: Your Neon PostgreSQL connection string');
    console.warn('');
  }
  
  return {
    plugins: [react()],
  };
})
