"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
let components = new Array(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("name")
    .setLabel("Новое название")
    .setMaxLength(60)
    .setMinLength(1)
    .setPlaceholder("Введите новое название")
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Short)));
const customId = "proom_changeName";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Измение названия комнаты");
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
        let name = args.getTextInputValue("name");
        await interaction.reply({
            content: `Уставновлено новое название: ${name}`,
            ephemeral: true,
        });
        await interaction.member.voice.channel.setName(name);
    },
});
