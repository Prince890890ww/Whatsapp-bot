const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    // Manually defined list of commands or dynamic list from files
    const commandsDir = path.join(__dirname, '../commands');
    let commands = [];
    
    if (fs.existsSync(commandsDir)) {
        commands = fs.readdirSync(commandsDir)
            .filter(file => file.endsWith('.js'))
            .map(file => file.replace('.js', ''))
            .sort();
    } else {
        // Fallback to basic list if directory read fails
        commands = ['help', 'ping', 'alexa', 'edit', 'sticker', 'gpt', 'imagine', 'play', 'mode'];
    }

    let helpMessage = `╭┄◦ʚɞ◦≺⊹♡⊹≻ʚɞ◦┄╮\n`;
    helpMessage += `꒰✩❬❮❰ Raza-Bot ❱❯❭✩꒱\n`;
    helpMessage += `╰┄◦ʚ꩜ɞ◦≺⊹♡⊹≻◦ʚɞ╯\n\n`;
    helpMessage += `༝◌≻┄◦≺⊹♡⊹≻◦┄┄≺◌༝\n`;
    
    commands.forEach((cmd, index) => {
        helpMessage += ` ${index + 1}✪ ${cmd}\n`;
    });

    helpMessage += `╰ʚ꩜ɞ◦◦≺⊹♡⊹≻◦◦ʚ꩜ɞ╯\n`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        const contextInfo = {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363423927925534@newsletter',
                newsletterName: 'Raza-Bot by Mr Raza',
                serverMessageId: -1
            }
        };

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo
            }, { quoted: message });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage }, { quoted: message });
    }
}

module.exports = helpCommand;