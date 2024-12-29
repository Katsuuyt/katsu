const express = require('express');
const ytdl = require('ytdl-core'); // Untuk YouTube
const TikTokScraper = require('tiktok-scraper'); // Untuk TikTok

const app = express();
app.use(express.json());
app.use(express.static('../public')); // Menyajikan file statis dari folder public

app.post('/api/download/youtube', async (req, res) => {
    const { url } = req.body;
    try {
        const info = await ytdl.getInfo(url);
        const downloadUrl = info.videoDetails.thumbnails[0].url; // Ganti dengan URL download yang sesuai
        res.json({ status: 'success', downloadUrl });
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Menyajikan aplikasi di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});