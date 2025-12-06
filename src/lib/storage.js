// src/lib/storage.js
import { getStore } from '@netlify/blobs';

// Helper function to upload image to Netlify Blobs
export const uploadImage = async (file, bucket = 'card-images') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  
  // For development/client-side, we'll use FormData to send to Netlify Function
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);
  formData.append('fileName', fileName);
  
  const response = await fetch('/.netlify/functions/upload-file', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload file');
  }
  
  const { url } = await response.json();
  return url;
};

// Helper function to upload audio
export const uploadAudio = async (file) => {
  return uploadImage(file, 'card-music');
};

// Helper function to delete file
export const deleteFile = async (url, bucket = 'card-images') => {
  try {
    const fileName = url.split('/').pop();
    await fetch('/.netlify/functions/delete-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bucket, fileName }),
    });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
