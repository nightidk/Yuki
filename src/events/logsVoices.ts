import { Events, TextChannel } from "discord.js";
import { Event } from "../structures/Event";
import { ExtendedEmbed } from "../structures/Embed";
import { getTimestamp } from "../functions/CommandFunctions";

export default new Event(
    Events.VoiceStateUpdate,
    async (oldState, newState) => {
        const logChannel = (await oldState.guild.channels
            .fetch("1125847085913219094")
            .catch(() => {})) as TextChannel;
        if (!logChannel) return;

        if (!oldState.channel && newState.channel)
            await logChannel.send({
                embeds: [
                    new ExtendedEmbed(false)
                        .setAuthor({
                            name: "Пользователь зашёл в голосовой канал",
                        })
                        .addFields(
                            {
                                name: "Пользователь",
                                value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                                inline: false,
                            },
                            {
                                name: "Время",
                                value: `<t:${getTimestamp()}:D> <t:${getTimestamp()}:T>`,
                                inline: false,
                            },
                            {
                                name: "Канал",
                                value: `${newState.channel}/${newState.channelId}/${newState.channel.name}`,
                            }
                        ),
                ],
            });
        else if (oldState.channel && newState.channel) {
            if (oldState.channelId === newState.channelId) return;
            await logChannel.send({
                embeds: [
                    new ExtendedEmbed(false)
                        .setAuthor({
                            name: "Пользователь перешёл в другой голосовой канал",
                        })
                        .addFields(
                            {
                                name: "Пользователь",
                                value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                                inline: false,
                            },
                            {
                                name: "Время",
                                value: `<t:${getTimestamp()}:D> <t:${getTimestamp()}:T>`,
                                inline: false,
                            },
                            {
                                name: "Старый канал",
                                value: `${oldState.channel}/${oldState.channelId}/${oldState.channel.name}`,
                                inline: true,
                            },
                            {
                                name: "Новый канал",
                                value: `${newState.channel}/${newState.channelId}/${newState.channel.name}`,
                                inline: true,
                            }
                        ),
                ],
            });
        } else
            await logChannel.send({
                embeds: [
                    new ExtendedEmbed(false)
                        .setAuthor({
                            name: "Пользователь вышел из голосового канала",
                        })
                        .addFields(
                            {
                                name: "Пользователь",
                                value: `${oldState.member}/${oldState.member.id}/${oldState.member.user.tag}`,
                                inline: false,
                            },
                            {
                                name: "Время",
                                value: `<t:${getTimestamp()}:D> <t:${getTimestamp()}:T>`,
                                inline: false,
                            },
                            {
                                name: "Канал",
                                value: `${oldState.channel}/${oldState.channelId}/${oldState.channel.name}`,
                            }
                        ),
                ],
            });
    }
);
