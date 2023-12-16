import { ExtendedClient } from "./../structures/Client";
import { ChannelType, VoiceBasedChannel } from "discord.js";
import { Timer } from "../structures/Timer";
import { client } from "..";
import { createCanvas, loadImage, registerFont } from "canvas";

async function loop() {
    const guild = client.guilds.cache.get("1125026376425148516");
    const voiceChannels = guild.channels.cache
        .filter((c) => c.type === ChannelType.GuildVoice)
        .map((c) => c) as VoiceBasedChannel[];

    const canvas = createCanvas(960, 540);
    const ctx = canvas.getContext("2d");
    registerFont("./fonts/ProximaNova-Bold.ttf", {
        family: "Proxima Nova Bold",
    });

    const banner = await loadImage(OBJECTS.banner);
    ctx.drawImage(banner, 0, 0);

    ctx.font = "87px Proxima Nova Bold";
    ctx.fillStyle = "#E5E2E2";
    ctx.shadowColor = "rgba(255, 255, 255, 0.69)";
    ctx.shadowBlur = 13;
    const count = getCountMembersFromVoice(voiceChannels).toString();
    const countMeasure = ctx.measureText(count);
    ctx.fillText(count, 433 - countMeasure.width, 466);

    await guild.setBanner(canvas.toBuffer());
}

export function serverBanner() {
    let timer = Timer("serverBanner", loop, 60000);
    client.loops.set("serverBanner", timer);
}

const OBJECTS = {
    banner: `${__dirname}/../assets/banner.png`,
};

function getCountMembersFromVoice(voiceMembers: VoiceBasedChannel[]) {
    let count = 0;
    voiceMembers.forEach((v) => {
        count += v.members.size;
    });
    return count;
}
