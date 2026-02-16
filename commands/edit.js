const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { UploadFileUgu, TelegraPh } = require('../lib/uploader');

async function getImageBuffer(message) {
    const m = message.message || {};

    if (m.imageMessage) {
        const stream = await downloadContentFromMessage(m.imageMessage, 'image');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    }

    const quoted = m.extendedTextMessage?.contextInfo?.quotedMessage;
    if (quoted?.imageMessage) {
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    }

    return null;
}

async function editCommand(sock, chatId, message) {
    try {
        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption;

        const prompt = text?.split(' ').slice(1).join(' ').trim();

        if (!prompt) {
            return sock.sendMessage(chatId, {
                text: "❌ Please provide a prompt.\nExample: .edit change color to white"
            }, { quoted: message });
        }

        const imageBuffer = await getImageBuffer(message);

        if (!imageBuffer) {
            return sock.sendMessage(chatId, {
                text: "❌ Please send or reply to an image."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            react: { text: '🎨', key: message.key }
        });

        // Save temp file
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const tempPath = path.join(tempDir, `${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, imageBuffer);

        let imageUrl = "";

        try {
            // Try Telegraph first
            try {
                imageUrl = await TelegraPh(tempPath);
            } catch {
                const res = await UploadFileUgu(tempPath);
                imageUrl = typeof res === 'string'
                    ? res
                    : (res.url || res.url_full);
            }
        } finally {
            setTimeout(() => {
                try { fs.unlinkSync(tempPath); } catch {}
            }, 2000);
        }

        if (!imageUrl || !imageUrl.startsWith("http")) {
            throw new Error("Upload failed - invalid URL");
        }

        console.log("UPLOADED URL:", imageUrl);

        // 🔥 Nano-Banana Edit API
        const apiUrl =
            `https://nano-bnana.fak-official.workers.dev/image` +
            `?prompt=${encodeURIComponent(prompt)}` +
            `&imageUrl=${encodeURIComponent(imageUrl)}`;

        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 120000
        });

        if (!response.data) {
            throw new Error("API returned no data");
        }

        const editedBuffer = Buffer.from(response.data);

        await sock.sendMessage(chatId, {
            image: editedBuffer,
            caption: `✨ Image edited successfully!\n\n📝 Prompt: ${prompt}\n\n🎨 Powered by Nano-Banana AI`
        }, { quoted: message });

    } catch (error) {
        console.error("EDIT ERROR:", error.response?.data || error.message);

        let msg = "❌ Failed to edit image.";

        if (error.response) {
            msg += `\n\n📌 API Error: ${error.response.status}`;
        } else if (error.code === "ECONNABORTED") {
            msg += "\n\n⏳ Request Timeout (API slow).";
        } else {
            msg += `\n\n📌 ${error.message}`;
        }

        sock.sendMessage(chatId, { text: msg }, { quoted: message });
    }
}

module.exports = editCommand;