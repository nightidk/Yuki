"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const voice_1 = require("@discordjs/voice");
const customId = "sounds_play4";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Primary);
        button.setLabel("ГС-4");
        return button;
    },
    run: async ({ client, interaction }) => {
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (!connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я не нахожусь в голосовом канале!",
            });
        if (interaction.member.voice?.channelId !==
            interaction.guild.members.me.voice?.channelId)
            return await interaction.reply({
                ephemeral: true,
                content: "Ты не находишься в голосовом канале со мной.",
            });
        let state = connection.state;
        const resourse = (0, voice_1.createAudioResource)(`${__dirname}/../assets/audios/audio4.mp3`);
        const player = state.subscription?.player;
        player.play(resourse);
        await interaction.reply({
            ephemeral: true,
            content: `Успешное воспроизведение ГС-4`,
        });
    },
});
