"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverBanner = void 0;
const discord_js_1 = require("discord.js");
const Timer_1 = require("../structures/Timer");
const __1 = require("..");
const canvas_1 = require("canvas");
async function loop() {
    const guild = __1.client.guilds.cache.get("1125026376425148516");
    const voiceChannels = guild.channels.cache
        .filter((c) => c.type === discord_js_1.ChannelType.GuildVoice)
        .map((c) => c);
    const canvas = (0, canvas_1.createCanvas)(960, 540);
    const ctx = canvas.getContext("2d");
    (0, canvas_1.registerFont)("./fonts/ProximaNova-Bold.ttf", {
        family: "Proxima Nova Bold",
    });
    const banner = await (0, canvas_1.loadImage)(OBJECTS.banner);
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
function serverBanner() {
    let timer = (0, Timer_1.Timer)("serverBanner", loop, 60000);
    __1.client.loops.set("serverBanner", timer);
}
exports.serverBanner = serverBanner;
const OBJECTS = {
    banner: `${__dirname}/../assets/banner.png`,
};
function getCountMembersFromVoice(voiceMembers) {
    let count = 0;
    voiceMembers.forEach((v) => {
        count += v.members.size;
    });
    return count;
}
