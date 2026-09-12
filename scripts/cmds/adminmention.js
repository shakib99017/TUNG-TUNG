module.exports = {
  config: {
    name: "adminmention",
    aliases: [],
    version: "3.0.0",
    author: "𝐌𝐚𝐑𝐮𝐅",
    role: 0,
    countDown: 5,
    category: "group"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const adminIDs = ["100065350440147", "100065350440147", "61594340600100"].map(String);

    if (adminIDs.includes(String(event.senderID))) return;

    const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
    const isMentioningAdmin = adminIDs.some(id => mentionedIDs.includes(id));
    if (!isMentioningAdmin) return;

    const REPLIES = [
      "এএএএএএ বস এখন ব্যস্ত আছে !😪",
      "এতো মেনসন কিসের বস কে ঘুমাইতে দে !😤",
      "হায় রে'হহহহ বস মায়া এর সাথে চিপায় আছে মেনসন দিস নাহ !🙂🙏",
      "এডমিন এখন কাজে ব্যস্ত। পরে উত্তর দিবে 😏",
      "আরেকবার বস রে মেনসন দিলে তুই বস এর বউ !😁",
      "বস কি তুর জামাই লাগে যে এতবার মেনসন দিস !😶",
      "সম্মান দিতে শিখ, বস কে ডিস্টার্ব করিস না 🙄"
    ];

    const randomReply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    return message.reply(randomReply);
  }
};