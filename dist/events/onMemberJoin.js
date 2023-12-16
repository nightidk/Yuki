"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const LocalBan_1 = tslib_1.__importDefault(require("../schemas/LocalBan"));
exports.default = new Event_1.Event(discord_js_1.Events.GuildMemberAdd, async (member) => {
    const localbanDB = await LocalBan_1.default.findOne({ userId: member.id });
    if (localbanDB)
        await member.roles.add("1125179117415968878");
    else
        await member.roles.add("1125856938379452577");
    console.log(member.toJSON());
});
