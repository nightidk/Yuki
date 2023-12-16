"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImage = void 0;
const index_1 = require("./../index");
async function getRandomImage(commandName) {
    const guild = index_1.client.guilds.cache.get("994320038922301532");
    const channel = guild.channels.cache.find((c) => c.name == commandName);
    let messages = (await channel.messages.fetch()).map((m) => m);
    messages = messages.filter((m) => m.attachments.size > 0 && m.attachments.size == 1);
    return messages[Math.floor(Math.random() * messages.length)].attachments.at(0).url;
}
exports.getRandomImage = getRandomImage;
