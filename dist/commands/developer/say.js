"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: "say",
    description: "embed say",
    options: [
        new discord_js_1.SlashCommandStringOption()
            .setName("text")
            .setDescription("embed")
            .setRequired(true),
    ],
    run: async ({ client, interaction, args }) => {
        const json = JSON.parse(args.getString("text"));
        await interaction.reply({
            content: "posted",
            ephemeral: true,
        });
        await interaction.channel.send(json);
    },
});
