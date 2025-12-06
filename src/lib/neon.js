// src/lib/neon.js
import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

// Create Neon client with environment variable validation
const createNeonClient = () => {
  if (!databaseUrl) {
    console.error('❌ Neon database URL not configured!');
    console.error('');
    console.error('The VITE_NEON_DATABASE_URL environment variable was not available during the build process.');
    console.error('');
    console.error('For Netlify deployments:');
    console.error('1. Go to Site Settings → Build & Deploy → Environment');
    console.error('2. Add VITE_NEON_DATABASE_URL with your Neon connection string');
    console.error('3. Make sure the variable is scoped for "All deploy contexts" or at least "Production"');
    console.error('4. Trigger a new deploy (clear cache if needed)');
    console.error('');
    console.error('For local development:');
    console.error('1. Copy .env.example to .env');
    console.error('2. Add your Neon database URL to VITE_NEON_DATABASE_URL');
    console.error('3. Restart the dev server');
    return null;
  }
  
  // Validate database URL format
  if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    console.error('❌ Invalid Neon database URL format!');
    console.error('Expected format: postgresql://user:password@host/database');
    console.error(`Received: ${databaseUrl.substring(0, 20)}...`);
    return null;
  }
  
  return neon(databaseUrl);
};

export const sql = createNeonClient();

// Helper function to execute queries safely
export const query = async (queryString, params = []) => {
  if (!sql) {
    const errorMessage = !databaseUrl
      ? 'Neon database is not configured. The VITE_NEON_DATABASE_URL environment variable was not set during the build. Please check your Netlify environment variables settings and rebuild the site.'
      : 'Neon database client failed to initialize. Check the console for details.';
    throw new Error(errorMessage);
  }
  
  try {
    const result = await sql(queryString, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};
