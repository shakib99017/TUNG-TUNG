module.exports = {
 config: {
 name: "baby",
 aliases: ["maya", "baby", "jannat", "xan", "oi", "ishrat", "জান্নাত"],
 version: "2.2.1",
 author: "𝐌𝐚𝐑𝐮𝐅",
 description: "Mood based cute reply",
 category: "chat"
 },

 onStart: async function ({ api, event }) {
 return sendReply(api, event);
 },

 onChat: async function ({ api, event }) {
 const body = (event.body || "").trim().toLowerCase();
 if (!["baby", "bot", "bby", "bbz", "xan", "oi", "ishrat", "sizuka"].includes(body)) return;
 return sendReply(api, event);
 }
};

const handled = new Set();
function isDuplicate(event) {
 const key = event.messageID || `${event.threadID}:${event.senderID}:${event.body}`;
 if (handled.has(key)) return true;
 handled.add(key);
 setTimeout(() => handled.delete(key), 5000);
 return false;
}

const replies = [
 "তুমি ছাড়া আমি কারেন্ট ছাড়া ফ্যান এর মতো 🥺🫶",
 "ডাকিস না ঠাডা পড়বো 😒⚡",
 "এতো ডাকলে লিভ নিমু কিন্তু 😫👋",
 "এইতো চলে আসছি 🙆‍♀️🫶 বলো কি হইছে?",
 "উফ বার বার ডাকো কেন দেখো না আমি আমার বস সাকিব এর সাথে বিজি আছি ?😫😒",
 "হুমম কি হইছে শুনি? এত জরুরি তলব? 👀",
 "আবার ডাকলা? আমি কি তোমার চাকর নাকি 😤",
 "আইসা পড়ছি বাবু~ কি লাগবে? 🥹💗",
 "ডাকাডাকি বন্ধ করো... ঘুমাইতে দাও 😴",
 "আমাকে মেসেজ না দিয়ে এই নেও আমার বস কে ফন দেও,01322418218 🫡✨",
 "এতবার ডাকলে কিন্তু কিস চাইবো হুহ 😳🫶",
 "বলো বলো কি হইছে? মন খারাপ? 🥺",
 "আমি বিজি ছিলাম তো... সরি বাবু 😭",
 "আবার কি দুষ্টুমি করবা? ধরে ফেলবো কিন্তু 😼",
 "হুম বলো~ পুরা মনোযোগ তোমার দিকেই 👀💞",
 "ডাকছো যখন তখন ট্রিট দিতে হবে কিন্তু 🍰😋",
 "ওই~ এত মায়া করে ডাকলে আসবো না? 🥹🫂",
 "কি হইছে? ঝগড়া করবা? আমি রেডি 😤👊",
 "এইযে আমি... আর কত ডাকবা? 😫🫶",
 "তোমার ডাক শুনেই দৌড়ে আসলাম 🙆‍♀️🫣"
];

async function sendReply(api, event) {
 if (isDuplicate(event)) return;
 const randomReply = replies[Math.floor(Math.random() * replies.length)];
 try {
 await api.sendTypingIndicator(event.threadID, true);
 await new Promise(resolve => setTimeout(resolve, 1500));
 await api.sendTypingIndicator(event.threadID, false);
 
 return api.sendMessage(
 { 
 body: randomReply,
 replyToMessage: event.messageID
 },
 event.threadID
 );
 } catch (err) {
 return api.sendMessage(
 { 
 body: randomReply,
 replyToMessage: event.messageID
 },
 event.threadID
 );
 }
}