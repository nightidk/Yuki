"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const voice_1 = require("@discordjs/voice");
const customId = "sounds_stop";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Danger);
        button.setLabel("Остановить");
        return button;
    },
    run: async ({ client, interaction }) => {
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (!connection)
            return await interaction.reply({
                ephemeral: true,
                content: "Я и так не нахожусь в голосовом канале!",
            });
        if (interaction.member.voice?.channelId !==
            interaction.guild.members.me.voice?.channelId)
            return await interaction.reply({
                ephemeral: true,
                content: "Ты не находишься в голосовом канале со мной.",
            });
        let state = connection.state;
        state.subscription?.player.stop();
        await interaction.reply({
            ephemeral: true,
            content: `Успешно отключено.`,
        });
    },
});
