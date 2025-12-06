// api/delete-file.js
import { del } from '@vercel/blob';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        // Delete from Vercel Blob
        await del(url);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ message: error.message });
    }
}
