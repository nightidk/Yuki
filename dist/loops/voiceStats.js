"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceStats = void 0;
const discord_js_1 = require("discord.js");
const Timer_1 = require("../structures/Timer");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const __1 = require("..");
async function loop() {
    let voiceChannels = (await (await __1.client.guilds.fetch("1125026376425148516")).channels.fetch()).filter((channel) => channel.members?.size !== 0 &&
        (channel.type === discord_js_1.ChannelType.GuildVoice ||
            channel.type === discord_js_1.ChannelType.GuildStageVoice));
    let newVoiceMembers = new Array();
    voiceChannels.forEach((channel) => {
        newVoiceMembers.push(...channel.members.map((member) => member));
    });
    __1.client.oldVoiceMembers = newVoiceMembers;
    if (__1.client.oldVoiceMembers.length === 0)
        __1.client.oldVoiceMembers = newVoiceMembers;
    else {
        for (let member of __1.client.oldVoiceMembers) {
            if (newVoiceMembers.some((m) => m.id === member.id)) {
                if (member.voice.channel ===
                    newVoiceMembers.find((m) => m.id === member.id).voice
                        .channel)
                    await (0, DatabaseFunctions_1.updateVoiceStats)(member?.id, member?.voice?.channel?.id);
            }
        }
        __1.client.oldVoiceMembers = newVoiceMembers;
    }
}
function voiceStats() {
    let timer = (0, Timer_1.Timer)("voiceStats", loop, 60000);
    __1.client.loops.set("voiceStats", timer);
}
exports.voiceStats = voiceStats;
