"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
let components = new Array(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("limit")
    .setLabel("Максимальное количество участников в комнате")
    .setPlaceholder("0 -> неограниченно")
    .setMaxLength(2)
    .setMinLength(1)
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Short)));
const customId = "proom_changeLimit";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Измение лимита комнаты");
        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
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
        let limit = Number(args.getTextInputValue("limit"));
        if (isNaN(limit))
            return await interaction.reply({
                content: "Лимит должен состоять только из цифр",
                ephemeral: true,
            });
        if (limit < 0)
            return await interaction.reply({
                content: "Лимит должен быть больше или равен нулю.",
                ephemeral: true,
            });
        await interaction.reply({
            content: `Установлен новый лимит: ${limit}`,
            ephemeral: true,
        });
        await interaction.member.voice.channel.setUserLimit(limit);
    },
});
