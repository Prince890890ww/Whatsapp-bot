# 🤖 WHATSAPP-BOT 🚀

Welcome to the official repository of **Whatsapp-bot**! A powerful, user-friendly, and highly customizable WhatsApp automation tool.

---

## 📢 Stay Connected

| Platform | Link |
| :--- | :--- |
| **YouTube Channel** | [![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@kaeldraven-y3p?si=2UeyrpUt60Te_eFO) |
| **Telegram Community** | [![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://itsrazacommunity.t.me/) |
| **WhatsApp Channel** | [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb7Svri7oQhZNL7e5u2b) |

---

## 🛠️ How to Get Session ID

Before deploying, you need a **Session ID** to link your WhatsApp account.

1. Visit the **Pairing Site**: [Raza Bot Pair](https://raza-bot-pair.onrender.com)
2. Enter your WhatsApp number with country code (e.g., `92300xxxxxxx`).
3. You will receive a 8-character pairing code.
4. Enter this code in your WhatsApp Linked Devices section.
5. Once linked, you will receive a message with your `SESSION_ID`. **Copy it safely!**

---

## 🚀 Deployment Options

Choose your preferred platform to deploy the bot:

### 1. Deploy on Render (Recommended)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/)
*   Create a Web Service.
*   Connect your GitHub fork.
*   Add Environment Variables (SESSION_ID, etc.).
*   Deploy!

### 2. Deploy on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mallah204/Whatsapp-bot)
*   Click the button above.
*   Fill in the App Name and Config Vars.
*   Click "Deploy App".

### 3. Bot-Hosting / Pterodactyl Panel
For advanced users using a hosting panel:
1.  **Download ZIP**: Go to the [GitHub Repository](https://github.com/mallah204/Whatsapp-bot), click `Code` -> `Download ZIP`.
2.  **Upload**: Open your Pterodactyl Panel, go to `File Manager`, and upload the ZIP file.
3.  **Extract**: Extract the uploaded ZIP file in the root directory.
4.  **Configuration**:
    *   Find the `config.js` or `.env` file.
    *   Paste your `SESSION_ID`.
5.  **Console**: Go to the `Console` tab and click **Start**.

---

## 📥 Manual Installation (Local/VPS)

If you want to run it on your own machine:

```bash
# Clone the repository
git clone https://github.com/mallah204/Whatsapp-bot

# Enter the directory
cd Whatsapp-bot

# Install dependencies
npm install

# Start the bot
npm start
```

---

## ⭐ Features
*   ✅ Automated Responses
*   ✅ Group Management
*   ✅ Media Downloading
*   ✅ Fast & Secure
*   ✅ Multi-Device Support

---

## 🤝 Credits
Developed with ❤️ by [Raza Community](https://t.me/itsrazacommunity).

---

*Don't forget to give a ⭐ to this repo if you like it!*
