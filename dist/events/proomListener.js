"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const Event_1 = require("../structures/Event");
const discord_js_1 = require("discord.js");
exports.default = new Event_1.Event(discord_js_1.Events.VoiceStateUpdate, async (oldState, newState) => {
    if (newState.channelId === "1125093840395706399") {
        const channel = await newState.guild.channels.create({
            name: newState.member.displayName,
            parent: newState.channel.parentId,
            type: discord_js_1.ChannelType.GuildVoice,
        });
        try {
            await newState.member.voice.setChannel(channel);
            await (0, DatabaseFunctions_1.createRoom)(channel.id, newState.member.id, channel);
        }
        catch (_) {
            await channel.delete().catch(() => { });
            await (0, DatabaseFunctions_1.deleteRoom)(channel.id);
        }
    }
    if (oldState.channelId !== "1125093840395706399" &&
        oldState.channel?.parentId === "1125093800327532624" &&
        oldState.channel?.members.size === 0) {
        await (0, DatabaseFunctions_1.deleteRoom)(oldState.channel?.id);
        await oldState.channel.delete();
    }
});
