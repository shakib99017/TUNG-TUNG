exports.config = {
 name: "fork",
 version: "2.0.0",
 author: "Mohammad Maruf",
 countDown: 5,
 role: 0,
 shortDescription: "Fork Link",
 longDescription: "Responds when fork or repository is mentioned.",
 category: "config",
 guide: { en: "Type 'fork' or 'repository'" }
};

const last = {};
const cool = 10000;
const REPO_LINK = "https://github.com/maruf-1718/MARUFS-BOT";

exports.onStart = async function () {};

exports.onChat = async function ({ event, api }) {
 const threadID = event.threadID;
 const text = (event.body || "").trim().toLowerCase();

 if (!text) return;
 if (text!== "fork" && text!== "repository" && text!== "repo" && text!== "github") return;

 if (last[threadID] && Date.now() - last[threadID] < cool) return;
 last[threadID] = Date.now();

 const msg =
`╭━━━━━━━━━━━━━━━━━━━━╮
┃ 🤖 𝐁𝐎𝐓: SHAKIB BHAIYA
┃ 👑 𝐎𝐖𝐍𝐄𝐑: SHAKIB
┃ 🔐 𝐅𝐎𝐑𝐊: 𝐏𝐔𝐁𝐋𝐈𝐂
╰━━━━━━━━━━━━━━━━━━━━╯

📦 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘:
${REPO_LINK}

⭐ Star দিয়ে Fork করে নাও!`;

 return api.sendMessage(msg, threadID, event.messageID);
};