module.exports = { 
 config: { 
 name: "info", 
 aliases: ["botinfo"], 
 version: "10.0.0", 
 author: "𝐌𝐚𝐑𝐮𝐅", 
 countDown: 0, 
 role: 0, 
 description: { en: "Show bot information." }, 
 category: "system", 
 guide: { en: "{pn}" } 
 }, 

 onStart: async function ({ api, message, event, config }) { 
 return sendInfo(api, message, event, config);
 },

 onChat: async function ({ api, message, event, config }) {
 const body = (event.body || "").trim().toLowerCase();

 if (body !== "info" && body !== "botinfo") return;

 return sendInfo(api, message, event, config);
 }
};

const handled = new Set();

function isDuplicate(event) {
 const key =
 event.messageID ||
 `${event.threadID}:${event.senderID}:${event.body}`;

 if (handled.has(key)) return true;

 handled.add(key);

 setTimeout(() => {
 handled.delete(key);
 }, 5000);

 return false;
}

async function sendInfo(api, message, event, config) {
 if (isDuplicate(event)) return;

 const uptime = process.uptime(); 
 const days = Math.floor(uptime / 86400); 
 const hours = Math.floor((uptime % 86400) / 3600); 
 const minutes = Math.floor((uptime % 3600) / 60); 
 const seconds = Math.floor(uptime % 60); 

 let runtime = ""; 
 if (days > 0) runtime += `${days}d `; 
 if (hours > 0) runtime += `${hours}h `; 
 if (minutes > 0) runtime += `${minutes}m `; 
 runtime += `${seconds}s`; 

 const prefix = global.config?.PREFIX || global.GoatBot?.config?.prefix || "/";

 const msg = `━━━━━✦ 𝐁𝐨𝐓 𝐈𝐧𝐟𝐨 ✦━━━━━━

🤖 𝐍𝐚𝐦𝐞 » SHAKIB CHAT BOT💫🪽
👑 𝐎𝐰𝐧𝐞𝐫 » SHAKIB
⏰ 𝐔𝐩𝐭𝐢𝐦𝐞 » ${runtime}
⚡ 𝐏𝐫𝐞𝐟𝐢𝐱 » ${prefix}

━━ 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠 𝐦𝐞 💫 ━━`; 

 return message.reply(msg);
}