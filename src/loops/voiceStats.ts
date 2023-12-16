import { ExtendedClient } from "./../structures/Client";
import {
    ChannelType,
    Collection,
    GuildMember,
    VoiceBasedChannel,
} from "discord.js";
import { Timer } from "../structures/Timer";
import { updateVoiceStats } from "../functions/DatabaseFunctions";
import { client } from "..";

async function loop() {
    let voiceChannels = (
        await (
            await client.guilds.fetch("1125026376425148516")
        ).channels.fetch()
    ).filter(
        (channel) =>
            channel.members?.size !== 0 &&
            (channel.type === ChannelType.GuildVoice ||
                channel.type === ChannelType.GuildStageVoice)
    ) as Collection<string, VoiceBasedChannel>;
    let newVoiceMembers: Array<GuildMember> = new Array();
    voiceChannels.forEach((channel) => {
        newVoiceMembers.push(...channel.members.map((member) => member));
    });
    client.oldVoiceMembers = newVoiceMembers;
    if (client.oldVoiceMembers.length === 0)
        client.oldVoiceMembers = newVoiceMembers;
    else {
        for (let member of client.oldVoiceMembers) {
            if (newVoiceMembers.some((m) => m.id === member.id)) {
                if (
                    member.voice.channel ===
                    newVoiceMembers.find((m) => m.id === member.id).voice
                        .channel
                )
                    await updateVoiceStats(
                        member?.id,
                        member?.voice?.channel?.id
                    );
            }
        }
        client.oldVoiceMembers = newVoiceMembers;
    }
}

export function voiceStats() {
    let timer = Timer("voiceStats", loop, 60000);
    client.loops.set("voiceStats", timer);
}
