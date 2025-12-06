// api/upload-file.js
import { put } from '@vercel/blob';

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
        const contentType = req.headers['content-type'];

        if (!contentType || !contentType.includes('multipart/form-data')) {
            return res.status(400).json({ message: 'Invalid content type' });
        }

        // Get the raw body
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // Parse multipart data manually (simplified - in production use a library)
        const boundary = contentType.split('boundary=')[1];
        const parts = buffer.toString('binary').split(`--${boundary}`);

        let fileData = null;
        let fileName = null;
        let fileType = null;

        for (const part of parts) {
            if (part.includes('name="file"')) {
                const headers = part.split('\r\n\r\n')[0];
                const fileContent = part.split('\r\n\r\n')[1];

                // Extract filename
                const filenameMatch = headers.match(/filename="([^"]+)"/);
                if (filenameMatch) {
                    const originalName = filenameMatch[1];
                    const ext = originalName.split('.').pop();
                    fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
                }

                // Extract content type
                const contentTypeMatch = headers.match(/Content-Type: ([^\r\n]+)/);
                if (contentTypeMatch) {
                    fileType = contentTypeMatch[1].trim();
                }

                // Convert binary string back to buffer
                if (fileContent) {
                    fileData = Buffer.from(fileContent.split('\r\n')[0], 'binary');
                }
            }
        }

        if (!fileData || !fileName) {
            return res.status(400).json({ message: 'No file provided' });
        }

        // Upload to Vercel Blob
        const blob = await put(fileName, fileData, {
            access: 'public',
            contentType: fileType,
        });

        return res.status(200).json({ url: blob.url });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: error.message });
    }
}
