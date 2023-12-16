import { spawn } from "child_process";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";
import {
    createAudioResource,
    getVoiceConnection,
    VoiceConnectionConnectingState,
    AudioPlayerStatus,
} from "@discordjs/voice";

const customId = "sounds_stream";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Primary);
        button.setLabel("Music");

        return button;
    },
    run: async ({ client, interaction }) => {
        let connection = getVoiceConnection(interaction.guildId);

        if (!connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я не нахожусь в голосовом канале!",
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
        const resourse = createAudioResource(
            `${__dirname}/../assets/audios/music.mp3`,
            {
                inlineVolume: true,
            }
        );
        resourse.volume.setVolume(0.1);

        const player = state.subscription?.player;
        player.play(resourse);

        await interaction.reply({
            ephemeral: true,
            content: `Успешное воспроизведение Music`,
        });
    },
});
