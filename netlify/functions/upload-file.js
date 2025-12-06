// netlify/functions/upload-file.js
import { getStore } from '@netlify/blobs';
import multipart from 'parse-multipart-data';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const contentType = req.headers.get('content-type');
    const boundary = contentType.split('boundary=')[1];
    const bodyBuffer = await req.arrayBuffer();
    const parts = multipart.parse(Buffer.from(bodyBuffer), boundary);

    const filePart = parts.find(part => part.name === 'file');
    const bucketPart = parts.find(part => part.name === 'bucket');
    const fileNamePart = parts.find(part => part.name === 'fileName');

    if (!filePart || !bucketPart || !fileNamePart) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const bucket = bucketPart.data.toString();
    const fileName = fileNamePart.data.toString();
    const fileData = filePart.data;

    // Store in Netlify Blobs
    const store = getStore(bucket);
    await store.set(fileName, fileData, {
      metadata: {
        contentType: filePart.type,
      },
    });

    // Generate public URL
    const siteUrl = process.env.URL || process.env.VITE_NETLIFY_SITE_URL || 'http://localhost:8888';
    const publicUrl = `${siteUrl}/.netlify/blobs/${bucket}/${fileName}`;

    return new Response(JSON.stringify({ url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: '/upload-file'
};
