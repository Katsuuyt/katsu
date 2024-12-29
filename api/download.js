const ytdl = require('ytdl-core');
const TikTokScraper = require('tiktok-scraper');

exports.handler = async (event, context) => {
    const { url, platform } = JSON.parse(event.body);

    try {
        if (platform === 'youtube') {
            const info = await ytdl.getInfo(url);
            const downloadUrl = info.videoDetails.thumbnails[0].url; // Ganti dengan URL download yang sesuai
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'success', downloadUrl }),
            };
        } else if (platform === 'tiktok') {
            const videoMeta = await TikTokScraper.getVideoMeta(url);
            const downloadUrl = videoMeta.collector[0].videoUrl; // Ganti dengan URL download yang sesuai
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'success', downloadUrl }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: 'error', message: 'Platform tidak dikenal' }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: error.message }),
        };
    }
};