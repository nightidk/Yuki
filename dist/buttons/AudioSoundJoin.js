"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const voice_1 = require("@discordjs/voice");
const customId = "sounds_join";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Success);
        button.setLabel("Зайти в войс");
        return button;
    },
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice)
            return await interaction.reply({
                ephemeral: true,
                content: "Ты не находишься в голосовом канале.",
            });
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я уже нахожусь в другом голосовом канале!",
            });
        connection = (0, voice_1.joinVoiceChannel)({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const player = (0, voice_1.createAudioPlayer)();
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
