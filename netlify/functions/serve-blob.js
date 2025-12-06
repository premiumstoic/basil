// netlify/functions/serve-blob.js
import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/');
  
  // Expected path: /.netlify/blobs/{bucket}/{fileName}
  const bucket = pathParts[3];
  const fileName = pathParts[4];

  if (!bucket || !fileName) {
    return new Response('Invalid path', { status: 400 });
  }

  try {
    const store = getStore(bucket);
    const blob = await store.get(fileName, { type: 'arrayBuffer' });
    
    if (!blob) {
      return new Response('File not found', { status: 404 });
    }

    const metadata = await store.getMetadata(fileName);
    const contentType = metadata?.contentType || 'application/octet-stream';

    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Serve blob error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

export const config = {
  path: '/.netlify/blobs/*',
};
