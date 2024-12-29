const express = require('express');
const ytdl = require('ytdl-core'); // Untuk YouTube
const TikTokScraper = require('tiktok-scraper'); // Untuk TikTok

const app = express();
app.use(express.json());

app.post('/api/download/youtube', async (req, res) => {
    const { url } = req.body;
    try {
        const info = await ytdl.getInfo(url);
        const downloadUrl = info.videoDetails.thumbnails[0].url; // Ganti dengan URL download yang sesuai
        res.json({ status: 'success', downloadUrl });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post('/api/download/tiktok', async (req, res) => {
    const { url } = req.body;
    try {
        const videoMeta = await TikTokScraper.getVideoMeta(url);
        const downloadUrl = videoMeta.collector[0].videoUrl; // Ganti dengan URL download yang sesuai
        res.json({ status: 'success', downloadUrl });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});