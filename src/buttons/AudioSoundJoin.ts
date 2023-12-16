import { spawn } from "child_process";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";
import {
    joinVoiceChannel,
    createAudioPlayer,
    getVoiceConnection,
} from "@discordjs/voice";

const customId = "sounds_join";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Success);
        button.setLabel("Зайти в войс");

        return button;
    },
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice)
            return await interaction.reply({
                ephemeral: true,
                content: "Ты не находишься в голосовом канале.",
            });
        let connection = getVoiceConnection(interaction.guildId);
        if (connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я уже нахожусь в другом голосовом канале!",
            });
        connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        connection.subscribe(player);
        await interaction.reply({
            ephemeral: true,
            content: `Успешное присоединение к каналу ${interaction.member.voice.channel}`,
        });
        player.on("error", (err) => {
            console.error(err);
        });
        player.on("debug", (message) => {
            console.log(`[Player] ${message}`);
        });
    },
});
