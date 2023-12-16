"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedEmbed = void 0;
const discord_js_1 = require("discord.js");
class ExtendedEmbed extends discord_js_1.EmbedBuilder {
    constructor(timestamp = true) {
        super();
        if (timestamp)
            this.setTimestamp();
        this.setColor(0x2b2d31);
    }
}
exports.ExtendedEmbed = ExtendedEmbed;
