// src/lib/neon.js
import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

// Create Neon client with environment variable validation
const createNeonClient = () => {
  if (!databaseUrl) {
    console.warn('⚠️ Neon database URL not configured. Client disabled.');
    console.warn('Please copy .env.example to .env and add your Neon database URL.');
    return null;
  }
  return neon(databaseUrl);
};

export const sql = createNeonClient();

// Helper function to execute queries safely
export const query = async (queryString, params = []) => {
  if (!sql) {
    throw new Error('Neon database is not configured. Please set up environment variables.');
  }
  
  try {
    const result = await sql(queryString, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};
