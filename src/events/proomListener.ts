import { createRoom, deleteRoom } from "../functions/DatabaseFunctions";
import { Event } from "../structures/Event";
import { ChannelType, Events } from "discord.js";

export default new Event(
    Events.VoiceStateUpdate,
    async (oldState, newState) => {
        if (newState.channelId === "1125093840395706399") {
            const channel = await newState.guild.channels.create({
                name: newState.member.displayName,
                parent: newState.channel.parentId,
                type: ChannelType.GuildVoice,
            });
            try {
                await newState.member.voice.setChannel(channel);
                await createRoom(channel.id, newState.member.id, channel);
            } catch (_) {
                await channel.delete().catch(() => {});
                await deleteRoom(channel.id);
            }
        }
        if (
            oldState.channelId !== "1125093840395706399" &&
            oldState.channel?.parentId === "1125093800327532624" &&
            oldState.channel?.members.size === 0
        ) {
            await deleteRoom(oldState.channel?.id);
            await oldState.channel.delete();
        }
    }
);
