// netlify/functions/upload-file.js
const { getStore } = require('@netlify/blobs');
const multipart = require('parse-multipart-data');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const contentType = event.headers['content-type'];

    if (!contentType || !contentType.includes('boundary=')) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid content-type header' })
      };
    }

    const boundary = contentType.split('boundary=')[1];
    const bodyBuffer = Buffer.from(event.body, 'base64');
    const parts = multipart.parse(bodyBuffer, boundary);

    const filePart = parts.find(part => part.name === 'file');
    const bucketPart = parts.find(part => part.name === 'bucket');
    const fileNamePart = parts.find(part => part.name === 'fileName');

    if (!filePart || !bucketPart || !fileNamePart) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    const bucket = bucketPart.data.toString();
    const fileName = fileNamePart.data.toString();
    const fileData = filePart.data;

    // Store in Netlify Blobs (context provides auto credentials)
    const store = getStore({ name: bucket, context });
    await store.set(fileName, fileData, {
      metadata: {
        contentType: filePart.type,
      },
    });

    // Generate public URL
    const siteUrl = process.env.URL || process.env.VITE_NETLIFY_SITE_URL;

    if (!siteUrl) {
      console.error('Site URL not configured. Set URL or VITE_NETLIFY_SITE_URL environment variable.');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Server configuration error' })
      };
    }

    const publicUrl = `${siteUrl}/.netlify/blobs/${bucket}/${fileName}`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: publicUrl })
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message })
    };
  }
};
