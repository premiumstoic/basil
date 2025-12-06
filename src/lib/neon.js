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
    console.error('For Vercel deployments:');
    console.error('1. Go to your Vercel project settings');
    console.error('2. Add VITE_NEON_DATABASE_URL with your Neon connection string');
    console.error('3. Redeploy your project');
    console.error('');
    console.error('For local development:');
    console.error('1. Create a .env file in the project root');
    console.error('2. Add your Neon database URL to VITE_NEON_DATABASE_URL');
    console.error('');
    console.error('Example .env file:');
    console.error('VITE_NEON_DATABASE_URL=postgresql://...');
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
