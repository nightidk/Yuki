"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const customId = "verifyStep2";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Далее");
        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setTimestamp(null)
                    .setDescription(`...-Добро пожаловать в "Систему". Выберите ваш пол:`),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                    .setURL("https://discord.gg/KYPZCWcAHf")
                    .setLabel("Получить роль")
                    .setStyle(discord_js_1.ButtonStyle.Link), client.buttons.get("checkGenderRole").build()),
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("genderNone").build()),
            ],
        });
    },
});
