import { EmbedBuilder } from "discord.js";

export class ExtendedEmbed extends EmbedBuilder {
    constructor(timestamp: boolean = true) {
        super();
        if (timestamp) this.setTimestamp();
        this.setColor(0x2b2d31);
    }
}
