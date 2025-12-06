// api/upload-file.js
import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Parse the multipart form data using formidable
        const form = formidable({});

        const [fields, files] = await form.parse(req);

        const fileArray = files.file;
        if (!fileArray || fileArray.length === 0) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const file = fileArray[0];

        // Read file content
        const fileContent = fs.readFileSync(file.filepath);

        // Generate filename
        const ext = file.originalFilename?.split('.').pop() || 'png';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

        // Upload to Vercel Blob
        const blob = await put(fileName, fileContent, {
            access: 'public',
            contentType: file.mimetype || 'image/png',
        });

        return res.status(200).json({ url: blob.url });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: error.message });
    }
}
