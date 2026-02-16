const yts = require('yt-search');
const axios = require('axios');

async function playCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || 
                     message.message?.extendedTextMessage?.text;

        const searchQuery = text.split(' ').slice(1).join(' ').trim();

        if (!searchQuery) {
            return await sock.sendMessage(chatId, { 
                text: "What song do you want to download?"
            });
        }

        // 🔍 Search YouTube
        const { videos } = await yts(searchQuery);
        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: "No songs found!"
            });
        }

        await sock.sendMessage(chatId, {
            text: "_Please wait, your download is in progress..._"
        });

        const video = videos[0];
        const urlYt = video.url;

        // 🎵 New API (Anabot)
        const apikey = 'freeApikey';
        const apiUrl = `https://anabot.my.id/api/download/ytmp3?url=${encodeURIComponent(urlYt)}&apikey=${encodeURIComponent(apikey)}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data?.success || !data?.data?.result?.urls) {
            return await sock.sendMessage(chatId, { 
                text: "Failed to fetch audio from the API."
            });
        }

        const audioUrl = data.data.result.urls;
        const title = video.title || data.data.result.metadata?.title || "audio";
        const mimetype = "audio/mpeg";

        // 🎧 Send Audio
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: mimetype,
            fileName: `${title}.mp3`
        }, { quoted: message });

    } catch (error) {
        console.error('Error in play command:', error);
        await sock.sendMessage(chatId, { 
            text: "Download failed. Please try again later."
        });
    }
}

module.exports = playCommand;

/* Powered by Raza-Bot
   Credits to Raza */