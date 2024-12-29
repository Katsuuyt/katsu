const ytdl = require('ytdl-core');

exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: 400,
                message: 'URL is required',
            }),
        };
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoId = info.videoDetails.videoId;
        const title = info.videoDetails.title;
        const thumbnail = info.videoDetails.thumbnails[0].url;
        const mp4Link = ytdl.chooseFormat(info.formats, { quality: '18' }).url; // Format MP4

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 200,
                message: 'success',
                result: {
                    id: videoId,
                    title: title,
                    thumbnail: thumbnail,
                    link: mp4Link,
                },
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 500,
                message: 'Failed to retrieve video',
            }),
        };
    }
};