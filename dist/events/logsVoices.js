"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const Embed_1 = require("../structures/Embed");
const CommandFunctions_1 = require("../functions/CommandFunctions");
exports.default = new Event_1.Event(discord_js_1.Events.VoiceStateUpdate, async (oldState, newState) => {
    const logChannel = (await oldState.guild.channels
        .fetch("1125847085913219094")
        .catch(() => { }));
    if (!logChannel)
        return;
    if (!oldState.channel && newState.channel)
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed(false)
                    .setAuthor({
                    name: "Пользователь зашёл в голосовой канал",
                })
                    .addFields({
                    name: "Пользователь",
                    value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                    inline: false,
                }, {
                    name: "Время",
                    value: `<t:${(0, CommandFunctions_1.getTimestamp)()}:D> <t:${(0, CommandFunctions_1.getTimestamp)()}:T>`,
                    inline: false,
                }, {
                    name: "Канал",
                    value: `${newState.channel}/${newState.channelId}/${newState.channel.name}`,
                }),
            ],
        });
    else if (oldState.channel && newState.channel) {
        if (oldState.channelId === newState.channelId)
            return;
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed(false)
                    .setAuthor({
                    name: "Пользователь перешёл в другой голосовой канал",
                })
                    .addFields({
                    name: "Пользователь",
                    value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                    inline: false,
                }, {
                    name: "Время",
                    value: `<t:${(0, CommandFunctions_1.getTimestamp)()}:D> <t:${(0, CommandFunctions_1.getTimestamp)()}:T>`,
                    inline: false,
                }, {
                    name: "Старый канал",
                    value: `${oldState.channel}/${oldState.channelId}/${oldState.channel.name}`,
                    inline: true,
                }, {
                    name: "Новый канал",
                    value: `${newState.channel}/${newState.channelId}/${newState.channel.name}`,
                    inline: true,
                }),
            ],
        });
    }
    else
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed(false)
                    .setAuthor({
                    name: "Пользователь вышел из голосового канала",
                })
                    .addFields({
                    name: "Пользователь",
                    value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                    inline: false,
                }, {
                    name: "Время",
                    value: `<t:${(0, CommandFunctions_1.getTimestamp)()}:D> <t:${(0, CommandFunctions_1.getTimestamp)()}:T>`,
                    inline: false,
                }, {
                    name: "Канал",
                    value: `${oldState.channel}/${oldState.channelId}/${oldState.channel.name}`,
                }),
            ],
        });
});
