// src/lib/storage.js

// Helper function to upload image to Vercel Blob via API
export const uploadImage = async (file, bucket = 'card-images') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);

  const response = await fetch('/api/upload-file', {
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
export const deleteFile = async (url) => {
  try {
    await fetch('/api/delete-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
