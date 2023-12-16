"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const customId = "proom_changeLock";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setEmoji("<:plock:971829775901548615>");
        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await (0, DatabaseFunctions_1.getRoom)(interaction.member.voice.channelId);
        if (!room)
            return await interaction.reply({
                content: "Ты должен находится в приватной комнате.",
                ephemeral: true,
            });
        if (room.ownerId !== interaction.member.id)
            return await interaction.reply({
                content: "Ты не являешься владельцом данной комнаты.",
                ephemeral: true,
            });
        let voice = interaction.member.voice.channel;
        if (voice.permissionsFor("1125080526391349348").has("Connect")) {
            await voice.permissionOverwrites.edit("1125080526391349348", {
                Connect: false,
            });
            await interaction.reply({
                content: "Доступ закрыт для других пользователей.",
                ephemeral: true,
            });
        }
        else {
            await voice.permissionOverwrites.edit("1125080526391349348", {
                Connect: true,
            });
            await interaction.reply({
                content: "Доступ открыт для других пользователей.",
                ephemeral: true,
            });
        }
    },
});
