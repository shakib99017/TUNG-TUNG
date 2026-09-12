if (!global.unfriendData) global.unfriendData = { stop: false, running: false, pending: [] };

module.exports = {
 config: {
 name: "unfriend",
 aliases: ["fun"],
 version: "14.0.0",
 author: "𝐌𝐚𝐑𝐮𝐅",
 countDown: 5,
 role: 2,
 category: "owner",
 guide: {
 en: "{pn} 10 = 10 জন\n{pn} all = সবাই\n{pn} yes = কনফার্ম\n{pn} stop = থামাও\n{pn} list = কত ফ্রেন্ড আছে"
 }
 },

 onStart: async function ({ api, event, args, message }) {
 const cmd = args[0]?.toLowerCase();

 // STOP
 if (cmd === "stop") {
 if (!global.unfriendData.running && global.unfriendData.pending.length === 0)
 return message.reply("❌ কোনো আনফ্রেন্ড চলছে না");
 global.unfriendData.stop = true;
 global.unfriendData.pending = [];
 return message.reply("🛑 থামিয়ে দিলাম");
 }

 // YES - Confirm
 if (cmd === "yes") {
 let list = global.unfriendData.pending;
 if (!list || list.length === 0) return message.reply("❌ আগে fun 10 বা fun all লিখো");

 global.unfriendData.pending = [];
 global.unfriendData.running = true;
 global.unfriendData.stop = false;

 const prog = await message.reply(`⚠️ ${list.length} জনকে আনফ্রেন্ড শুরু হচ্ছে...\nথামাতে: fun stop লিখো`);

 let success = 0, failed = 0;
 for (let i = 0; i < list.length; i++) {
 if (global.unfriendData.stop) {
 await api.editMessage(`🛑 থেমে গেছে\n✔️ সফল: ${success}\n❌ ব্যর্থ: ${failed}`, prog.messageID);
 global.unfriendData.running = false;
 return;
 }
 try {
 await new Promise((res, rej) => api.unfriend(list[i].userID, e => e? rej(e) : res()));
 success++;
 } catch { failed++; }

 try {
 await api.editMessage(
 `🔄 আনফ্রেন্ড চলছে...\n\n👤 এখন: ${list[i].fullName}\n⏳ ${i + 1}/${list.length}\n✔️ সফল: ${success} | ❌ ব্যর্থ: ${failed}\n\nথামাতে: fun stop`,
 prog.messageID
 );
 } catch {}
 await new Promise(r => setTimeout(r, 3000)); // 3 সেকেন্ড গ্যাপ, ব্যান খাবে না
 }

 global.unfriendData.running = false;
 return api.editMessage(`✅ আনফ্রেন্ড শেষ\n\n✔️ সফল: ${success} জন\n❌ ব্যর্থ: ${failed} জন`, prog.messageID);
 }

 // GET FRIENDS
 let friends;
 try {
 friends = await new Promise((res, rej) => api.getFriendsList((e, d) => e? rej(e) : res(d)));
 } catch {
 return message.reply("❌ Friend list আনতে পারিনি");
 }

 if (cmd === "list") return message.reply(`👥 তোমার মোট ফ্রেন্ড: ${friends.length} জন`);

 if (!cmd) return message.reply(
 `📝 ব্যবহার:\n` +
 `fun 10 - প্রথম 10 জনকে আনফ্রেন্ড\n` +
 `fun 50 - প্রথম 50 জনকে\n` +
 `fun all - সব ফ্রেন্ডকে\n` +
 `fun list - কত ফ্রেন্ড আছে দেখো\n` +
 `fun stop - থামাও\n` +
 `fun yes - কনফার্ম করো`
 );

 let targetList = [];
 if (cmd === "all") {
 targetList = friends;
 } else if (!isNaN(parseInt(cmd))) {
 let num = parseInt(cmd);
 if (num <= 0) return message.reply("❌ সংখ্যা ঠিক দাও");
 if (num > friends.length) num = friends.length;
 targetList = friends.slice(0, num);
 } else {
 return message.reply("❌ ভুল কমান্ড\nfun 10\nfun all\nfun list\nfun stop");
 }

 global.unfriendData.pending = targetList;
 global.unfriendData.stop = false;

 return message.reply(
 `⚠️ তুমি ${targetList.length} জনকে আনফ্রেন্ড করতে যাচ্ছো\n\n` +
 `প্রথম 5 জন:\n${targetList.slice(0, 5).map(f => `• ${f.fullName}`).join("\n")}\n${targetList.length > 5? `...আরো ${targetList.length - 5} জন` : ""}\n\n` +
 `কনফার্ম করতে: fun yes লিখো\nবাতিল করতে: fun stop লিখো`
 );
 }
};