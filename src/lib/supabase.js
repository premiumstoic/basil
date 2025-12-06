// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with environment variable validation
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables not configured. Client disabled.');
    console.warn('Please copy .env.example to .env and add your Supabase credentials.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Helper function to upload image
export const uploadImage = async (file, bucket = 'card-images') => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up environment variables.');
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};

// Helper function to upload audio
export const uploadAudio = async (file) => {
  return uploadImage(file, 'card-music');
};

// Helper function to delete file
export const deleteFile = async (url, bucket = 'card-images') => {
  if (!supabase) {
    console.error('Supabase is not configured. Cannot delete file.');
    return;
  }
  
  const path = url.split('/').pop();
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) console.error('Error deleting file:', error);
};
