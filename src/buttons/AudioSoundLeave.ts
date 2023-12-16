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
    VoiceConnectionSignallingState,
    VoiceConnectionConnectingState,
} from "@discordjs/voice";

const customId = "sounds_leave";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Danger);
        button.setLabel("Покинуть войс");

        return button;
    },
    run: async ({ client, interaction }) => {
        let connection = getVoiceConnection(interaction.guildId);

        if (!connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я и так не нахожусь в голосовом канале!",
            });

        if (
            interaction.member.voice?.channelId !==
            interaction.guild.members.me.voice?.channelId
        )
            return await interaction.reply({
                ephemeral: true,
                content: "Ты не находишься в голосовом канале со мной.",
            });

        let state = connection.state as VoiceConnectionConnectingState;
        state.subscription?.player.stop();
        connection.disconnect();
        connection.destroy();

        await interaction.reply({
            ephemeral: true,
            content: `Успешное отключение от канала ${interaction.member.voice.channel}`,
        });
    },
});
