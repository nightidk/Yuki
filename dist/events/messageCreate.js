"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const __1 = require("..");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
exports.default = new Event_1.Event(discord_js_1.Events.MessageCreate, async (message) => {
    let command = message.content.split(" ").at(0).slice(1).toLowerCase();
    let dotCommand = __1.client.dotCommands.get(command);
    if (!dotCommand) {
        await (0, DatabaseFunctions_1.updateChatStats)(message.author.id, message.channelId);
        return;
    }
    if (!message.content.startsWith("."))
        return;
    __1.client.dotCommands.get(command).run({
        client: __1.client,
        message: message,
        mentions: message.mentions.members
            .filter((m) => !m.user.bot && m.id != message.author.id)
            .map((m) => m),
    });
});
