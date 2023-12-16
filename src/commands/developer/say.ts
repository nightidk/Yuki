import {
    ApplicationCommandOptionData,
    SlashCommandStringOption,
} from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "say",
    description: "embed say",
    options: [
        new SlashCommandStringOption()
            .setName("text")
            .setDescription("embed")
            .setRequired(true) as ApplicationCommandOptionData,
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
