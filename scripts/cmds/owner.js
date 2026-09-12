const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.0.0",
    author: "Mohammad Maruf",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭━━━━ 👑 Oᴡɴᴇʀ Iɴғᴏ ━━━━╮

 🏷 Nᴀᴍᴇ
    └─ SHAKIB BHAIYA👑
 🎀 Nɪᴄᴋ
    └─ SHAKIB 🎀
 🎂 Aɢᴇ
    └─ 19+ 😘
 💞 Rᴇʟᴀᴛɪᴏɴ
    └─ Sɪɴɢʟᴇ 🫶
 💼 Wᴏʀᴋ
    └─ Sᴛᴜᴅᴇɴᴛ 😎
 🎓 Eᴅᴜᴄᴀᴛɪᴏɴ
    └─ Sᴇᴄʀᴇᴛ 🤫
 📍 Lᴏᴄᴀᴛɪᴏɴ
    └─ BOGURA,SIBGONJO

╰━━━━━ 🔗 Cᴏɴᴛᴀᴄᴛ ━━━━━━╯

 📘 Fʙ  ➜ SHAKIB KHAN
 💬 Tɢ  ➜ 01322418218
 📞 Wᴀ  ➜ 01322418218`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");
    const imgLink = "https://i.ibb.co/DHGr4Sr1/87797f91b308.jpg";

    try {
      await fs.ensureDir(cacheDir);

      const response = await axios.get(imgLink, {
        responseType: "arraybuffer"
      });

      await fs.writeFile(imgPath, response.data);

      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => {
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        },
        event.messageID
      );
    } catch (e) {}
  }
};